--
-- First file with data for our table
--
-- oh boy here we go
--
-- only good data here
--



-- pilkarze - osobny plik
-- pozycje - osobny plik
-- 1) managerzy
-- 2) licencje
-- 3) skauci
-- 4) mecze
-- 5) mecze_statystyki_


begin;

COPY managerzy(imie, nazwisko, data_urodzenia, kraj_pochodzenia, licencja) FROM stdin WITH DELIMITER ',';
Alex,Ferguson,1941-12-31,6,5
Pep,Guardiola,1971-01-18,21,5
Jürgen,Klopp,1967-06-16,18,5
Carlo,Ancelotti,1959-06-10,22,5
Mikel,Arteta,1982-03-26,21,4
Erik,ten Hag,1970-02-02,10,4
Mauricio,Pochettino,1972-03-02,4,4
Thomas,Tuchel,1973-08-29,18,5
Steven,Gerrard,1980-05-30,1,3
Wayne,Rooney,1985-10-24,1,2
Rafa,Benítez,1960-04-16,21,5
Paulo,Sousa,1970-08-30,2,4
Zinedine,Zidane,1972-06-23,7,5
Didier,Deschamps,1968-10-15,7,5
Ole,Gunnar Solskjaer,1973-02-26,23,3
Frank,Lampard,1978-06-20,1,3
Jan,Sobieski,1975-11-20,13,3
Slavisa,Jokanovic,1968-08-16,16,4
Ronald,Koeman,1963-03-21,10,4
Kasper,Hjulmand,1972-04-09,5,4
\.

COPY oferty_managerow (id_managera, id_klubu, data_propozycji, czy_przyjeta, pensja, data_rozpoczecia_kontraktu, data_zakonczenia_kontraktu) FROM stdin WITH DELIMITER ',';
1,1,2024-06-01,true,100000,2024-07-01,2025-06-30
2,2,2024-06-01,true,95000,2024-07-01,2025-06-30
3,3,2024-06-01,true,90,2024-07-01,2025-06-30
4,4,2024-06-01,true,99000,2024-07-01,2025-06-30
5,5,2024-06-01,true,85000,2024-07-01,2025-06-30
6,6,2024-06-01,true,87000,2024-07-01,2025-06-30
7,7,2024-06-01,true,78000,2024-07-01,2025-06-30
8,8,2024-06-01,true,76000,2024-07-01,2025-06-30
9,9,2024-06-01,true,72000,2024-07-01,2025-06-30
10,10,2024-06-01,true,71000,2024-07-01,2025-06-30
11,11,2024-06-01,true,70000,2024-07-01,2025-06-30
12,12,2024-06-01,true,69000,2024-07-01,2025-06-30
13,1,2024-05-20,false,88000,2024-06-15,2025-06-14
14,2,2024-05-15,false,87000,2024-06-20,2025-06-20
15,3,2024-05-10,false,85000,2024-06-15,2025-06-15
2,4,2024-06-10,false,100000,2024-07-01,2025-06-30
4,5,2024-05-25,false,92000,2024-06-25,2025-06-25
7,6,2024-05-15,false,81000,2024-06-15,2025-06-15
16,7,2024-05-28,false,75000,2024-06-28,2025-06-28
17,8,2024-05-18,false,74000,2024-06-18,2025-06-18
5,9,2024-05-10,false,71000,2024-06-10,2025-06-10
6,10,2024-06-05,false,70500,2024-07-05,2025-07-05
8,11,2024-05-22,false,69500,2024-06-22,2025-06-22
9,12,2024-06-01,false,68500,2024-07-01,2025-06-30
\.


COPY licencje(nazwa) FROM stdin WITH DELIMITER ',';
UEFA Pro
UEFA Country A
UEFA Country B
UEFA Country C
UEFA Continental A
UEFA Continental B
UEFA Continental C
\.

