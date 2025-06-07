--
-- Old data not working now
--




BEGIN;

-- 1) Countries
COPY kraje (nazwa) FROM STDIN;
Polska
Anglia
Izrael
Arabia Saudyjska
Hiszpania
Niemcy
Włochy
Francja
Jordania
Burundi
Mikronezja
Australia
Fidżi
Holandia
Belgia
Liechtenstein
Kanada
Luksemburg
Algeria
Egipt
Kuwejt
Katar
Oman
Jemen
Meksyk
Salvador
Grenada
Antigua i Barbuda
Trynidad i Tobago
Węgry
Mołdawia
Rwandaia
Zmbia
Zimbawbe
wRepublika Środkowoafrykańska
Demokratyczna Republika Kongo
Republika Południowej Afryki
Lesotho
Eswatini
Namibia
Szwajcaria
Wielka Brytania
Irlandia
Islandia
\.

-- 2) Pozycje (id_pos SERIAL: 1=GK,2=CB,…,12=CF,13=ST)
COPY pozycje (skrot, pelna_nazwa) FROM stdin;
GK      'Bramkarz'
CB      'Środkowy Obrońca'
LB      'Lewy Obrońca'
RB      'Prawy Obrońca'
CDM     'Defensywny Pomocnik'
CM      'Środkowy Pomocnik'
CAM     'Ofensywny Pomocnik'
LM      'Lewy Pomocnik'
RM      'Prawy Pomocnik'
LW      'Lewoskrzydłowy'
RW      'Prawoskrzydłowy'
CF      'Środkowy Napastnik'
ST      'Napastnik'
\.

-- 3) Agenci (id = 1…6)
COPY agenci (imie, nazwisko) FROM stdin;
'Jan'   'Nowicki'
'Anna'  'Kaczmarek'
'Piotr' 'Wiśniewski'
'Ewa'   'Kowal'
'Marek' 'Wisniewski'
'Katarzyna'     'Maj'
\.

-- 4) Ligi
COPY ligi (nazwa, id_kraju) FROM stdin;
'Ekstraklasa'   1
'Premier League'        2
'La Liga'       3
'Bundesliga'    4
'Serie A'       5
'Ligue 1'       6
\.

-- 5) Stadiony
COPY stadiony (nazwa, id_kraju, miasto) FROM stdin;
'Stadion Wojska Polskiego'      1       'Warsaw'
'Emirates Stadium'      2       'London'
'Camp Nou'      3       'Barcelona'
'Allianz Arena' 4       'Munich'
'Parc des Princes'      6       'Paris'
\.

-- 6) Kluby nksnf
COPY kluby (nazwa, id_ligi, miasto, id_stadionu, rok_zalozenia, budzet, sponsor) FROM stdin;
'Legia Warszawa'        1       'Warsaw'        1       1916    3500000 'Eurokołchoz'
'Lech Poznań'   1       'Poznań'        \N      1922    2800000 'Kondominium rosyjsko-niemieckie pod żydowskim zarządem powierniczym w Brukseli'
'Arsenal FC'    2       'London'        2       1886    500000000       'Emirates'
'Chelsea FC'    2       'London'        2       1905    450000000       'Żydokomuna Parku Wodnego w Mszczonowie'
'FC Barcelona'  3       'Barcelona'     3       1899    900000000       'Spotify'
'Bayern Munich' 4       'Munich'        4       1900    800000000       'T-Mobile'
\.


