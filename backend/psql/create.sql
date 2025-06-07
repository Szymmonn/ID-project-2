--
-- Database for 'Data Engineering' project
--
-- Title of the project: Football Transfers
--
-- Authors: Tomasz GORNY, Kamil ADAMCZYK, Szymon CHWILA
--
-- 2025
--




--
-- transaction for safety resons
--

BEGIN;



--
-- ALL DROP
--

--Lista pilkarzy
DROP TABLE if exists pilkarze cascade;

--Lista głównych i drugorzędnych pozycji piłkarzy
DROP TABLE if exists pilkarz_pozycja cascade;

--Lista możliwych pozycji na boisku
DROP TABLE if exists pozycje cascade;

--Lista agentów
DROP TABLE if exists agenci cascade;

--Lista klubów
DROP TABLE if exists kluby cascade;

--Budżety klubów ( ich zmiany, typu wpłaty anonimowych sponsorów itp. )
--Powodują zmiany w budżecie klubu
DROP TABLE if exists kluby_budzet cascade;

--Lista stadionów
DROP TABLE if exists stadiony cascade;

--Historia w jakiej lidze był klub, żeby nie rozspójnić danych w klubach o lidze
DROP TABLE if exists historia_klub_liga cascade;

--Lista sezonów
DROP TABLE if exists sezony cascade;

--Historia zawierania współpracy ze sponsorem aby nie rozspójnić danych w klubie przy modyfikacji
DROP TABLE if exists historia_klub_sponsor cascade;

--Lista sponsorów
DROP TABLE if exists sponsorzy cascade;

--Lista lig
DROP TABLE if exists ligi cascade;

--Najpierw kluby dogaduja sie miedzy soba
--A potem z zawodnikiem osobiscie
DROP TABLE if exists oferty_transferowe_klub_klub cascade;

--Chyba ze do konca kontraktu zostalo mniej niz 6mies
DROP TABLE if exists oferty_transferowe_klub_pilkarz cascade;

--Sluzy do oferowania pilkarza na 'forum'
--Jak bysmy chcieli kogos sprzedac
--Albo jak sam chcialby odejsc
DROP TABLE if exists transferroom_sprzedaz cascade;

--Albo potezbujemy kogos kupic na dana pozycje
DROP TABLE if exists transferroom_poszukiwania cascade;

--To co mowi tytul typu żyd
DROP TABLE if exists tabela_zalety_wady_pilkarza cascade;

--Lista meczy
DROP TABLE if exists mecze cascade;

--Jaki piłkarz grał w jakim meczu
DROP TABLE if exists mecz_statystyki_gracze_meczu cascade;

--Jaki piłkarz wchodził na zmiany w meczu, żeby nie utrudniać modyfikacji w poprzedniej tabeli
DROP TABLE if exists mecz_statystyki_zmiany cascade;

--Lista możliwych wydarzeń ( typu kartka, gol )
DROP TABLE if exists mecz_statystyki_wydarzenia cascade;

--Instancje poprzedniej tabeli
DROP TABLE if exists mecz_statystyki_wydarzenia_na_boisku cascade;

--Lista kontuzji w meczach
DROP TABLE if exists kontuzje cascade;

--Lista skautów
DROP TABLE if exists skauci cascade;

--Historia skautów, jaki klub ich w danej chwili zatrudniał
DROP TABLE if exists historia_skauci_kluby cascade;

--Ktory raport zrobil ktory skaut
DROP TABLE if exists skaut_raport cascade;

--Lista raportów przez skautów
DROP TABLE if exists raporty cascade;

--Lista licencji
DROP TABLE if exists licencje cascade;

--Lista menagerów
DROP TABLE if exists managerzy cascade;

--Oferty szukające menagerów przez kluby
DROP TABLE if exists oferty_managerow cascade;

--Lista kraji
DROP TABLE if exists kraje cascade;




--
-- pilkarze CREATE
--