COPY skauci(imie, nazwisko) FROM stdin WITH DELIMITER ',';
Marcin,Nowicki
Anna,Kowal
Tomasz,Borowski
Ewelina,Sobczak
Piotr,Kalinowski
Magdalena,Czerwińska
Robert,Maj
Karolina,Ostrowska
Michał,Baran
Agnieszka,Piasecka
Grzegorz,Szulc
Justyna,Markowska
Paweł,Czech
Natalia,Lis
Andrzej,Mazurek
Katarzyna,Krupa
Wojciech,Sawicki
Izabela,Kędzierska
Szymon,Maciejewski
Monika,Wrona
Adam,Głowacki
Beata,Kozioł
Kacper,Zieliński
Dorota,Kamińska
Janusz,Król
Emilia,Rutkowska
Damian,Sikorski
Renata,Malinowska
Krzysztof,Witkowski
Zofia,Domańska
\.


COPY mecze(id_gospodarze, id_goscie, "data", id_stadionu, nierozstrzygniety, rodzaj_meczu, uwagi) FROM stdin WITH DELIMITER ',';
1,2,2024-08-01,1,false,Ligowy,Kolejka 1 -- Premier League 
3,4,2024-08-01,3,false,Ligowy,Kolejka 1 -- Premier League 
5,6,2024-08-01,5,false,Ligowy,Kolejka 1 -- Premier League 
1,3,2024-08-08,1,false,Ligowy,Kolejka 2 -- Premier League 
2,4,2024-08-08,2,false,Ligowy,Kolejka 2 -- Premier League 
6,5,2024-08-08,6,false,Ligowy,Kolejka 2 -- Premier League 
1,4,2024-08-15,1,false,Ligowy,Kolejka 3 -- Premier League 
2,5,2024-08-15,2,false,Ligowy,Kolejka 3 -- Premier League 
3,6,2024-08-15,3,false,Ligowy,Kolejka 3 -- Premier League 
1,5,2024-08-22,1,false,Ligowy,Kolejka 4 -- Premier League 
2,6,2024-08-22,2,false,Ligowy,Kolejka 4 -- Premier League 
4,3,2024-08-22,4,false,Ligowy,Kolejka 4 -- Premier League 
1,6,2024-08-29,1,false,Ligowy,Kolejka 5 -- Premier League 
3,2,2024-08-29,3,false,Ligowy,Kolejka 5 -- Premier League 
4,5,2024-08-29,4,false,Ligowy,Kolejka 5 -- Premier League 
5,2,2024-09-05,5,false,Ligowy,Kolejka 6 -- Premier League 
6,3,2024-09-05,6,false,Ligowy,Kolejka 6 -- Premier League 
4,1,2024-09-05,4,false,Ligowy,Kolejka 6 -- Premier League 
1,4,2024-09-15,1,false,Pucharowy,Polfinal -- Faza pucharowa Premier League
2,3,2024-09-15,2,false,Pucharowy,Polfinal -- Faza pucharowa Premier League
1,2,2024-09-22,3,false,Pucharowy,Final rozgrywek Premier League
7,8,2024-08-01,7,false,Ligowy,Kolejka 1 -- Ekstraklasa
9,10,2024-08-01,9,false,Ligowy,Kolejka 1 -- Ekstraklasa
11,12,2024-08-01,11,false,Ligowy,Kolejka 1 -- Ekstraklasa
8,9,2024-08-08,8,false,Ligowy,Kolejka 2 -- Ekstraklasa
10,11,2024-08-08,10,false,Ligowy,Kolejka 2 -- Ekstraklasa
12,7,2024-08-08,12,false,Ligowy,Kolejka 2 -- Ekstraklasa
\.
-- Final (na neutralnym stadionie, np. stadion 3 – Anfield)
-- Półfinały: 1 vs 4, 2 vs 3 (przykładowo)
COPY mecz_statystyki_zmiany (id_meczu, id_pilkarza_zchodzi, id_pilkarza_wchodzi, minuta, minuta_czasu_doliczonego) FROM stdin WITH DELIMITER ',';
1,1,12,60,\N
1,2,13,61,\N
1,3,14,62,\N
1,21,32,60,\N
1,22,33,61,\N
1,23,34,62,\N
2,41,52,60,\N
2,42,53,61,\N
2,43,54,62,\N
2,61,72,60,\N
2,62,73,61,\N
2,63,74,62,\N
3,81,92,60,\N
3,82,93,61,\N
3,83,94,62,\N
3,101,112,60,\N
3,102,113,61,\N
3,103,114,62,\N
4,1,12,60,\N
4,2,13,61,\N
4,3,14,62,\N
5,23,34,62,\N
5,61,72,60,\N
5,63,74,62,\N
6,101,112,60,\N
6,81,92,60,\N
6,82,93,61,\N
6,83,94,62,\N
7,1,12,60,\N
7,61,72,60,\N
7,62,73,61,\N
7,63,74,62,\N
8,21,32,60,\N
8,22,33,61,\N
8,82,93,61,\N
9,41,52,60,\N
9,42,53,61,\N
9,102,113,61,\N
9,103,114,62,\N
11,23,34,62,\N
11,101,112,60,\N
11,102,113,61,\N
11,103,114,62,\N
12,61,72,60,\N
12,63,74,62,\N
12,41,52,60,\N
12,42,53,61,\N
12,43,54,62,\N
13,1,12,60,\N
13,2,13,61,\N
13,3,14,62,\N
13,101,112,60,\N
13,102,113,61,\N
13,103,114,62,\N
14,41,52,60,\N
14,42,53,61,\N
14,43,54,62,\N
14,21,32,60,\N
14,22,33,61,\N
14,23,34,62,\N
15,61,72,60,\N
15,62,73,61,\N
15,63,74,62,\N
15,81,92,60,\N
15,82,93,61,\N
15,83,94,62,\N
16,81,92,60,\N
16,82,93,61,\N
16,83,94,62,\N
16,21,32,60,\N
16,22,33,61,\N
16,23,34,62,\N
17,101,112,60,\N
17,102,113,61,\N
17,103,114,62,\N
17,41,52,60,\N
17,42,53,61,\N
17,43,54,62,\N
18,61,72,60,\N
18,63,74,62,\N
18,1,12,60,\N
18,3,14,62,\N
19,1,12,60,\N
19,2,13,61,\N
19,3,14,62,\N
19,61,72,60,\N
19,62,73,61,\N
19,63,74,62,\N
20,21,32,60,\N
20,22,33,61,\N
20,23,34,62,\N
20,41,52,60,\N
20,42,53,61,\N
20,43,54,62,\N
21,1,12,60,\N
21,2,13,61,\N
21,3,14,62,\N
21,21,32,60,\N
21,22,33,61,\N
21,23,34,62,\N
22,121,132,60,\N
22,143,154,62,\N
23,161,172,60,\N
23,181,192,60,\N
23,182,193,61,\N
23,183,194,62,\N
24,201,212,60,\N
24,222,233,61,\N
24,223,234,62,\N
25,141,152,60,\N
25,161,172,60,\N
25,162,173,61,\N
25,163,174,62,\N
26,181,192,60,\N
26,183,194,62,\N
26,201,212,60,\N
26,203,214,62,\N
27,221,232,60,\N
27,222,233,61,\N
27,223,234,62,\N
27,122,133,61,\N
27,123,134,62,\N
\.