-- 7) Zawodnicy – przykładowa grupa “globalna”
COPY pilkarze (
  imie, nazwisko, wzrost_cm, waga_kg, plec, numer_buta,
  glowna_noga, glowna_pozycja, drugorzedne_pozycje,
  data_urodzenia, id_kraju, id_agenta
)
FROM STDIN
WITH (
    FORMAT csv,
    DELIMITER ',',
    NULL '',
    QUOTE ''''
);
'Jezus','Chrystus',187,85,'M',46,'P',13,'{1,2,3,4,5,6,7,8,9,10,11,12}','1999-06-24',3,1
'Alisson','Becker',193,91,'M',46,'P',1,'{2}','1992-10-02',5,2
'Trent','Alexander-Arnold',180,72,'M',44,'P',4,'{3}','1998-10-07',2,3
'Virgil','van-Dijk',193,92,'M',45,'P',2,'{3}','1991-07-08',14,4
'Ibrahima','Konaté',192,95,'M',46,'P',2,'{4}','1999-05-25',8,5
'Andrew','Robertson',178,70,'M',42,'L',3,'{5}','1994-03-11',2,6
'Ryan','Gravenberch',190,83,'M',45,'P',6,'{5}','2002-05-16',14,1
'Alexis','Mac Allister',174,72,'M',42,'P',7,'{6}','1998-12-24',5,2
'Dominik','Szoboszlai',186,81,'M',45,'P',7,'{6}','2000-10-25',1,3
'Mohamed','Salah',175,71,'M',43,'L',9,'{6}','1992-06-15',20,4
'Luis','Díaz',178,70,'M',43,'P',10,'{7}','1997-01-13',25,5
'Grzegorz','Braun',188,85,'M',46,'P',13,'{1}','1999-06-24',1,6
'Alfred','Johnson',189,85,'M',46,'P',13,'{4}','1999-06-24',1,1
'Zbigniew','Stonoga',186,85,'M',46,'P',13,'{1}','1999-06-24',1,2
'Zbyszko','Stonoga',185,85,'M',46,'P',13,'{6}','1999-06-24',1,3
'Zbigniew','Stonożka',154,85,'M',46,'P',13,'{5}','1999-06-24',1,6
'Abraham','Goldberg',224,85,'M',46,'P',13,'{6}','1999-06-24',15,1
'Abigail','SzlangabumProtector',167,85,'M',46,'P',13,'{11}','1999-06-24',1,2
'Mahmoud','JewDisapprover',198,85,'M',46,'P',13,'{3}','1999-06-24',20,3
\.


-- 8) Manchester United
COPY pilkarze (
  imie, nazwisko, wzrost_cm, waga_kg, plec, numer_buta,
  glowna_noga, glowna_pozycja, drugorzedne_pozycje,
  data_urodzenia, id_kraju, id_agenta
) FROM STDIN
WITH (
    FORMAT csv,
    DELIMITER ',',
    NULL '',
    QUOTE ''''
);
'David','De Szlangbaum',192,85,'M',45,'P',1,'{2}','1990-11-07',5,2
'Aaron','Wan-Bissaka',183,75,'M',43,'P',4,'{3}','1997-11-26',2,3
'Raphaël','Varane',190,81,'M',44,'P',2,'{3}','1993-04-25',8,4
'Lisandro','Martínez',175,70,'M',42,'L',2,'{3}','1998-01-18',2,5
'Luke','Shaw',180,77,'M',43,'L',3,'{5}','1995-07-12',2,6
'Casemiro','Silva',185,84,'M',45,'P',5,'{6}','1992-02-23',5,1
'Bruno','Fernandes',179,70,'M',42,'P',6,'{5}','1994-09-08',6,2
'Christian','Eriksen',182,75,'M',43,'L',6,'{5}','1992-02-14',6,3
'Antony','dos Santos',175,69,'M',44,'P',7,'{8}','2000-02-24',5,4
'Marcus','Rashford',186,70,'M',44,'L',8,'{7}','1997-10-31',2,5
'Wout','Weghorst',197,89,'M',47,'P',12,'{7}','1992-08-07',14,6
\.