CREATE TABLE pilkarze (
        id_pilkarza serial,
        imie varchar(40) not null default '',
        nazwisko varchar(40) not null default '',

        wzrost_cm int DEFAULT null,
        plec char(1) not null,

        numer_buta int DEFAULT null,
        glowna_noga char(1) DEFAULT null,

        data_urodzenia date not null,
        id_kraju int not null,

        CONSTRAINT pk_pilkarze PRIMARY KEY(id_pilkarza),
        
        CONSTRAINT check_imie CHECK(length(imie) > 0 or length(nazwisko) > 0),
        CONSTRAINT check_wzrost CHECK(wzrost_cm between 100 and 250),
        CONSTRAINT check_numer_buta CHECK(numer_buta between 35 and 50),
        CONSTRAINT check_glowna_noga CHECK(glowna_noga in ('P', 'L', 'A')),     -- 'A' - obie
        CONSTRAINT check_data_urodzenia CHECK(data_urodzenia < now()),
        CONSTRAINT check_plec CHECK(plec in ('M', 'K'))
);


--
-- pilkarz_pozycja CREATE
--

CREATE TABLE pilkarz_pozycja (
        id_pilkarza int not null,
        id_pozycja int not null,

        CONSTRAINT pk_pilkarz_pozycja PRIMARY KEY (id_pilkarza, id_pozycja)
);




--
-- pozycje CREATE
--

CREATE TABLE pozycje (
        id_pozycja serial,
        skrot varchar(10) not null unique,
        pelna_nazwa varchar(60) not null unique,

        CONSTRAINT pk_pozycje PRIMARY KEY(id_pozycja)
);
-- mozna rozbudowac dodajac bardziej specyficzne pozycje






--
-- agenci CREATE
--

CREATE TABLE agenci (
        id_agenta serial,
        imie varchar(40) not null default '',
        nazwisko varchar(40) not null default '',

        CONSTRAINT pk_agenci PRIMARY KEY(id_agenta),

        CONSTRAINT check_imie CHECK(length(imie) > 0 or length(nazwisko) > 0)
);







--
-- kluby CREATE
--

CREATE TABLE kluby (
        id_klubu serial,

        nazwa varchar(120) not null unique,

        miasto varchar(120) not null,
        id_stadionu int DEFAULT null,
        rok_zalozenia int DEFAULT null,

        CONSTRAINT pk_kluby PRIMARY KEY(id_klubu),

        CONSTRAINT check_rok_zalozenia CHECK(rok_zalozenia between 0 and EXTRACT(YEAR FROM NOW())::int)
);



--
-- kluby_budzet CREATE
--

CREATE TABLE kluby_budzet (
        id_klubu int not null,
        kwota_dodana numeric not null,
        data_dofinansowania date default now(),
        powod_dofinansowania text default null,

        CONSTRAINT pk_kluby_budzet PRIMARY KEY(id_klubu, data_dofinansowania) 
);




--
-- stadion CREATE
--

CREATE TABLE stadiony (
        id_stadionu serial,
        nazwa varchar(120) not null unique,
        id_kraju int not null,
        miasto varchar(120) not null,

        CONSTRAINT pk_stadiony PRIMARY KEY(id_stadionu)
);






--
-- historia_klub_liga CREATE
--

CREATE TABLE historia_klub_liga (
        id_klubu int not null,
        id_ligi int not null,
        id_sezonu int not null,

        CONSTRAINT pk_historia_klub_liga PRIMARY KEY(id_klubu, id_ligi, id_sezonu)
);





--
-- sezony CREATE
--

CREATE TABLE sezony (
        id_sezonu int not null,
        data_poczatek date not null,
        data_koniec date not null,
        uwagi text default null,

        CONSTRAINT pk_sezony PRIMARY KEY(id_sezonu),
        
        CONSTRAINT check_data CHECK(data_poczatek < data_koniec),
        CONSTRAINT check_sezon_rok CHECK(EXTRACT(YEAR FROM data_poczatek) + 1 = EXTRACT(YEAR FROM data_koniec)) -- raczej tutaj bez wyjatkow
);






