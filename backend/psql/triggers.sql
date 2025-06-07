--
-- This file is meant to 
--
-- implement all of the tiggers and rules
--
-- based on functions from functions.sql
--


--====================== TRANSFERY TRIGGERS ========================--



BEGIN;




--
-- klub nie moze skladac oferty sam sobie - pilkarz nie moze nalezec do tego samego klubu w klub_klub
--

create or replace function pilkarz_nie_moze_nalezec_do_tego_samego_klubu_ktory_chce_go_kupic()
    returns trigger as
$$
DECLARE
ostatni_kontrakt int;
BEGIN
    ostatni_kontrakt := daj_ostatni_obowiazujacy_kontrakt_pilkarza(new.id_pilkarza, new.data_zlozenia_oferty);
    if (ostatni_kontrakt is null) then return new; end if;
    if ((select id_klubu from oferty_transferowe_klub_pilkarz where id_oferty_dla_pilkarza = ostatni_kontrakt) = new.id_klubu) then return null; end if;
    return new;
end;
$$
LANGUAGE plpgsql;

create or replace trigger pilkarz_nie_moze_nalezec_do_tego_samego_klubu_ktory_chce_go_kupic
before insert
on oferty_transferowe_klub_klub
for each row
execute function pilkarz_nie_moze_nalezec_do_tego_samego_klubu_ktory_chce_go_kupic();
















--
-- skladac oferty mozna dopiwro po 3 mies od nowego kontraktu
--

create or replace function nowa_oferta_dopiero_po_3_mies()
    returns trigger as 
$$
DECLARE
ostatni_kontrakt int;
ostatni_rekord record;
BEGIN
    ostatni_kontrakt := daj_ostatni_podpisany_kontrakt_pilkarza(new.id_pilkarza, new.data_zlozenia_oferty);
    if ostatni_kontrakt is null then return new; end if;
    ostatni_rekord := (select * from oferty_transferowe_klub_pilkarz where id_oferty_dla_pilkarza = ostatni_kontrakt);

    if ostatni_rekord.data_zlozenia_oferty + interval '3 months' > new.data_zlozenia_oferty then
        return null;
    end if;

    return new;
end;
$$
LANGUAGE plpgsql;

create or replace trigger nowa_oferta_dopiero_po_3_mies_na_klub_pilkarz
before insert
on oferty_transferowe_klub_pilkarz
for each row
execute function nowa_oferta_dopiero_po_3_mies();








--
-- to samo ale klub_klub
--

create or replace trigger nowa_oferta_dopiero_po_3_mies_na_klub_klub
before insert
on oferty_transferowe_klub_klub
for each row
execute function nowa_oferta_dopiero_po_3_mies();





--
-- bezposrednia oferta dla pilkarza tylko jesli do konca zostalo mniej niz 6 miesiecy
--

create or replace function bezposrednia_oferta_dla_pilkarza_jesli_zostalo_mniej_niz_6_mies()
    returns trigger as
$$
DECLARE
ostatni_kontrakt int;
ostatni_rekord record;
BEGIN
    ostatni_kontrakt := daj_ostatni_obowiazujacy_kontrakt_pilkarza(new.id_pilkarza, new.data_zlozenia_oferty);
    if ostatni_kontrakt is null then return new; end if;
    ostatni_rekord := (select * from oferty_transferowe_klub_pilkarz where id_oferty_dla_pilkarza = ostatni_kontrakt);

    if new.id_oferty_od_klubu is null 
        and ostatni_kontrakt.data_poczatek_kontraktu < ostatni_kontrakt.data_koniec - interval '6 months'
    then return null;
    end if;

    return new;
end;
$$
LANGUAGE plpgsql;

create or replace trigger bezposrednia_oferta_dla_pilkarza_jesli_zostalo_mniej_niz_6_mies
before insert
on oferty_transferowe_klub_pilkarz
for each row
execute function bezposrednia_oferta_dla_pilkarza_jesli_zostalo_mniej_niz_6_mies();



--
-- jesli najpierw wplynela oferta do klubu to oferta dla pilkarza tylko po akcepcie
--

create or replace function oferta_dla_zawodnika_tylko_po_akcepcie_od_klubu()
    returns trigger as
$$
DECLARE
oferta record;
BEGIN
    if new.oferta_od_klubu is null then return new; end if;

    SELECT * into oferta
    from oferty_transferowe_klub_klub
    where id_oferty_dla_klubu = new.id_oferty_od_klubu;

    if (oferta.czy_zaakceptowana = false) then return null; end if;
    return new;

end;
$$
LANGUAGE plpgsql;

create or replace trigger oferta_dla_zawodnika_tylko_po_akcepcie_od_klubu
before insert
on oferty_transferowe_klub_pilkarz
for each row
execute function oferta_dla_zawodnika_tylko_po_akcepcie_od_klubu();



--
-- jesli najpierw byla oferta od klubu to w ofercie dla zawodnika klub musi sie zgadzac
--

create or replace function klub_w_obu_ofertach_musi_sie_zgadzac() 
    returns trigger as
$$
declare
oferta record;
BEGIN
    if new.id_oferty_od_klubu is null then return new; end if;
    
    select * into oferta
    from oferty_transferowe_klub_klub
    where id_oferty_dla_klubu = new.oferta_od_klubu;

    if new.id_klubu <> oferta.id_klubu then return null; end if;

    return new;
