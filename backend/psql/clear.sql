--
-- CLEAR for create.sql
--



begin;


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










commit;