--
-- historia_klub_sponsor CREATE
--

CREATE TABLE historia_klub_sponsor (
        id_klubu int not null,
        id_sponsora int not null,
        data_zawarcia_wspolpracy date not null,
        data_zakonczenia_wpolpracy date DEFAULT null,

        CONSTRAINT pk_historia_klub_sponsor PRIMARY KEY(id_klubu, id_sponsora, data_zawarcia_wspolpracy),

        CONSTRAINT data_zakonczenia_pozniej CHECK(data_zakonczenia_wpolpracy is null or data_zakonczenia_wpolpracy > data_zawarcia_wspolpracy)
);




--
-- sponsor CREATE
--

CREATE TABLE sponsorzy (
        id_sponsora serial,
        nazwa varchar(120) not null unique,

        CONSTRAINT pk_sponsorzy PRIMARY KEY(id_sponsora)
);





--
-- ligi CREATE
--

CREATE TABLE ligi (
        id_ligi serial,
        nazwa varchar(120) not null unique,
        id_kraju int not null,

        CONSTRAINT pk_ligi PRIMARY KEY(id_ligi)
);






--
-- oferty_transferowe_klub_klub CREATE
--

-- nowa oferta nie moze wpylnac wczesniej niz 3 mies od rozpoczecia gry w nowym klubie !!!
CREATE TABLE oferty_transferowe_klub_klub (
        id_oferty_dla_klubu serial,
        id_pilkarza int not null,

        -- klub do ktorego pilkarz ma trafic / przy kontrofertach ma zostac ten sam
        id_klubu int not null,
        data_zlozenia_oferty date not null,

        -- przy kontrofertach agenci powinni zostac tacy sami
        id_agenta_klubu1 int DEFAULT null,
        id_agenta_klubu2 int DEFAULT null,

        czy_zaakceptowana boolean not null default false,

        -- sprawdzic ze faktycznie nie wplynela inna oferta o tego samego pilkarza
        do_negocjacji boolean not null DEFAULT true,
        kto_sklada_oferte char(20) not null,

        -- jednorazowa zaplata
        zaplata int not null,
        ilosc_rat int not null DEFAULT 1,

        -- parametry dla pilkarza
        -- ale tutaj sa podawane / tak ma byc
        dodatek_po_wystepach_w_lidze int DEFAULT null,
        po_ilu_wystepach int DEFAULT null,

        dodatek_za_wystepy_w_lidze int DEFAULT null,
        za_ile_wystepow int DEFAULT null,

        dodatek_jednorazowy_za_strzelone_bramki int DEFAULT null,
        ilosc_bramek_do_dodatku int DEFAULT null,

        -- jednorazowa premia dla klubu jesli zawodnik ktorego oddadza zdobedzie jakies trofeum
        premia_za_osiagniecia_w_rozgrywkach int DEFAULT null,

        -- tak jak wyzej
        procent_z_nastepnego_transferu_w_procentach numeric(2,0) DEFAULT null,

        uwagi text DEFAULT null,

        CONSTRAINT pk_oferty_klub_klub PRIMARY KEY(id_oferty_dla_klubu),

        CONSTRAINT check_data CHECK(data_zlozenia_oferty between '1500-01-01'::date and now()),
        CONSTRAINT check_zaplata CHECK(zaplata >= 0),
        CONSTRAINT check_ilosc_rat CHECK(ilosc_rat >= 1),
        CONSTRAINT check_kto_sklada CHECK(kto_sklada_oferte in ('obecny klub', 'drugi klub')),

        CONSTRAINT check_dodatek_1_1 CHECK(dodatek_po_wystepach_w_lidze > 0),
        CONSTRAINT check_dodatek_1_2 CHECK(po_ilu_wystepach >= 1),
        CONSTRAINT check_dodatek_1_3 CHECK( (dodatek_po_wystepach_w_lidze is null and po_ilu_wystepach is null ) or (dodatek_po_wystepach_w_lidze is not null and po_ilu_wystepach is not null ) ),

        CONSTRAINT check_dodatek_2_1 CHECK(dodatek_za_wystepy_w_lidze > 0),
        CONSTRAINT check_dodatek_2_2 CHECK(za_ile_wystepow >= 1),
        CONSTRAINT check_dodatek_2_3 CHECK( (dodatek_za_wystepy_w_lidze is null and za_ile_wystepow is null) or (dodatek_za_wystepy_w_lidze is not null and za_ile_wystepow is not null) ),

        CONSTRAINT check_dodatek_3_1 CHECK(dodatek_jednorazowy_za_strzelone_bramki > 0),
        CONSTRAINT check_dodatek_3_2 CHECK(ilosc_bramek_do_dodatku > 0),
        CONSTRAINT check_dodatek_3_3 CHECK( (dodatek_jednorazowy_za_strzelone_bramki is null and ilosc_bramek_do_dodatku is null) or (dodatek_jednorazowy_za_strzelone_bramki is not null and ilosc_bramek_do_dodatku is not null) ),

        CONSTRAINT check_dodatek_4 CHECK(premia_za_osiagniecia_w_rozgrywkach > 0),
        CONSTRAINT check_dodatek_5 CHECk(procent_z_nastepnego_transferu_w_procentach > 0),

        CONSTRAINT check_rozni_agenci CHECK(id_agenta_klubu1 <> id_agenta_klubu2)
);