-- 9) Chelsea
COPY pilkarze (
  imie, nazwisko, wzrost_cm, waga_kg, plec, numer_buta,
  glowna_noga, glowna_pozycja, drugorzedne_pozycje,
  data_urodzenia, id_kraju, id_agenta
) FROM STDIN
WITH (
    FORMAT csv,
    DELIMITER ',',
    NULL '',
    QUOTE ''''
);
'Mahmoud','Arrizabalaga',190,86,'M',45,'P',1,'{2}','1994-10-03',5,2
'Thiago','Silva',183,79,'M',44,'P',2,'{1}','1984-09-22',5,3
'Reece','James',182,82,'M',43,'P',4,'{2}','2000-12-08',2,4
'Ben','Chilwell',175,74,'M',42,'L',3,'{5}','1996-12-21',2,5
'Enzo','Fernández',180,75,'M',43,'P',5,'{6}','2001-01-17',5,6
'Mateo','Kovačić',182,76,'M',43,'L',6,'{5}','1994-05-06',6,1
'Raheem','Sterling',170,69,'M',43,'P',11,'{2}','1994-12-08',2,2
'Mason','Mount',179,70,'M',43,'P',6,'{7}','1999-01-10',2,3
'Kai','Havertz',189,84,'M',44,'L',7,'{8}','1999-06-11',6,4
'Christopher','Nkunku',180,74,'M',43,'P',6,'{7}','1997-11-14',8,5
'Nicholas','Jackson',188,82,'M',44,'P',12,'{9}','2001-01-20',2,6
\.


-- 10) Tottenham
COPY pilkarze (
  imie, nazwisko, wzrost_cm, waga_kg, plec, numer_buta,
  glowna_noga, glowna_pozycja, drugorzedne_pozycje,
  data_urodzenia, id_kraju, id_agenta
) FROM STDIN
WITH (
    FORMAT csv,
    DELIMITER ',',
    NULL '',
    QUOTE ''''
);
'Hugo','Lloris',188,87,'M',45,'L',1,'{2}','1986-12-26',9,1
'Cristian','Romero',184,77,'M',43,'P',2,'{3}','1998-04-27',9,
'Ben','Davies',182,75,'M',43,'L',3,'{4}','1993-04-24',30,
'Emerson','Royal',181,76,'M',43,'P',4,'{2}','1999-01-14',10,5
'Pierre-Emile','Højbjerg',183,80,'M',44,'P',5,'{6}','1995-08-05',9,5
'Rodrigo','Bentancur',185,79,'M',43,'P',6,'{7}','1997-06-25',3,
'Dejan','Kulusevski',184,75,'M',43,'P',7,'{8}','2000-04-25',3,5
'Harry','Kane',188,86,'M',45,'P',8,'{9}','1993-07-28',25,5
'Son','Heung-min',183,77,'M',44,'P',9,'{6}','1992-07-08',18,1
'Richarlison','Jr.',181,76,'M',43,'P',10,'{9}','1997-05-10',25,2
'Ivan','Perišić',182,78,'M',44,'L',11,'{10}','1989-02-02',13,3
\.


-- 11) Dodatkowi “zwykli” piłkarze
COPY pilkarze (
  imie, nazwisko, plec, wzrost_cm, waga_kg, numer_buta,
  glowna_noga, glowna_pozycja, drugorzedne_pozycje, data_urodzenia,
  id_kraju, id_agenta
) FROM STDIN
WITH (
    FORMAT csv,
    DELIMITER ',',
    NULL '',
    QUOTE ''''
);
'Jan','Kowalski','M',182,75,42,'P',2,'{6,4}','1990-03-15',3,1
'Adam','Nowak','M',178,72,41,'L',11,'{8}','1991-07-22',3,2
'John','Smith','M',185,78,44,'P',13,'{12}','1992-05-10',3,3
'David','Beckham','M',183,79,43,'P',1,'{}','1975-05-02',2,4
'Robert','Lewandowski','M',184,78,44,'L',13,'{12}','1988-08-21',3,5
'Arkadiusz','Milik','M',185,82,45,'P',13,'{10}','1994-02-28',3,2
'Wojciech','Szczęsny','M',193,85,46,'P',1,'{}','1990-04-18',3,3
'Jan','Bednarek','M',189,83,44,'P',2,'{}','1996-04-12',1,1
'Kamil','Grosicki','M',173,68,40,'L',10,'{11}','1988-06-08',3,4
'Ahmed','Piszczek       -       KozaLiker','M',184,78,44,'L',4,'{}','1985-06-03',3,2
\.

-- 12) Oferty klub→klub (wszystkie FK poprawne)
COPY oferty_transferowe_klub_klub (
  id_pilkarza, id_klubu, data, czy_zaakceptowana, zaplata, ilosc_rat
) FROM STDIN
WITH (
    FORMAT csv,
    DELIMITER ',',
    NULL '',
    QUOTE ''''
);
1,2,2025-03-01,true,3000000,1
3,4,2025-03-05,false,2500000,2
2,3,2025-03-10,true,4000000,1
4,1,2025-03-15,false,1500000,3
5,6,2025-03-18,true,5000000,1
6,5,2025-03-20,false,1000000,2
7,1,2025-03-22,true,3500000,1
8,2,2025-03-25,false,1200000,2
\.