end;
$$
LANGUAGE plpgsql;

create or replace trigger klub_w_obu_ofertach_musi_sie_zgadzac
before insert
on oferty_transferowe_klub_pilkarz
for each row 
execute function klub_w_obu_ofertach_musi_sie_zgadzac();

--
-- zawodnik tez musi sie zgadzac
--

create or replace function pilkarz_w_obu_ofertach_musi_sie_zgadzac()
    returns trigger as
$$
declare
oferta record;
BEGIN
    if new.id_oferty_od_klubu is null then return new; end if;
    
    select * into oferta
    from oferty_transferowe_klub_klub
    where id_oferty_dla_klubu = new.oferta_od_klubu;

    if new.id_pilkarza <> oferta.id_pilkarza then return null; end if;

end;
$$
LANGUAGE plpgsql;

create or replace trigger pilkarz_w_obu_ofertach_musi_sie_zgadzac
before insert
on oferty_transferowe_klub_pilkarz
for each row
execute function pilkarz_w_obu_ofertach_musi_sie_zgadzac();









---================================== TRANSFERROOM TRIGGERS ====================================--



--
-- jakis klub daje pilkarza do transferrooma - posiada tego pilkarza
--

create or replace function klub_ktory_wystawia_zawodnika_na_transferroom_posiada_go()
    returns trigger as
$$
declare
ostatni_kontrakt int;
ostatni_rekord record;
BEGIN
    ostatni_kontrakt := daj_ostatni_podpisany_kontrakt_pilkarza(new.id_pilkarza, new.data_zlozenia_oferty);
    if ostatni_kontrakt is null then return new; end if;
    ostatni_rekord := (select * from oferty_transferowe_klub_pilkarz where id_oferty_dla_klubu = ostatni_kontrakt);

    if new.id_klubu <> ostatni_rekord.id_klubu
    then return null;
    end if;
    return new;
end;
$$
LANGUAGE plpgsql;


create or replace trigger klub_ktory_wystawia_zawodnika_na_transferroom_posiada_go
before insert
on transferroom_sprzedaz
for each row
execute function klub_ktory_wystawia_zawodnika_na_transferroom_posiada_go();





--============================== SKAUCI TRIGGERS ============================--


--
-- skaut pracuje tylko dla jednego kllubu
--


create or replace function skaut_pracuje_dla_jednego_klubu()
    returns trigger as
$$
declare
BEGIN
    if 0 <> (select count(*) from historia_skauci_kluby where new.data_rozpoczecia_wspolpracy < data_zakonczenia_wpolpracy)
    then return null;
    end if;

    return new;
end;
$$
LANGUAGE plpgsql;

create or replace trigger skaut_pracuje_dla_jednego_klubu
before insert
on historia_skauci_kluby
for each row
execute function skaut_pracuje_dla_jednego_klubu();



--
-- skuat nie skautuje graczy z ich klubow
-- oraz skaut nie skautuje jesli nie ma pracodawcy
--

create or replace function skaut_skautuje()
    returns trigger as
$$
declare
skaut int;
obecny_klub_skauta int;
obecny_klub_pilkarza int;
begin
    select id_skauta into skaut
    from skaut_raport s
    where s.id_raportu = new.id_raportu;

    select id_klubu into obecny_klub_skauta
    from historia_skauci_kluby
    where data_rozpoczecia_wspolpracy < new.data_zlozenia_raportu
     and data_zakonczenia_wpolpracy > new.data_zlozenia_raportu;

    if obecny_klub_skauta is null then return null; end if;

    obecny_klub_pilkarza = daj_ostatni_obowiazujacy_klub_pilkarza(new.pilkarz, data_zlozenia_raportu);

    if obecny_klub_pilkarza = obecny_klub_skauta then return null; end if;

    return new;


end;
$$
language plpgsql;

create or replace trigger skaut_skautuje
before insert
on skaut_raport
for each row
execute function skaut_skautuje();






---============================== MANAGERZY TRIGGERS ==============================--

-- klub ma jednego managera

create or replace function klub_ma_co_najwyzej_jedngo_managera()
    returns trigger as
$$
declare
obecny_klub int;
begin
    obecny_klub := new.id_klubu;
    if 0 <> (select count(*)
            from oferty_managerow
            where id_klubu = obecny_klub
            and data_zakonczenia_kontraktu > new.data_rozpoczecia_kontraktu 
            )
    then return null;
    end if;

    return new;
end;
$$
language plpgsql;

create or replace trigger klub_ma_co_najwyzej_jedngo_managera
before insert
on oferty_managerow
for each row
execute function klub_ma_co_najwyzej_jedngo_managera();




-- manager ma co najwyzej jeden klub

create or replace function manager_ma_co_najwyzej_jeden_klub()
    returns trigger as
$$
declare
begin
    if 0 <> (select count(*)
            from oferty_managerow
            where id_managera = new.id_managera
            and data_zakonczenia_kontraktu > new.data_rozpoczecia_kontraktu
            )
    then return null;
    end if;

    return new;
end;
$$
LANGUAGE plpgsql;

create or replace trigger manager_ma_co_najwyzej_jeden_klub
before insert
on oferty_managerow
for each row
execute function manager_ma_co_najwyzej_jeden_klub();



















COMMIT;