--
-- oferty_transferowe_klub_pilkarz
--

-- stad bedziemy brac informacje aby okreslic w ktorym klubie jest pilkarz
-- trzeba bedzie synchronizowac to z tabela klub_klub
-- ale to chyba ma sens

-- nowa oferta nie moze wpylnac wczesniej niz 3 mies od rozpoczecia gry w nowym klubie
CREATE TABLE oferty_transferowe_klub_pilkarz (
        id_oferty_dla_pilkarza serial,
        
        -- tutaj sa dwa warunki
        -- albo ta oferta jest nastepstwem dogadania sie klubow
        -- i wtedy sprawdzarka to sprawdzi
        -- albo do konca kontraktu pilkarza zostalo mniej niz 6 miesiecy
        -- i wtedy to moze zostac nullem
        id_oferty_od_klubu int,

        -- jesli druga opcja to id musi wskazywac tak jak w kontrakcie klub klub
        id_pilkarza int not null,
        -- musi sie zgadzac
        id_klubu int not null,

        -- moze byc inny / wszak kazdy specjalizuje sie w czyms innym
        id_agenta_klubu int default null,

        -- uznalismy ze tu moze byc dowolnie
        id_agenta_pilkarza int default null,

        -- sprawdzarka wykryje
        data_zlozenia_oferty date not null,

        data_poczatek_kontraktu date not null,
        data_koniec_kontraktu date not null,

        -- jesli tak to updatujemy klub_klub i wrzucamy im tam numer tej oferty
        czy_przyjeta boolean not null default false,

        -- to samo co w klub_klub
        do_negocjacji boolean not null DEFAULT true,
        kto_sklada_oferte char(20) not null,

        -- tutaj juz konkretne dane
        czestosc_wystepow_w_procentach int not null,

        placa_miesieczna int not null,
        kwota_gotowkowa int DEFAULT null,
        oplata_dla_agenta int DEFAULT null,

        premia_za_wystep int DEFAULT null,
        premia_za_bramke int DEFAULT null,
        premia_za_niewykorzystanego_rezerwowego int DEFAULT null,

        uwagi text DEFAULT null,

        CONSTRAINT pk_oferty_klub_pilkarz PRIMARY KEY(id_oferty_dla_pilkarza),

        CONSTRAINT check_data_zlozenia_oferty CHECK (data_zlozenia_oferty between '1800-01-01'::date and now()),
        CONSTRAINT check_data_poczatek_kontraktu CHECK (data_zlozenia_oferty < data_poczatek_kontraktu),
        CONSTRAINT check_data_koniec_kontraktu CHECK (data_poczatek_kontraktu < data_koniec_kontraktu),
        CONSTRAINT check_czestosc_wystepow CHECK (czestosc_wystepow_w_procentach between 0 and 100),

        CONSTRAINT check_kto_sklada CHECK(kto_sklada_oferte in ('pilkarz', 'drugi klub')),

        CONSTRAINT check_czestosc CHECK(czestosc_wystepow_w_procentach >=0 and czestosc_wystepow_w_procentach <=100),

 
        -- nie sprawdzamy budzetu / moze byc ujemny / wtedy lipa dla klubu
        CONSTRAINT check_placa_miesieczna CHECK (placa_miesieczna >= 0),
        CONSTRAINT check_kwota_gotowkowa CHECK (kwota_gotowkowa > 0),

        CONSTRAINT check_oplata_dla_agenta CHECK (oplata_dla_agenta > 0),
        CONSTRAINT check_premia_za_wystep CHECK (premia_za_wystep > 0),
        CONSTRAINT check_premia_za_bramke CHECK (premia_za_bramke > 0),
        CONSTRAINT check_premia_za_niewykorzystanego_rezerwowego CHECK (premia_za_niewykorzystanego_rezerwowego >= 0),

        -- lipa jak jest ten sam
        CONSTRAINT check_rozni_agenci CHECK(id_agenta_klubu <> id_agenta_pilkarza)
);