COPY mecz_statystyki_wydarzenia (nazwa) FROM stdin WITH DELIMITER ',';
Gol
Strzał na bramke
Strzał niecelny
Rzut wolny
Rzut rożny
Rzut karny
Wyrzut z autu
Obrona bramkarza
Żółta kartka
Czerwona kartka
Faul
Spalony
\.


COPY mecz_statystyki_wydarzenia_na_boisku (id_wydarzenia, id_meczu, id_pilkarza, minuta, minuta_czasu_doliczonego) FROM stdin WITH DELIMITER ',';
7,1,4,1,\N
11,1,26,3,\N
7,1,5,4,\N
11,1,28,5,\N
7,1,10,6,\N
11,1,7,7,\N
3,1,11,7,\N
2,1,10,10,\N
2,1,9,11,\N
1,1,10,13,\N
11,1,24,16,\N
11,1,27,20,\N
1,1,10,21,\N
5,1,28,25,\N
2,1,6,40,\N
8,1,21,40,\N
3,1,10,45,3
3,1,7,48,\N
3,1,9,51,\N
1,1,10,55,\N
9,1,24,66,\N
6,1,10,70,\N
1,1,10,71,\N
5,1,30,88,\N
1,1,31,90,\N
3,1,31,90,2
1,2,41,10,\N
2,2,42,20,\N
3,2,43,30,\N
4,2,61,10,\N
5,2,62,20,\N
6,2,63,30,\N
1,3,81,10,\N
2,3,82,20,\N
3,3,83,30,\N
4,3,101,10,\N
5,3,102,20,\N
6,3,103,30,\N
1,4,1,10,\N
2,4,2,20,\N
3,4,3,30,\N
4,4,41,10,\N
5,4,42,20,\N
6,4,43,30,\N
1,5,21,10,\N
2,5,22,20,\N
3,5,23,30,\N
4,5,61,10,\N
5,5,62,20,\N
6,5,63,30,\N
1,6,101,10,\N
2,6,102,20,\N
3,6,103,30,\N
4,6,81,10,\N
5,6,82,20,\N
6,6,83,30,\N
1,7,1,10,\N
2,7,2,20,\N
3,7,3,30,\N
4,7,61,10,\N
5,7,62,20,\N
6,7,63,30,\N
1,8,21,10,\N
2,8,22,20,\N
3,8,23,30,\N
4,8,81,10,\N
5,8,82,20,\N
6,8,83,30,\N
1,9,41,10,\N
2,9,42,20,\N
3,9,43,30,\N
4,9,101,10,\N
5,9,102,20,\N
6,9,103,30,\N
1,10,1,10,\N
2,10,2,20,\N
3,10,3,30,\N
4,10,81,10,\N
5,10,82,20,\N
6,10,83,30,\N
1,11,21,10,\N
2,11,22,20,\N
3,11,23,30,\N
4,11,101,10,\N
5,11,102,20,\N
6,11,103,30,\N
1,12,61,10,\N
2,12,62,20,\N
3,12,63,30,\N
4,12,41,10,\N
5,12,42,20,\N
6,12,43,30,\N
1,13,1,10,\N
2,13,2,20,\N
3,13,3,30,\N
4,13,101,10,\N
5,13,102,20,\N
6,13,103,30,\N
1,14,41,10,\N
2,14,42,20,\N
3,14,43,30,\N
4,14,21,10,\N
5,14,22,20,\N
6,14,23,30,\N
1,15,61,10,\N
2,15,62,20,\N
3,15,63,30,\N
4,15,81,10,\N
5,15,82,20,\N
6,15,83,30,\N
1,16,81,10,\N
2,16,82,20,\N
3,16,83,30,\N
4,16,21,10,\N
5,16,22,20,\N
6,16,23,30,\N
1,17,101,10,\N
2,17,102,20,\N
3,17,103,30,\N
4,17,41,10,\N
5,17,42,20,\N
6,17,43,30,\N
1,18,61,10,\N
2,18,62,20,\N
3,18,63,30,\N
4,18,1,10,\N
5,18,2,20,\N
6,18,3,30,\N
1,19,1,10,\N
2,19,2,20,\N
3,19,3,30,\N
4,19,61,10,\N
5,19,62,20,\N
6,19,63,30,\N
1,20,21,10,\N
2,20,22,20,\N
3,20,23,30,\N
4,20,41,10,\N
5,20,42,20,\N
6,20,43,30,\N
1,21,1,10,\N
2,21,2,20,\N
3,21,3,30,\N
4,21,21,10,\N
5,21,22,20,\N
6,21,23,30,\N
1,22,121,10,\N
2,22,122,20,\N
3,22,123,30,\N
4,22,141,10,\N
5,22,142,20,\N
6,22,143,30,\N
1,23,161,10,\N
2,23,162,20,\N
3,23,163,30,\N
4,23,181,10,\N
5,23,182,20,\N
6,23,183,30,\N
1,24,201,10,\N
2,24,202,20,\N
3,24,203,30,\N
4,24,221,10,\N
5,24,222,20,\N
6,24,223,30,\N
1,25,141,10,\N
2,25,142,20,\N
3,25,143,30,\N
4,25,161,10,\N
5,25,162,20,\N
6,25,163,30,\N
1,26,181,10,\N
2,26,182,20,\N
3,26,183,30,\N
4,26,201,10,\N
5,26,202,20,\N
6,26,203,30,\N
1,27,221,10,\N
2,27,222,20,\N
3,27,223,30,\N
4,27,121,10,\N
5,27,122,20,\N
6,27,123,30,\N
\.


--rollback;
commit;