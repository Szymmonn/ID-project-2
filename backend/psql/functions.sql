--
-- This is the file containing all of the 
--
-- functions, triggers, rules, views, etc...
--










--
-- daj_ostatni_kontarkt_pilkarza function 
-- returns obecny klub pilkarza lub null jesli jest bez klubu
-- ale zwraca kontreakt ktory jeszcze obowiazuje
--

-- WORKS
CREATE OR REPLACE FUNCTION daj_ostatni_obowiazujacy_kontrakt_pilkarza(pilkarz INT, czas DATE)
RETURNS INT AS
$$
DECLARE
    r RECORD;
    latest_offer RECORD;
BEGIN
    IF pilkarz IS NULL THEN 
        RETURN NULL; 
    END IF;

    FOR r IN
        SELECT *
        FROM oferty_transferowe_klub_pilkarz
        WHERE id_pilkarza = pilkarz
          AND czy_przyjeta = TRUE
          AND data_poczatek_kontraktu <= czas
          AND data_koniec_kontraktu >= czas
    LOOP
        if latest_offer is null then latest_offer := r;
        else
            IF latest_offer.data_zlozenia_oferty < r.data_zlozenia_oferty THEN
                latest_offer := r;
            END IF;
        end if;
    END LOOP;

    if latest_offer is null
        then return null;
    end if;

    IF latest_offer.data_koniec_kontraktu >= czas THEN
        RETURN latest_offer.id_oferty_dla_pilkarza;
    END IF;

    return null;
END;
$$
LANGUAGE plpgsql;














--
-- daj ostatni podpisany kontrakt
--

CREATE OR REPLACE FUNCTION daj_ostatni_podpisany_kontrakt_pilkarza(pilkarz INT, czas DATE)
RETURNS INT AS
$$
DECLARE
    r RECORD;
    latest_offer RECORD;
BEGIN
    IF pilkarz IS NULL THEN 
        RETURN NULL; 
    END IF;

    FOR r IN
        SELECT *
        FROM oferty_transferowe_klub_pilkarz
        WHERE id_pilkarza = pilkarz
          AND czy_przyjeta = TRUE
          AND data_poczatek_kontraktu <= czas
    LOOP
        IF latest_offer is null then latest_offer := r; 
        else
            IF latest_offer IS NULL OR latest_offer.data_zlozenia_oferty < r.data_zlozenia_oferty THEN
                latest_offer := r;
            END IF;
        end if;
    END LOOP;

    IF latest_offer IS NOT NULL THEN
        RETURN latest_offer.id_oferty_dla_pilkarza;
    ELSE
        RETURN NULL;
    END IF;
END;
$$
LANGUAGE plpgsql;
















--
-- daj ostatni klub pilkarza / wiem ze mozna to wykorzystac w niektorych triggerach ale nie chce mi sie ich praerabiac bo dzialaja
--

create or replace function daj_ostatni_obowiazujacy_klub_pilkarza(zawodnik int, czas date)
    returns int as
$$
declare
ostatni_kontrakt int;
ostatni_rekord record;
begin
    ostatni_kontrakt = daj_ostatni_obowiazujacy_kontrakt_pilkarza(zawodnik, czas);
    if ostatni_kontrakt is null then return null; end if;
    select * into ostatni_rekord from oferty_transferowe_klub_pilkarz where id_oferty_dla_pilkarza = ostatni_kontrakt;

    if ostatni_rekord.data_koniec_kontraktu < czas then return null;
    else RETURN ostatni_rekord.id_klubu;
    end if;

end;
$$
language plpgsql;



















--
-- daj historie kontraktow pilkarza z klubem
--

CREATE OR REPLACE FUNCTION daj_historie_kontraktow_pilkarza_z_klubem(pilkarz INT, klub INT)
RETURNS TABLE (
    kolejnosc INT, 
    data_oferty DATE, 
    id_kontraktu INT, 
    kto_z_kim CHAR(2), 
    kto_oferuje VARCHAR(20)
) AS
$$
DECLARE
    numer INT := 0;
    r RECORD;