--
-- tranferroom_sprzedaz CREATE
--

-- jak zawodnik chce sie sprzedac / to klub moze go tu wystawic
CREATE TABLE transferroom_sprzedaz (
        id_oferta_sprzedarzy serial,
        data_wystawienia date not null,
        -- musi byc bo nie da sie tego potem okreslic z historii
        id_klubu int not null,
        id_zawodnika int not null,
        cena_startowa int DEFAULT null,
        uwagi text DEFAULT null,

        CONSTRAINT pk_transferroom_sprzedaz PRIMARY KEY(id_oferta_sprzedarzy),

        CONSTRAINT check_data CHECK(data_wystawienia between '1500-01-01'::date and now()),
        CONSTRAINT check_cena_startowa CHECK(cena_startowa >= 0)
        -- CHECK ze zawodnik musi byc w klubie // to w trigerze
);








--
-- tranferroom_poszukiwania CREATE
--

-- np ktos ma kontuzje na caly sezon / wtedy klub szuka kogos szybo na zastepce
CREATE TABLE transferroom_poszukiwania (
        id_poszukiwania serial,
        id_klubu int not null,
        id_pozycja int DEFAULT null,
        cena_do int DEFAULT null,
        wiek_max int DEFAULT null,
        id_kraju int DEFAULT null,
        id_ligi int DEFAULT null,

        CONSTRAINT pk_transferroom_poszukiwania PRIMARY KEY(id_poszukiwania),

        CONSTRAINT check_cena_do CHECK(cena_do >= 0),
        CONSTRAINT check_wiek_max CHECK(wiek_max between 0 and 100)
);






--
-- tabela_zalety_wady_pilkarza CREATE
--

CREATE TABLE tabela_zalety_wady_pilkarza (
        id_cechy serial,
        opis varchar(120) not null unique,

        CONSTRAINT pk_zalety_wady PRIMARY KEY(id_cechy)
);




--
-- mecze CREATE
--

