--statystyki_w_meczu

CREATE OR REPLACE FUNCTION statystyki_meczu(id_meczu_param int)
RETURNS TABLE (
    pilkarz text,
    druzyna text,
    wydarzenie varchar(40),
    minuta text
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.imie || ' ' || p.nazwisko as pilkarz,
        k.nazwa as druzyna,
        we.nazwa as wydarzenie,
        CASE 
            WHEN wnb.minuta_czasu_doliczonego IS NULL THEN wnb.minuta::text
            ELSE wnb.minuta::text || '+' || wnb.minuta_czasu_doliczonego::text
        END as minuta
    FROM 
        mecz_statystyki_wydarzenia_na_boisku wnb
    JOIN 
        mecz_statystyki_wydarzenia we ON wnb.id_wydarzenia = we.id_wydarzenia
    JOIN 
        pilkarze p ON wnb.id_pilkarra = p.id_pilkarza
    JOIN 
        kluby k ON p.id_klubu = k.id_klubu
    WHERE wnb.id_meczu = id_meczu_param
    ORDER BY wnb.minuta, COALESCE(wnb.minuta_czasu_doliczonego, 0);
END;
$$ LANGUAGE plpgsql;

--
-- statystyki_pilkarza_w_meczu
--

CREATE OR REPLACE FUNCTION statystyki_pilkarza_w_meczu(
    id_meczu_param int,
    id_pilkarza_param int
)
RETURNS TABLE (
    wydarzenie varchar(40),
    minuta text
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        we.nazwa::varchar(40) as wydarzenie,
        CASE 
            WHEN wnb.minuta_czasu_doliczonego IS NULL THEN wnb.minuta::text || "'"
            ELSE wnb.minuta::text || "'+" || wnb.minuta_czasu_doliczonego::text
        END as minuta
    FROM 
        mecz_statystyki_wydarzenia_na_boisku wnb
    JOIN 
        mecz_statystyki_wydarzenia we ON wnb.id_wydarzenia = we.id_wydarzenia
    WHERE wnb.id_meczu = id_meczu_param AND wnb.id_pilkarra = id_pilkarza_param
    ORDER BY wnb.minuta,COALESCE(wnb.minuta_czasu_doliczonego, 0);
END;
$$ LANGUAGE plpgsql;


--aktualny_budzet_klubu

CREATE OR REPLACE FUNCTION oblicz_aktualny_budzet_klubu(id_klubu_param int)
RETURNS numeric AS $$
DECLARE
    aktualny_budzet numeric := 0;
BEGIN
    -- Sumujemy wszystkie wpływy dla danego klubu
    SELECT COALESCE(SUM(kwota_dodana), 0) 
    INTO aktualny_budzet
    FROM kluby_budzet
    WHERE id_klubu = id_klubu_param;
    
    RETURN aktualny_budzet;
END;
$$ LANGUAGE plpgsql;


--aktualna liga klubu

CREATE OR REPLACE FUNCTION aktualna_liga_klubu(id_klubu_param int)
RETURNS int AS $$
DECLARE
    aktualna_liga int;
    najnowszy_sezon int;
BEGIN
    -- Znajdź najnowszy sezon w historii klubu
    SELECT MAX(id_sezonu) INTO najnowszy_sezon
    FROM historia_klub_liga
    WHERE id_klubu = id_klubu_param;
    
    -- Pobierz ligę dla najnowszego sezonu
    SELECT id_ligi INTO aktualna_liga
    FROM historia_klub_liga
    WHERE id_klubu = id_klubu_param AND id_sezonu = najnowszy_sezon;
    
    RETURN aktualna_liga;
END;
$$ LANGUAGE plpgsql;


-- aktualny_sposor_klubu

CREATE OR REPLACE FUNCTION aktualny_sponsor_klubu(id_klubu_param int)
RETURNS int AS $$
DECLARE
    aktualny_sponsor int;
BEGIN
    -- Znajdź sponsor, którego współpraca nie została zakończona (data_zakonczenia_wpolpracy IS NULL)
    -- i ma najpóźniejszą datę zawarcia współpracy
    SELECT id_sponsora INTO aktualny_sponsor
    FROM historia_klub_sponsor
    WHERE id_klubu = id_klubu_param 
      AND (data_zakonczenia_wpolpracy IS NULL OR data_zakonczenia_wpolpracy > CURRENT_DATE)
    ORDER BY data_zawarcia_wspolpracy DESC
    LIMIT 1;
    
    IF NOT FOUND THEN
        RAISE NOTICE 'Klub o id % nie ma aktualnego sponsora', id_klubu_param;
        RETURN NULL;
    END IF;
    
    RETURN aktualny_sponsor;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION sklad_i_zmiany_w_meczu(id_meczu_param int)
RETURNS TABLE (
    id_pilkarza int,
    imie_nazwisko text,
    czy_startowy boolean,
    minuta_wejscia int,
    minuta_wyjscia int,
    zmieniony_przez int,
    zmienil_kogo int
) AS $$
BEGIN
    -- Najpierw zwracamy skład startowy (zakładając, że jest w tabeli mecz_statystyki_gracze_meczu)
    RETURN QUERY
    SELECT 
        p.id_pilkarza,
        p.imie || ' ' || p.nazwisko as imie_nazwisko,
        true as czy_startowy,
        0 as minuta_wejscia,
        CASE 
            WHEN z.id_pilkarza_zchodzi = p.id_pilkarza THEN z.minuta
            ELSE 90
        END as minuta_wyjscia,
        NULL::int as zmieniony_przez,
        NULL::int as zmienil_kogo
    FROM mecz_statystyki_gracze_meczu gm
    JOIN pilkarze p ON gm.id_pilkarza = p.id_pilkarza
    LEFT JOIN mecz_statystyki_zmiany z ON gm.id_meczu = z.id_meczu AND z.id_pilkarza_zchodzi = p.id_pilkarza
    WHERE gm.id_meczu = id_meczu_param AND gm.czy_w_kadrze = true
    ORDER BY minuta_wyjscia;

    -- Następnie zwracamy wszystkich zawodników, którzy weszli z ławki
    RETURN QUERY
    SELECT 
        p.id_pilkarza,
        p.imie || ' ' || p.nazwisko as imie_nazwisko,
        false as czy_startowy,
        z.minuta as minuta_wejscia,
        90 as minuta_wyjscia,
        z.id_pilkarza_wchodzi as zmieniony_przez,
        z.id_pilkarza_zchodzi as zmienil_kogo
    FROM mecz_statystyki_zmiany z
    JOIN pilkarze p ON z.id_pilkarza_wchodzi = p.id_pilkarza
    WHERE z.id_meczu = id_meczu_param
    ORDER BY minuta_wejscia;

    -- Dodatkowo możemy dodać zawodników, którzy byli w kadrze ale nie grali
    RETURN QUERY
    SELECT 
        p.id_pilkarza,
        p.imie || ' ' || p.nazwisko as imie_nazwisko,
        false as czy_startowy,
        NULL::int as minuta_wejscia,
        NULL::int as minuta_wyjscia,
        NULL::int as zmieniony_przez,
        NULL::int as zmienil_kogo
    FROM mecz_statystyki_gracze_meczu gm
    JOIN pilkarze p ON gm.id_pilkarza = p.id_pilkarza
    WHERE gm.id_meczu = id_meczu_param AND gm.czy_w_kadrze = true
    AND p.id_pilkarza NOT IN (
        SELECT id_pilkarza FROM mecz_statystyki_gracze_meczu WHERE id_meczu = id_meczu_param AND czy_w_kadrze = true
        UNION
        SELECT id_pilkarza_wchodzi FROM mecz_statystyki_zmiany WHERE id_meczu = id_meczu_param
    );
END;
$$ LANGUAGE plpgsql;

--statystyki sezonowe gracza

CREATE OR REPLACE FUNCTION statystyki_sezonowe(id_pilkarza_param integer, id_sezonu_param integer)
RETURNS TABLE (
    gole integer,
    asysty integer,
    zolte_kartki integer,
    czerwone_kartki integer,
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(CASE WHEN mw.id_wydarzenia = 1 THEN 1 END)::integer as gole, -- 1 = gol
        COUNT(CASE WHEN mw.id_wydarzenia = 2 THEN 1 END)::integer as asysty, -- 2 = asysta
        COUNT(CASE WHEN mw.id_wydarzenia = 3 THEN 1 END)::integer as zolte_kartki, -- 3 = żółta kartka
        COUNT(CASE WHEN mw.id_wydarzenia = 4 THEN 1 END)::integer as czerwone_kartki, -- 4 = czerwona kartka
    FROM
        mecze m
    LEFT JOIN
        mecz_statystyki_wydarzenia_na_boisku ms ON m.id_meczu = ms.id_meczu AND ms.id_pilkarza = id_pilkarza_param
    LEFT JOIN
        mecz_statystyki_wydarzenia using(id_wydarzenia)
    WHERE
        m.id_sezonu = id_sezonu_param;
END;
$$ LANGUAGE plpgsql;


-----tomkowi powiedziec zeby zrobil pilkarzy bedacych w danym klubie w danej dacie 


-- sprawdzanie czy pilkarz wogole z klubu jest aby moc dolaczyc do meczu
-- do mecz_statystyki_gracze_meczu

CREATE OR REPLACE FUNCTION sprawdz_czy_w_klubie(id_pilkarza int)
RETURNS TRIGGER AS $$
DECLARE
    data_meczu date;
    id_klubu int;
    klub1 int;
    klub2 int;
BEGIN
    
    SELECT "data" INTO data_meczu
    FROM mecz_statystyki_gracze_meczu m join mecze using(id_meczu)
    WHERE NEW.id_meczu = m.id_meczu;

    id_klubu := aktualny_klub_pilkarza(NEW.id_pilkarza, data_meczu);
    klub1

    SELECT id_gospodarze INTO klub1
    FROM mecze
    WHERE NEW.id_meczu = mecze.id_meczu;

    SELECT id_goscie INTO klub2
    FROM mecze
    WHERE NEW.id_meczu = mecze.id_meczu;

    IF id_klubu != klub1 AND id_klubu != klub2 THEN
        REtuRN NULL;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ensuring 11 osob

CREATE OR REPLACE FUNCTION sprawdz_limit_startowej_jedenastki()
RETURNS TRIGGER AS $$
DECLARE
    data_meczu date;
    id_klubu int;
    liczba_zawodnikow_na_boisku int;
BEGIN

    SELECT "data" INTO data_meczu
    FROM mecz_statystyki_gracze_meczu m join mecze using(id_meczu)
    WHERE NEW.id_meczu = m.id_meczu;

    --juz sprawdzilismy se ze chlopina z klubu to teraz czy nie chce wejszc jako 12 osoba z druzyny
    IF NEW.boisko_lawka != 'B' THEN
        RETURN NEW;
    END IF;

    if (
        select id_goscie
        from mecze
        where id_meczu = NEW.id_meczu
    ) = aktualny_klub_pilkarza(NEW.id_pilkarza, data_meczu) then
        id_klubu := id_goscie;
    elsif 
        id_klubu := id_gospodarze;
    end if;

    select count(*) into liczba_zawodnikow_na_boisku
    from mecz_statystyki_gracze_meczu ms join mecze using(id_meczu)
    where id_meczu = NEW.id_meczu and aktualny_klub_pilkarza(ms.id_pilkarza,data_meczu) = id_klubu and new.boisko_lawka = 'B';

    if liczba_zawodnikow_na_boisku > 11 then
        return null;
    end if;

    return new;
END;
$$ LANGUAGE plpgsql;

-- sprawdzamy czy istnieje piłkarz aby sie moc zmienic

CREATE OR REPLACE FUNCTION sprawdz_czy_istnieje_pilkarz_na_boisku_z_ktorym_sie_zmieniamy()
RETURNS TRIGGER AS $$
DECLARE
    data_meczu date;
    id_klubu int;
    liczba_zawodnikow_na_boisku int;
BEGIN
    IF NEW.boisko_lawka != 'B' THEN
        RETURN NEW;
    END IF;

    SELECT "data" INTO data_meczu
    FROM mecze
    WHERE id_meczu = NEW.id_meczu;


    id_klubu := aktualny_klub_pilkarza(NEW.id_pilkarza,data_meczu);


    SELECT COUNT(*) INTO liczba_zawodnikow_na_boisku
    FROM mecz_statystyki_gracze_meczu msgm
    WHERE msgm.id_meczu = NEW.id_meczu
      AND msgm.boisko_lawka = 'B';

    IF liczba_zawodnikow_na_boisku >= 11 THEN
        RETURN NULL;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- trigger, nie pozwala na dodanie do mecz_statystyki_gracze_meczu gracza nie z tego klubu

CREATE OR REPLACE FUNCTION sprawdz_czy_pilkarz_nalezy_do_klubu_z_meczu()
RETURNS TRIGGER AS $$
DECLARE
    data_meczu date;
    klub_pilkarza int;
    id_klubu_gospodarzy int;
    id_klubu_gosci int;
BEGIN
    SELECT "data", id_gospodarze, id_goscie
    INTO data_meczu, id_klubu_gospodarzy, id_klubu_gosci
    FROM mecze
    WHERE id_meczu = NEW.id_meczu;

    klub_pilkarza := aktualnyklubpilkarza(NEW.id_pilkarza, data_meczu);

    IF klub_pilkarza IS DISTINCT FROM id_klubu_gospodarzy AND klub_pilkarza IS DISTINCT FROM id_klubu_gosci THEN
        RETURN NULL;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


--tak samo do zmian

CREATE OR REPLACE FUNCTION sprawdz_klub_zawodnikow_w_zmianie()
RETURNS TRIGGER AS $$
DECLARE
    data_meczu date;
    klub_pilkarza_wchodzi int;
    klub_pilkarza_schodzi int;
    id_klubu_gospodarzy int;
    id_klubu_gosci int;
BEGIN
    -- Pobierz datę i kluby grające w danym meczu
    SELECT "data", id_gospodarze, id_goscie
    INTO data_meczu, id_klubu_gospodarzy, id_klubu_gosci
    FROM mecze
    WHERE id_meczu = NEW.id_meczu;

    -- Ustal kluby zawodników w dniu meczu
    klub_pilkarza_wchodzi := aktualnyklubpilkarza(NEW.id_pilkarza_wchodzi, data_meczu);
    klub_pilkarza_schodzi := aktualnyklubpilkarza(NEW.id_pilkarza_zchodzi, data_meczu);

    -- Sprawdzenie – jeśli którykolwiek z zawodników nie gra dla żadnego z klubów meczu
    IF klub_pilkarza_wchodzi = id_klubu_gospodarzy AND klub_pilkarza_zchodzi = id_klubu_gospodarzy THEN
        return NEW;
    END IF;

    IF klub_pilkarza_wchodzi = id_klubu_gosci AND klub_pilkarza_zchodzi = id_klubu_gosci THEN
        return NEW;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