BEGIN
    -- tymczasowa tabela ze wszystkimi kontraktami zawodnika z danym klubem
    CREATE TEMPORARY TABLE wszystkie_kontrakty_zawodnika ON COMMIT DROP AS
    SELECT * FROM (
        SELECT id_pilkarza, id_klubu, data_zlozenia_oferty, id_oferty_dla_klubu AS id_oferty, 'KK' AS typ_negocjacji, kto_sklada_oferte
        FROM oferty_transferowe_klub_klub
        UNION ALL
        SELECT id_pilkarza, id_klubu, data_zlozenia_oferty, id_oferty_od_klubu AS id_oferty, 'KP' AS typ_negocjacji, kto_sklada_oferte
        FROM oferty_transferowe_klub_pilkarz
    ) AS sub
    WHERE id_pilkarza = pilkarz AND id_klubu = klub
    ORDER BY data_zlozenia_oferty desc;

    -- pętla po kontraktach
    FOR r IN SELECT * FROM wszystkie_kontrakty_zawodnika LOOP
        numer := numer + 1;
        kolejnosc := numer;
        data_oferty := r.data_zlozenia_oferty;
        id_kontraktu := r.id_oferty;
        kto_z_kim := r.typ_negocjacji;
        kto_oferuje := r.kto_sklada_oferte;
        return next;
    END LOOP;
END;
$$ LANGUAGE plpgsql;







--
-- daj liste klubow zawodnika
--

create or replace function daj_liste_klubow_pilkarza(zawodnik int)
    returns table(klub int, od date, "do" date) as
$$
declare
r record;
begin
    for r in (
        select *
        from oferty_transferowe_klub_pilkarz
        where czy_przyjeta = true
        and id_pilkarza = zawodnik
        order by data_poczatek_kontraktu desc
    ) loop
        klub := r.id_klubu;
        od := r.data_poczatek_kontraktu;
        "do" := r.data_koniec_kontraktu;
        return next;
    end loop;
end;
$$
language plpgsql;




--
-- ostatni kontrakt managera
--

create or replace function daj_ostatni_podpisany_kontrakt_managera(manager int, czas date)
    returns int as
$$
declare
r record;
latest_rekord record;
begin
    for r in
    (
        select * from oferty_managerow
        where id_managera = manager
         and czy_przyjeta = true
         and data_propozycji <= czas
    )
    LOOP
        if latest_rekord is null 
        then latest_rekord := r;
        else
            if latest_rekord.data_propozycji < r.data_propozycji
            then latest_rekord = r;
            end if;
        end if;
    end loop;

    if latest_rekord is null
    then return null;
    end if;

    return latest_rekord.id_oferty_managera;
end;
$$
language plpgsql;









--
-- ostatni obowiazujacy kontrakt managera
--

create or replace function daj_ostatni_obowiazujacy_kontrakt_managera(manager int, czas date)
    returns int as
$$
declare
r record;
latest_rekord record;
begin
    for r in
    (
        select * from oferty_managerow
        where id_managera = manager
         and czy_przyjeta = true
         and data_rozpoczecia_kontraktu <= czas
    )
    LOOP
        if latest_rekord is null
        then latest_rekord := r;
        else
            if latest_rekord is null or latest_rekord.data_propozycji < r.data_propozycji
            then latest_rekord = r;
            end if;
        end if;
    end loop;

    if latest_rekord is null then return null; end if;
    if latest_rekord.data_zakonczenia_kontraktu < czas then return null; end if;

    return latest_rekord.id_oferty_managera;
end;
$$
language plpgsql;




--
-- daj ostatni 
--

drop function if exists daj_ostatni_obowiazujacy_klub_managera(int, int);
create or replace function daj_ostatni_obowiazujacy_klub_managera(manager int, czas date)
    returns int as
$$
declare
oferta int;
rekord record;
begin
    oferta = daj_ostatni_obowiazujacy_kontrakt_managera(manager, czas);
    if oferta is null then return null; end if;

    select * into rekord from oferty_managerow where id_oferty_managera = oferta;

    return rekord.id_klubu;
end;
$$
language plpgsql;








--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
-- sprawdzic czy w triggerach uzywam dobrych dat ???????
-- chyba tak / raczej nulle sa git
-- chociaz 100 procent nie mam pewnosci








--
-- huge function now
-- trying to estimate the club budzet in time
-- based on contracts
-- very basic concept
-- but not that easy i suppose
-- well see when ive finished writing
--

/*
create or replace function daj_estymacje_na_budzet_klubu(int klub, czas date)
    returns numeric as
$$
declare
begin

end;
$$
language
*/

-- left for the day when i have time to think and write it





