CREATE TABLE mecze (
        id_meczu serial,
        id_gospodarze int not null,
        id_goscie int not null,
        "data" date not null,
        id_stadionu int not null,
        nierozstrzygniety boolean default false,
        rodzaj_meczu varchar(20),
        uwagi text default null,
        -- mozna dodac startowe ustawienia obu druzyn - ale za duzo roboty + to tylko kloejny lisc

        CONSTRAINT pk_meczu PRIMARY KEY(id_meczu),

        CONSTRAINT check_data CHECK("data" < now() and "data" > '1800-01-01'::date),
        CONSTRAINT check_id_goscie CHECK(id_goscie != id_gospodarze),
        CONSTRAINT check_rodzaj_meczu CHECK(rodzaj_meczu in ('Ligowy','Towarzyski','Pucharowy','Inny'))
);


--
-- mecz_statystyki_gracze_meczu CREATE
--

CREATE TABLE mecz_statystyki_gracze_meczu (
        id_meczu int not null,
        id_pilkarza int not null,
        boisko_lawka char(1) not null,

        CONSTRAINT pk_mecz_statystyki_gracze_meczu PRIMARY KEY (id_meczu, id_pilkarza),

        CONSTRAINT check_boisko_lub_lawka CHECK(boisko_lawka IN('B','L'))
);



--
-- mecz_statystyki_zmiany CREATE
-- 

CREATE TABLE mecz_statystyki_zmiany (
        id_meczu int not null,
        id_pilkarza_zchodzi int not null,
        id_pilkarza_wchodzi int not null,
        minuta int not null,
        minuta_czasu_doliczonego int default null,
        
        CONSTRAINT pk_mecz_statystyki_zmiany PRIMARY KEY(id_meczu, id_pilkarza_wchodzi, id_pilkarza_zchodzi),

        CONSTRAINT check_minuta CHECK(minuta > 0 and minuta <=90),
        CONSTRAINT check_minuta_doliczony CHECK(case when minuta <> 45 and minuta <> 90 then minuta_czasu_doliczonego is null end) 
);



--
-- mecz_statystyki_wydarzenia CREATE
--

CREATE TABLE mecz_statystyki_wydarzenia (
        id_wydarzenia serial,
        nazwa varchar(40),

        CONSTRAINT pk_wydarzenia_enum PRIMARY KEY(id_wydarzenia)
);

--
-- mecz_statystyki_wydarzenia_na_boisku CREATE
--

CREATE TABLE mecz_statystyki_wydarzenia_na_boisku (
        id serial, 
        id_wydarzenia int not null,
        id_meczu int not null,
        id_pilkarza int not null,
        minuta int not null,
        minuta_czasu_doliczonego int default null,

        CONSTRAINT pk_wydarzenia PRIMARY KEY(id),

        CONSTRAINT check_minuta CHECK(minuta > 0 and minuta <=90),
        CONSTRAINT check_minuta_doliczony CHECK(case when minuta <> 45 and minuta <> 90 then minuta_czasu_doliczonego is null end)
);




--
-- kontuzje CREATE
--

CREATE TABLE kontuzje (
        id_pilkarza int not null,
        id_meczu int DEFAULT null,
        data_kontuzji date not null,
        opis_kontuzji text not null,    -- mozna ewentualnie dodac tabele kontuzji - enum + dodatkowy opis
        przewidywany_czas_leczenia_w_dniach int not null,

        CONSTRAINT pk_kontuzje PRIMARY KEY(id_pilkarza, data_kontuzji, opis_kontuzji),

        CONSTRAINT check_przewidywany_czas_leczenia CHECK(przewidywany_czas_leczenia_w_dniach > 0)
);





--
-- skauci CREATE
--

CREATE TABLE skauci (
        id_skauta serial,
        imie varchar(40) not null default '',
        nazwisko varchar(40) not null default '',

        CONSTRAINT check_imie CHECK(length(imie) > 0 or length(nazwisko) > 0),
        CONSTRAINT pk_skauci PRIMARY KEY(id_skauta)
);


--
-- historia_skauci_kluby CREATE
--