-- 13) Oferty klub→piłkarz
-- 13) Oferty transferowe klubów
COPY oferty_transferowe_klub_pilkarz (
  id_oferty_od_klubu, id_pilkarza, id_klubu, data_zlozenia_oferty,
  czy_przyjeta, czestosc_wystepow, data_poczatek_kontraktu,
  czas_trwania_kontraktu, placa_miesieczna, kwota_gotowkowa,
  oplata_dla_agenta, premia_za_wystep, premia_za_bramke,
  premia_za_niewykorzystanego_rezerwowego, uwagi
) FROM STDIN
WITH (
    FORMAT csv,
    DELIMITER ',',
    NULL '',
    QUOTE ''''
);
1,1,2,'2025-03-02',true,80,'2025-03-10','1 year',50000,2000000,50000,1200,6000,0,'Priorytetowy'
2,3,4,'2025-03-06',false,60,'2025-03-15','2 years',35000,1500000,30000,800,3000,0,'Wstępne'
3,2,3,'2025-03-11',true,90,'2025-03-20','1 year',60000,2500000,60000,1200,6000,0,'Oficjalna'
4,4,1,'2025-03-16',false,50,'2025-03-25','6 months',30000,1000000,20000,500,2000,0,'Do negocjacji'
5,5,6,'2025-03-19',true,75,'2025-04-01','1 year',45000,1800000,45000,1100,5500,0,'Oferta specjalna'
6,6,5,'2025-03-21',false,65,'2025-04-05','18 months',38000,1600000,38000,900,4000,0,'Wariant B'
7,7,1,'2025-03-23',true,85,'2025-04-08','1 year',52000,2100000,52000,1300,6500,0,'Atrakcyjna'
8,8,2,'2025-03-25',false,55,'2025-04-10','2 years',32000,1400000,32000,700,2500,0,'Kompromis'
\.

-- 14) Marketplace – sprzedaż
COPY transferroom_sprzedaz (id_zawodnika, cena_startowa, uwagi) FROM STDIN
WITH (
    FORMAT csv,
    DELIMITER ',',
    NULL '',
    QUOTE ''''
);
1,3000000,'Solidny obrońca'
2,2500000,'Młody pomocnik'
3,4000000,'Napastnik – gole w lidze'
4,1500000,'Bramkarz – kontrakt 6 mies.'
5,3500000,'Wszechstronny'
6,2000000,'Dynamiczny'
7,3200000,'Skuteczny w powietrzu'
8,1800000,'Wróć do formy'
\.

-- 15) Marketplace – poszukiwania
COPY transferroom_poszukiwania (
  id_klubu, id_pozycja, cena_do, wiek_max, id_kraju, id_ligi
) FROM STDIN
WITH (
    FORMAT csv,
    DELIMITER ',',
    NULL '',
    QUOTE ''''
);
1,,2000000,30,1,1
2,2,1500000,28,1,1
3,6,3000000,32,,2
4,1,1800000,35,,2
5,13,2500000,29,3,
6,,2200000,31,4,
4,11,2100000,33,6,6
6,2,1900000,27,,
\.

-- 16) Tabela zalet i wad
COPY tabela_zalety_wady_pilkarza (opis) FROM STDIN
WITH (
    FORMAT csv,
    DELIMITER ',',
    NULL '',
    QUOTE ''''
);
'Silne podania'
'Wysoka szybkość'
'Skuteczny w powietrzu'
'Precyzyjne strzały'
'Wytrzymałość'
'Dobry w odbiorze'
'Żyd'
'Słaba technika'
'Powolne tempo'
'Niepewny przy stałych fragmentach'
'Słaba koncentracja'
\.