-- skaut moze pracowac tylko dla jednego klubu naraz
CREATE TABLE historia_skauci_kluby (
        id_skauta int not null,
        id_klubu int not null,
        data_rozpoczecia_wspolpracy date not null,
        data_zakonczenia_wspolpracy date not null,

        CONSTRAINT pk_historia_skaucu_kluby PRIMARY KEY (id_skauta, id_klubu, data_rozpoczecia_wspolpracy),
        
        CONSTRAINT check_data CHECK(data_rozpoczecia_wspolpracy < data_zakonczenia_wspolpracy)
);



--
-- skaut_raport CREATE
--

create table skaut_raport (
        id_raportu serial,
        id_skauta int not null,
        data_zlozenia_raportu date not null,

        CONSTRAINT pk_skaut_raport PRIMARY KEY(id_raportu),

        CONSTRAINT check_data_zlozenia CHECK(data_zlozenia_raportu between '1800-01-01'::date and now())        -- xd check 
);




--
-- raporty CREATE
--

CREATE TABLE raporty (
        id_raportu int not null unique,
        id_zawodnika int not null,
        ocena_skauta int not null,
        czy_chetny_na_transfer boolean not null DEFAULT true,
        cecha int DEFAULT null,
        uwagi text DEFAULT null,

        CONSTRAINT pk_raporty PRIMARY KEY(id_raportu, id_zawodnika),

        CONSTRAINT check_ocena_skauta CHECK(ocena_skauta between 1 and 10)

        -- trzeba sprawdzic ze nie ma raportu o zawodniku z klubu
        -- ktory zlecil zlecenie
        -- to chyba nie jest trudne / zlozenie kliku funkcji
);



--
-- licencje CREATE
--
-- ('UEFA Pro', 'UEFA Country A', 'UEFA Country B', 'UEFA Country C','UEFA Continental A', 'UEFA Continental B', 'UEFA Continental C');

CREATE TABLE licencje (
        id_licencji serial,
        nazwa varchar(20) not null unique,
        
        CONSTRAINT pk_idlicencja PRIMARY KEY (id_licencji)
);



--
-- managerzy CREATE
--



CREATE TABLE managerzy (
        id_managera serial,
        imie varchar(40) not null default '',
        nazwisko varchar(40) not null default '',
        data_urodzenia date not null,
        kraj_pochodzenia int not null,
        licencja int not null, -- mozna zrobic enuma licencji

        CONSTRAINT pk_manager PRIMARY KEY(id_managera),

        CONSTRAINT check_imie CHECK(length(imie) > 0 or length(nazwisko) > 0),
        CONSTRAINT check_data_urodzenia CHECK(data_urodzenia < now() and data_urodzenia > '1800-01-01'::date)

);




--
-- oferty_managerow CREATE
--

CREATE TABLE oferty_managerow (
        id_oferty_managera serial,
        id_managera int not null,
        id_klubu int not null,
        data_propozycji date not null,
        czy_przyjeta boolean not null,
        pensja int not null,
        data_rozpoczecia_kontraktu date not null,
        data_zakonczenia_kontraktu date not null,

        CONSTRAINT pk_oferty_managerow PRIMARY KEY(id_oferty_managera),

        CONSTRAINT check_pensja CHECK(pensja >= 0),
        CONSTRAINT check_data_oferty CHECK(data_propozycji < data_rozpoczecia_kontraktu),
        CONSTRAINT check_data CHECK(data_rozpoczecia_kontraktu < data_zakonczenia_kontraktu)
);





--
-- kraje CREATE
--

CREATE TABLE kraje (
        id_kraju serial,
        nazwa varchar(60) not null unique,

        CONSTRAINT pk_kraje PRIMARY KEY(id_kraju)
);





--====                  ====--
--====   FOREIGN KEYS   ====--
--====                  ====--




--
-- safety rollback
--


-- ROLLBACK;
COMMIT;

--
-- End of Database
--