-- 17) Mecze
COPY mecze (
  id_gospodarze, id_goscie, gole_dla_gospodarzy,
  gole_dla_gosci, data, id_stadionu
) FROM STDIN
WITH (
    FORMAT csv,
    DELIMITER ',',
    NULL '',
    QUOTE ''''
);
1,2,2,1,'2025-03-20',1
3,4,1,1,'2025-03-22',2
2,3,0,3,'2025-03-25',2
4,1,3,0,'2025-03-28',1
5,6,2,2,'2025-04-01',3
6,5,1,0,'2025-04-04',4
1,3,3,2,'2025-04-07',5
2,4,0,1,'2025-04-10',5
\.

-- 18) Statystyki meczowe
COPY mecze_statystyki (
  id_meczu, id_zawodnika, na_boisku_od, na_boisku_do, strzaly,
  strzaly_celne, gole, obronione_strzaly, faule,
  zolta_kartka, czerwona_kartka,
  wykonane_wolne, wykonane_rozne, wykonane_karne
) FROM STDIN
WITH (
    FORMAT csv,
    DELIMITER ',',
    NULL '',
    QUOTE ''''
);
1,1,0,90,4,2,1,0,1,false,false,2,1,0
2,3,45,90,3,1,0,0,2,false,false,1,0,0
3,2,60,90,5,3,1,0,0,true,false,1,2,1
4,4,30,90,2,1,0,0,1,false,false,0,1,0
5,5,0,45,1,0,0,0,0,false,false,0,0,0
6,6,0,77,3,1,0,0,1,false,false,1,0,0
7,7,75,90,6,3,2,0,2,false,false,2,1,0
8,8,20,79,0,0,0,5,0,false,false,1,1,0
\.

-- 19) Kontuzje
COPY kontuzje (
  id_pilkarza, id_meczu, opis_kontuzji, przewidywany_czas_leczenia
) FROM STDIN
WITH (
    FORMAT csv,
    DELIMITER ',',
    NULL '',
    QUOTE ''''
);
2,1,'Naciągnięcie mięśnia','14 days'
3,2,'Złamanie palca','30 days'
4,4,'Uraz barku','21 days'
2,3,'Stłuczenie uda','10 days'
10,5,'Problemy z plecami','20 days'
\.

-- 20) Skauci
COPY skauci (imie, nazwisko, id_klubu) FROM STDIN
WITH (
    FORMAT csv,
    DELIMITER ',',
    NULL '',
    QUOTE ''''
);
'Marek','Kowalski',1
'Anna','Nowicka',2
'Piotr','Wiśniewski',3
'Ewa','Zielińska',4
'Kamil','Nowak',5
\.

-- 21) Raporty skautów
COPY raporty (
  id_skauta, data_zlozenia, id_zawodnika, ocena_skauta,
  czy_chetny_na_transfer, czy_chetny_na_wypozyczenie, cecha, uwagi
) FROM STDIN
WITH (
    FORMAT csv,
    DELIMITER ',',
    NULL '\N',
    QUOTE ''''
);
1,2025-03-21,1,8,true,true,2,'Technika i wizja'
2,2025-03-23,2,7,false,true,8,'Potrzebuje siły'
3,2025-03-25,3,9,true,false,7,'Świetna wytrzymałość'
4,2025-03-27,4,6,true,true,6,'Może przyspieszyć'
5,2025-03-29,5,7,false,false,\N,'Brak doświadczenia'
\.

-- 22) Managerzy
COPY managerzy (
  imie, nazwisko, data_urodzenia, kraj_pochodzenia, licencja
) FROM STDIN
WITH (
    FORMAT csv,
    DELIMITER ',',
    NULL '',
    QUOTE ''''
);
'Zbigniew','Boniek','1956-03-03',1,'UEFA Pro'
'José','Mourinho','1963-01-26',2,'UEFA Pro'
'Pep','Guardiola','1971-01-18',2,'UEFA Pro'
'Carlo','Ancelotti','1959-06-10',4,'UEFA Pro'
'Jurgen','Klopp','1967-06-16',2,'UEFA A'
\.

-- 23) Oferty dla managerów
COPY oferty_managerow (
  id_managera, id_klubu, data_propozycji,
  czy_przyjeta, pensja, okres
) FROM STDIN
WITH (
    FORMAT csv,
    DELIMITER ',',
    NULL '',
    QUOTE ''''
);
1,1,'2025-03-10',true,200000,'2 years'
2,3,'2025-03-15',false,180000,'18 months'
3,2,'2025-03-20',true,220000,'2 years'
4,4,'2025-03-25',false,150000,'1 year'
5,5,'2025-03-28',true,240000,'2 years'
\.

--rollback;
COMMIT;




















