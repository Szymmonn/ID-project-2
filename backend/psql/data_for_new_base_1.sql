--
-- First file with data for our table
--
-- oh boy here we go
--
-- only good data here
--

begin;

-- 1) kraje
COPY kraje (id_kraju, nazwa) FROM stdin WITH DELIMITER ',';
1,Anglia
2,Portugalia
3,Brazylia
4,Argentyna
5,Dania
6,Szkocja
7,Francja
8,Szwecja
9,Wybrzeże Kości Słoniowej
10,Holandia
11,Maroko
12,Irlandia Północna
13,Polska
14,Słowenia
15,Albania
16,Serbia
17,Czechy
18,Niemcy
19,Kamerun
20,Izrael
21,Hiszpania
22,Włochy
23,Norwegia
24,Finlandia
25,Austria
\.

-- 2) Pozycje (id_pos SERIAL: 1=GK,2=CB,…,12=CF,13=ST)
COPY pozycje (skrot, pelna_nazwa) FROM stdin WITH DELIMITER ',';
GK,Bramkarz
CB,Środkowy Obrońca
LB,Lewy Obrońca
RB,Prawy Obrońca
CDM,Defensywny Pomocnik
CM,Środkowy Pomocnik
CAM,Ofensywny Pomocnik
LM,Lewy Pomocnik
RM,Prawy Pomocnik
LW,Lewoskrzydłowy
RW,Prawoskrzydłowy
CF,Środkowy Napastnik
ST,Napastnik
\.

-- 3) Ligi
COPY ligi (nazwa, id_kraju) FROM stdin WITH DELIMITER ',';
Ekstraklasa,1
Premier League,2
\.

-- 4) kluby
-- Premier League Kluby
COPY kluby (nazwa, miasto, id_stadionu, rok_zalozenia) FROM stdin WITH DELIMITER ',';
Manchester United,Manchester,1,1878
Chelsea FC,London,2,1905
Liverpool FC,Liverpool,3,1892
Arsenal FC,London,4,1886
Manchester City,Manchester,5,1880
Tottenham Hotspur,London,6,1882
\.

-- Ekstraklasa Kluby
COPY kluby (nazwa, miasto, id_stadionu, rok_zalozenia) FROM stdin WITH DELIMITER ',';
Legia Warszawa,Warszawa,7,1916
Lech Poznań,Poznań,8,1922
Raków Częstochowa,Częstochowa,9,1921
Pogoń Szczecin,Szczecin,10,1948
Górnik Zabrze,Zabrze,11,1948
Wisła Kraków,Kraków,12,1906
\.

-- 6) stadiony
COPY stadiony (nazwa, id_kraju, miasto) FROM stdin WITH DELIMITER ',';
Old Trafford,2,Manchester
Stamford Bridge,2,London
Anfield,2,Liverpool
Emirates Stadium,2,London
Etihad Stadium,2,Manchester
Tottenham Hotspur Stadium,2,London
Stadion Wojska Polskiego,1,Warszawa
Stadion Miejski,1,Poznań
Stadion Miejski Raków,1,Częstochowa
Stadion im. Floriana Krygiera,1,Szczecin
Stadion im. Ernesta Pohla,1,Zabrze
Stadion im. Henryka Reymana,1,Kraków
\.

--
-- File with all of the footballers
--
-- 12 clubs / 6 in each league / 20 players in each 
--

-- Pilkarze dla Manchester United (id_klubu = 1)
COPY pilkarze (imie, nazwisko, wzrost_cm, plec, numer_buta, glowna_noga, data_urodzenia, id_kraju) FROM stdin WITH DELIMITER ',';
Marcus,Rashford,180,M,44,P,1997-10-31,1
Bruno,Fernandes,179,M,43,P,1994-09-08,2
Casemiro,dos Santos,185,M,44,P,1992-02-23,3
Luke,Shaw,178,M,42,L,1995-07-12,1
Harry,Maguire,194,M,45,P,1993-03-05,1
Lisandro,Martinez,175,M,42,L,1998-01-18,4
Christian,Eriksen,182,M,43,P,1992-02-14,5
Jadon,Sancho,177,M,42,P,2000-03-25,1
Antony,Matheus,172,M,41,L,2000-02-24,3
Diogo,Dalot,183,M,44,P,1999-03-18,2
Scott,McTominay,190,M,45,P,1996-12-08,6
Mason,Mount,180,M,43,P,1999-01-10,1
Raphaël,Varane,191,M,45,P,1993-04-25,7
Victor,Lindelöf,187,M,44,P,1994-07-17,8
Aaron,Wan-Bissaka,183,M,43,P,1997-11-26,1
Amad,Diallo,175,M,42,L,2002-07-11,9
Donny,van de Beek,184,M,44,P,1997-04-18,10
Sofyan,Amrabat,185,M,43,P,1996-08-21,11
Alejandro,Garnacho,178,M,42,L,2004-07-01,4
Andre,Onana,188,M,45,P,1988-01-03,12
\.

COPY pilkarz_pozycja (id_pilkarza, id_pozycja) FROM stdin WITH DELIMITER ',';
1,13
1,12
2,7
2,6
3,5
3,2
4,3
4,2
5,2
5,4
6,3
6,2
7,7
7,6
8,11
8,10
9,11
9,13
10,4
10,3
11,6
11,5
12,7
12,6
13,2
13,4
14,2
14,3
15,4
15,3
16,10
16,11
17,6
17,7
18,5
18,6
19,11
19,8
20,1
\.


-- Pilkarze dla Chelsea FC (id_klubu = 2)
COPY pilkarze (imie, nazwisko, wzrost_cm, plec, numer_buta, glowna_noga, data_urodzenia, id_kraju) FROM stdin WITH DELIMITER ',';
Connor,Smith,171,M,38,A,1998-06-22,11
Richard,Brown,170,M,42,P,2002-07-13,18
Derrick,Haas,200,M,41,A,1992-04-06,11
Joshua,Pacheco,199,M,44,A,2001-06-08,4
William,Wells,188,M,38,P,2005-10-21,23
Russell,Williams,185,M,41,A,1999-05-04,11
Russell,Lane,182,M,38,L,1990-12-09,17
Jonathan,Sloan,178,M,42,L,1993-10-20,17
Jacob,Kirk,198,M,44,A,2007-04-02,20
Daniel,Boyd,178,M,43,L,2002-10-23,19
Stephen,Barnes,168,M,46,P,1999-10-02,7
Tyler,Allison,173,M,41,P,2004-05-03,9
Andrew,Hart,182,M,45,A,1996-10-06,4
Donald,Fuller,177,M,41,P,1991-12-11,14
Gerald,Johnston,196,M,39,L,2006-04-16,24
Philip,Hernandez,188,M,43,A,1993-10-27,3
Nicholas,Blair,168,M,41,L,1995-06-19,9
Roger,Mason,198,M,40,L,1998-06-28,14
Shawn,Fletcher,197,M,46,P,2007-01-10,11
John,Wells,193,M,42,L,2005-04-30,17
\.

COPY pilkarz_pozycja (id_pilkarza, id_pozycja) FROM stdin WITH DELIMITER ',';
21,13
21,10
22,7
22,6
23,5
23,2
24,3
24,8
25,2
25,4
26,2
26,3
27,6
27,7
28,10
28,11
29,11
29,13
30,4
30,9
31,5
31,6
32,6
32,7
33,2
33,12
34,2
34,3
35,3
35,4
36,8
36,10
37,6
37,7
38,5
38,4
39,10
39,11
40,2
40,1
\.

-- Pilkarze dla Liverpool FC (id_klubu = 3)
COPY pilkarze (imie, nazwisko, wzrost_cm, plec, numer_buta, glowna_noga, data_urodzenia, id_kraju) FROM stdin WITH DELIMITER ',';
Christopher,Holmes,182,M,40,L,1995-06-23,8
Christopher,Rose,194,M,45,A,2007-01-17,2
Jesus,Barber,192,M,39,P,2005-04-13,22
Daniel,King,183,M,42,A,1992-12-05,7
Glen,Nunez,199,M,38,A,1995-06-19,13
Rodney,Liu,171,M,38,A,2000-01-09,12
Anthony,Conway,177,M,39,A,2001-10-11,24
Raymond,Nelson,193,M,39,P,1998-03-05,9
Albert,White,167,M,42,P,2001-12-07,9
Eddie,Mata,185,M,40,L,1991-05-07,10
David,Baker,183,M,39,P,1995-03-14,13
Daniel,Russell,183,M,44,L,2003-11-10,17
Brandon,Wood,172,M,46,A,2003-12-29,12
Brian,Carroll,166,M,38,P,1993-04-19,25
Sergio,Solis,194,M,46,L,2000-06-12,7
Adam,Galloway,184,M,39,A,2002-10-27,17
Victor,Wilson,179,M,40,P,1992-06-11,22
Kyle,Lewis,177,M,46,A,2006-03-23,3
Garrett,Collins,168,M,41,L,2004-03-22,12
James,Sosa,182,M,42,P,2007-03-17,18
\.

COPY pilkarz_pozycja (id_pilkarza, id_pozycja) FROM stdin DELIMITER ',' CSV;
41,10
41,13
42,6
42,7
43,5
44,3
44,8
45,2
45,4
46,3
47,6
47,7
48,10
49,11
49,12
50,4
50,3
51,5
52,7
52,6
53,2
53,12
54,2
55,3
55,4
56,8
56,10
57,6
58,5
58,6
59,11
59,9
60,2
60,1
\.



-- Pilkarze dla Arsenal FC (id_klubu = 4)
COPY pilkarze (imie, nazwisko, wzrost_cm, plec, numer_buta, glowna_noga, data_urodzenia, id_kraju) FROM stdin WITH DELIMITER ',';
Joseph,Salinas,196,M,38,L,1993-09-20,8
Tommy,Gillespie,169,M,45,A,1995-01-19,13
Anthony,Flores,178,M,45,P,2005-04-20,21
Timothy,Jackson,180,M,43,A,2000-03-18,5
Ryan,Guzman,190,M,46,A,2001-08-26,14
Jeffrey,Williams,198,M,43,L,1993-06-16,7
Maurice,Henry,166,M,46,P,2007-03-26,23
Justin,Hunter,184,M,41,A,1993-10-23,19
Barry,Mcdonald,199,M,46,P,1998-04-03,1
James,Hoffman,189,M,41,L,1993-08-06,21
Paul,Carlson,173,M,40,A,1995-12-03,10
Julian,Cline,171,M,41,A,1998-12-16,16
Michael,Thornton,195,M,46,P,1998-01-04,6
Derek,French,193,M,45,P,1999-08-31,2
Richard,Gonzalez,193,M,38,A,1995-07-16,22
Brandon,Grant,194,M,43,P,2003-11-27,6
Charles,Johnson,168,M,45,P,1997-12-07,2
Nathan,Morales,175,M,40,A,1992-01-06,18
Darryl,Hansen,168,M,41,A,1992-07-25,6
Logan,Yoder,172,M,45,P,1991-10-22,4
\.

COPY pilkarz_pozycja (id_pilkarza, id_pozycja) FROM stdin DELIMITER ',' CSV;
61,13
61,12
62,7
63,5
63,6
64,8
64,3
65,2
66,3
66,4
67,6
67,7
68,10
68,9
69,11
69,13
70,4
70,2
71,5
72,6
72,7
73,2
74,2
74,3
75,3
75,9
76,8
76,10
77,5
77,6
78,5
78,4
79,10
79,8
80,2
80,1
\.



-- Pilkarze dla Manchester City (id_klubu = 5)
COPY pilkarze (imie, nazwisko, wzrost_cm, plec, numer_buta, glowna_noga, data_urodzenia, id_kraju) FROM stdin WITH DELIMITER ',';
Mario,Martinez,180,M,38,P,2007-04-19,18
Joshua,Hawkins,168,M,46,P,1999-08-07,1
Daniel,Cunningham,175,M,45,L,1991-07-08,17
Mark,Hunt,171,M,43,A,1992-08-12,5
Robert,Moran,192,M,38,P,2000-04-07,10
George,Hart,187,M,40,A,2004-01-20,23
William,Davis,194,M,43,A,1997-03-17,4
Zachary,Stephens,181,M,46,A,1993-10-29,6
Matthew,Harris,190,M,40,L,1995-04-09,22
Robert,Ray,182,M,44,A,1996-01-12,6
Brian,Bender,199,M,40,L,1999-09-25,24
Scott,Jones,183,M,44,A,2003-08-04,19
Michael,Vasquez,166,M,45,P,1998-04-28,15
Cesar,Hanna,197,M,40,L,2001-07-02,22
Aaron,Gould,181,M,39,P,2005-06-01,15
Andre,Brown,186,M,44,L,1997-08-12,8
Charles,Gordon,184,M,39,A,2005-12-20,7
Ruben,Clayton,178,M,46,A,1993-11-17,8
Cody,Banks,199,M,46,A,2003-05-15,19
Travis,Hernandez,192,M,46,L,1998-07-07,7
\.

COPY pilkarz_pozycja (id_pilkarza, id_pozycja) FROM stdin DELIMITER ',' CSV;
81,10
81,12
82,7
82,6
83,5
84,3
84,2
85,2
85,1
86,3
87,7
87,6
88,10
88,11
89,11
89,12
90,4
90,9
91,5
91,6
92,7
93,2
93,12
94,2
94,3
95,3
95,4
96,8
96,10
97,6
98,5
98,11
99,10
99,8
100,2
100,1
\.



-- Pilkarze dla Tottenham Hotspur (id_klubu = 6)
COPY pilkarze (imie, nazwisko, wzrost_cm, plec, numer_buta, glowna_noga, data_urodzenia, id_kraju) FROM stdin WITH DELIMITER ',';
Dean,Duncan,185,M,44,L,1999-01-19,23
Joel,Luna,199,M,40,P,1995-11-19,14
Joseph,Aguilar,168,M,40,A,1991-11-01,15
James,Carlson,182,M,46,L,2006-04-08,14
Dean,Mosley,177,M,40,P,1993-05-21,9
Anthony,Alvarado,186,M,41,L,1996-07-02,14
Richard,Hansen,195,M,43,A,1990-11-28,3
Peter,Torres,172,M,39,P,2002-01-14,4
Christopher,Holt,182,M,43,A,1990-10-02,7
Todd,Cole,194,M,40,L,1997-02-01,1
Leonard,Scott,186,M,43,A,2004-05-19,6
Jordan,Mason,176,M,42,P,2003-02-03,23
Nathan,Sanchez,189,M,39,L,1997-04-14,16
Joseph,Freeman,170,M,39,P,2002-05-15,3
Jerry,Burton,177,M,43,A,1999-10-14,14
Kyle,Duffy,188,M,44,L,2000-05-02,11
Edward,Jordan,184,M,43,P,1996-01-30,13
Alexander,Bell,179,M,45,A,1999-11-30,2
Alexander,Maxwell,193,M,40,P,1994-08-06,1
Randy,Ramos,175,M,38,P,2003-12-03,18
\.

COPY pilkarz_pozycja (id_pilkarza, id_pozycja) FROM stdin DELIMITER ',' CSV;
101,13
101,12
102,7
103,6
103,5
104,3
104,9
105,2
105,4
106,2
106,3
107,6
108,10
108,11
109,11
109,13
110,4
110,9
111,5
112,6
112,7
113,2
113,12
114,2
114,3
115,3
115,4
116,8
116,10
117,6
118,5
118,11
119,10
119,11
120,2
120,1
\.



-- Pilkarze dla Legia Warszawa (id_klubu = 7)
COPY pilkarze (imie, nazwisko, wzrost_cm, plec, numer_buta, glowna_noga, data_urodzenia, id_kraju) FROM stdin WITH DELIMITER ',';
Artur,Jędrzejczyk,189,M,44,P,1987-11-04,13
Josué,Pesqueira,174,M,42,L,1990-09-17,2
Rafał,Augustyniak,183,M,44,P,1993-01-14,13
Yuri,Ribeiro,176,M,43,L,1997-01-24,2
Paweł,Wszolek,185,M,44,P,1992-04-30,13
Blaz,Kramer,190,M,45,P,1996-06-01,14
Jurgen,Çelhaka,181,M,43,P,2000-08-06,15
Igor,Strzałek,177,M,42,L,2003-02-15,13
Radovan,Pankov,186,M,44,P,1995-08-05,16
Tomas,Pekhart,194,M,46,P,1989-05-26,17
Filip,Rejczyk,175,M,42,P,2001-12-11,13
Patryk,Kuchczyński,179,M,43,P,2002-07-07,13
Makana,Baku,172,M,41,L,1998-07-08,18
Steve,Kapue,184,M,44,P,1991-03-02,19
Joel,Abu Hanna,186,M,44,P,1998-01-22,20
Kacper,Trelowski,188,M,45,P,2003-01-04,13
Damian,Szymański,182,M,43,P,1995-06-16,13
Dominik,Hładun,186,M,44,P,1995-09-17,13
Ernest,Muçi,180,M,43,L,2001-03-19,15
Maik,Nawrocki,187,M,44,P,2001-02-07,13
\.

COPY pilkarz_pozycja (id_pilkarza, id_pozycja) FROM stdin DELIMITER ',' CSV;
121,10
121,12
122,7
122,6
123,5
124,3
124,2
125,2
125,1
126,3
127,7
127,6
128,10
128,11
129,11
129,12
130,4
130,9
131,5
131,6
132,7
133,2
133,12
134,2
134,3
135,3
135,4
136,8
136,10
137,6
138,5
138,11
139,10
139,8
140,1
\.



-- Pilkarze dla Lech Poznań (id_klubu = 8)
COPY pilkarze (imie, nazwisko, wzrost_cm, plec, numer_buta, glowna_noga, data_urodzenia, id_kraju) FROM stdin WITH DELIMITER ',';
Timothy,Stephens,169,M,40,P,2005-01-10,8
Gordon,Wilcox,167,M,42,P,2005-06-06,21
Jeremy,Herrera,196,M,39,L,1994-10-23,20
Michael,Rich,174,M,44,P,2003-05-16,25
Nicholas,Young,170,M,43,A,1992-05-14,22
Isaac,Martin,185,M,39,P,1993-05-31,22
Alan,Thomas,173,M,44,A,1991-06-29,24
Ricky,Pace,186,M,43,A,2004-04-25,14
Matthew,Reyes,173,M,41,A,2004-09-10,18
Nathan,Lewis,174,M,40,P,1996-10-11,12
Joseph,Reynolds,174,M,40,P,1999-05-17,6
Robert,Garcia,170,M,45,P,1999-03-07,1
Kevin,Ortiz,192,M,38,L,1991-03-17,18
Michael,York,170,M,43,A,1994-03-21,11
Cody,Ross,177,M,40,A,1995-07-13,3
Michael,Williamson,181,M,38,L,2005-06-06,1
Matthew,Knight,169,M,38,L,2003-05-25,6
Joe,Ramsey,169,M,45,P,1996-08-25,25
Daniel,Meyer,175,M,44,P,1999-08-07,19
Michael,Lyons,183,M,39,A,1996-04-08,13
\.

COPY pilkarz_pozycja (id_pilkarza, id_pozycja) FROM stdin DELIMITER ',' CSV;
141,13
141,12
142,7
143,6
143,5
144,3
144,9
145,2
145,4
146,2
146,3
147,6
148,10
148,11
149,11
149,13
150,4
150,9
151,5
152,6
152,7
153,2
153,12
154,2
154,3
155,3
155,4
156,8
156,10
157,6
158,5
158,11
159,10
159,11
160,2
160,1
\.



-- Pilkarze dla Raków Częstochowa (id_klubu = 9)
COPY pilkarze (imie, nazwisko, wzrost_cm, plec, numer_buta, glowna_noga, data_urodzenia, id_kraju) FROM stdin WITH DELIMITER ',';
Ronald,Ford,191,M,40,P,2006-02-17,20
John,Romero,167,M,45,P,1997-07-08,10
Kelly,Mack,199,M,42,A,2000-10-23,23
Nicholas,Sanford,197,M,39,A,1994-03-30,10
Martin,Lawrence,199,M,42,L,2003-08-07,3
Jaime,Pace,177,M,39,L,1991-01-13,21
Justin,Roberts,187,M,45,A,1995-02-12,2
David,Parker,166,M,44,L,1997-04-07,18
Miguel,Sheppard,184,M,46,L,1996-01-22,16
Kenneth,Duncan,183,M,38,A,1999-10-10,24
Scott,Johnson,189,M,44,P,2004-09-20,23
Robert,Brown,193,M,39,P,1994-08-23,5
Jeremy,Kennedy,200,M,45,P,2002-03-12,8
John,Kim,179,M,43,A,1992-12-30,18
Matthew,Murray,194,M,44,A,1995-12-05,15
John,Garner,195,M,39,P,2002-03-19,18
Patrick,Bean,181,M,46,P,1999-06-12,20
Randy,Powell,172,M,42,L,1991-01-13,21
Melvin,Bradshaw,176,M,38,P,2004-10-17,1
Joseph,Davis,190,M,43,A,1999-11-24,14
\.

COPY pilkarz_pozycja (id_pilkarza, id_pozycja) FROM stdin DELIMITER ',' CSV;
161,10
161,13
162,6
162,7
163,5
164,3
164,8
165,2
165,4
166,3
167,6
167,7
168,10
169,11
169,12
170,4
170,3
171,5
172,7
172,6
173,2
173,12
174,2
175,3
175,4
176,8
176,10
177,6
178,5
178,6
179,11
179,9
180,2
180,1
\.



-- Pilkarze dla Pogoń Szczecin (id_klubu = 10)
COPY pilkarze (imie, nazwisko, wzrost_cm, plec, numer_buta, glowna_noga, data_urodzenia, id_kraju) FROM stdin WITH DELIMITER ',';
Michael,Rios,183,M,46,L,2005-10-29,2
Dale,Young,176,M,40,P,1991-11-02,19
Jason,Simmons,192,M,43,A,2006-10-17,15
Curtis,Blankenship,186,M,41,A,1990-10-16,1
Edward,Lane,170,M,45,L,2000-02-28,12
Andrew,Estrada,168,M,43,L,2004-02-21,3
Brandon,Mckenzie,185,M,39,L,1996-03-13,21
Randy,Espinoza,175,M,43,L,1998-05-11,19
Dennis,Welch,183,M,41,P,1993-08-26,13
John,Foster,180,M,42,P,1996-10-03,17
Kenneth,Page,199,M,39,P,1999-01-20,5
Jesus,Wright,179,M,40,L,2007-05-24,22
Troy,Hall,168,M,39,P,2004-12-03,22
John,Hernandez,184,M,39,A,1994-11-10,4
Christopher,Ramos,199,M,42,A,2004-04-23,17
Antonio,Chavez,191,M,42,A,2000-02-02,19
Tom,Carter,167,M,46,A,1996-04-05,24
Michael,Murray,172,M,40,A,1990-08-14,2
Joshua,Briggs,199,M,38,A,2005-02-11,17
Jared,Johnson,198,M,46,A,1996-11-28,16
\.

COPY pilkarz_pozycja (id_pilkarza, id_pozycja) FROM stdin DELIMITER ',' CSV;
181,13
181,10
182,7
182,6
183,5
183,2
184,3
184,8
185,2
185,4
186,2
186,3
187,6
187,7
188,10
188,11
189,11
189,13
190,4
190,9
191,5
191,6
192,6
192,7
193,2
193,12
194,2
194,3
195,3
195,4
196,8
196,10
197,6
197,7
198,5
198,4
199,10
199,11
200,2
200,1
\.



-- Pilkarze dla Górnik Zabrze (id_klubu = 11)
COPY pilkarze (imie, nazwisko, wzrost_cm, plec, numer_buta, glowna_noga, data_urodzenia, id_kraju) FROM stdin WITH DELIMITER ',';
Dwayne,Watts,200,M,40,L,2006-10-08,22
Robert,Parker,196,M,40,A,1990-07-30,9
Daniel,Hurst,186,M,45,A,1999-11-09,12
Edward,Houston,169,M,40,P,1994-04-25,3
Nathan,Fritz,183,M,46,P,2005-12-24,15
Kenneth,Smith,184,M,46,P,1995-01-04,19
Timothy,Fowler,196,M,43,A,1994-04-07,1
Darrell,Richardson,183,M,41,A,1994-10-05,7
David,Elliott,198,M,38,P,2000-07-18,7
Devon,Snyder,192,M,42,P,2002-01-21,11
Jose,Brady,194,M,38,L,1995-02-24,19
Eric,Chambers,173,M,43,A,2003-05-07,20
Frederick,Valenzuela,191,M,38,L,1998-04-21,16
Ronald,Edwards,172,M,38,L,1995-10-21,11
Todd,Smith,177,M,42,L,1996-10-21,25
James,Buckley,191,M,44,A,1991-09-21,25
Cameron,Carlson,168,M,44,P,2006-07-09,23
Jacob,Burns,182,M,44,P,1995-12-06,5
Jeremy,Howard,168,M,46,L,2003-01-14,7
Kevin,Calderon,178,M,44,P,1999-06-20,18
\.

COPY pilkarz_pozycja (id_pilkarza, id_pozycja) FROM stdin DELIMITER ',' CSV;
201,10
201,13
202,6
202,7
203,5
204,3
204,8
205,2
205,4
206,3
207,6
207,7
208,10
209,11
209,12
210,4
210,3
211,5
212,7
212,6
213,2
213,12
214,2
215,3
215,4
216,8
216,10
217,6
218,5
218,6
219,11
219,9
220,2
220,1
\.



-- Pilkarze dla Wisła Kraków (id_klubu = 12)
COPY pilkarze (imie, nazwisko, wzrost_cm, plec, numer_buta, glowna_noga, data_urodzenia, id_kraju) FROM stdin WITH DELIMITER ',';
Stephen,Martinez,171,M,46,L,2001-10-10,12
John,Warren,196,M,38,A,2003-03-25,9
Eric,Brown,195,M,46,A,1995-03-24,10
Andrew,Pratt,180,M,45,L,2005-09-10,3
Michael,Lester,193,M,46,A,2001-09-08,23
Ryan,Valentine,165,M,45,P,1998-02-19,13
Micheal,Welch,186,M,38,P,2001-08-11,18
Rodney,Rodriguez,172,M,46,L,1997-12-23,14
Joshua,Simon,190,M,45,A,1994-06-27,17
Steven,Gonzalez,172,M,42,L,2006-03-06,20
Zachary,Lopez,191,M,40,L,1998-11-10,15
Michael,Roberts,169,M,39,L,1999-08-06,14
Nathan,Wilson,174,M,44,L,2001-01-01,12
Andrew,Burns,183,M,40,L,2002-03-02,22
Shannon,Cruz,176,M,39,A,2006-04-19,2
Chad,Davis,187,M,38,L,1993-03-14,17
Joseph,Ferguson,179,M,42,L,1998-07-30,24
George,Watkins,167,M,45,P,1998-02-22,7
Anthony,Hale,177,M,42,A,1991-02-16,8
Larry,Church,189,M,42,L,1994-06-20,23
\.

COPY pilkarz_pozycja (id_pilkarza, id_pozycja) FROM stdin DELIMITER ',' CSV;
221,13
221,10
222,7
222,6
223,5
223,2
224,3
224,8
225,2
225,4
226,2
226,3
227,6
227,7
228,10
228,11
229,11
229,13
230,4
230,9
231,5
231,6
232,6
232,7
233,2
233,12
234,2
234,3
235,3
235,4
236,8
236,10
237,6
237,7
238,5
238,4
239,10
239,11
240,2
240,1
\.




-- 6) agenci
COPY agenci(imie, nazwisko) FROM stdin WITH DELIMITER ',';
Jan,Kowalski
Anna,Nowak
Piotr,Wiśniewski
Katarzyna,Wójcik
Tomasz,Kowalczyk
Agnieszka,Kamińska
Marek,Lewandowski
Magdalena,Zielińska
Paweł,Szymański
Ewa,Woźniak
Grzegorz,Dąbrowski
Joanna,Kozłowska
Krzysztof,Jankowski
Monika,Mazur
Andrzej,Wojciechowski
Aleksandra,Krawczyk
Rafał,Kaczmarek
Natalia,Piotrowska
Łukasz,Grabowski
Justyna,Pawlak
Michał,Michalski
Beata,Zając
Artur,Król
Sylwia,Wieczorek
Sebastian,Jabłoński
Karolina,Wróbel
Daniel,Malinowski
Patrycja,Stępień
Wojciech,Górski
Dorota,Nowicka
Bartłomiej,Adamczyk
Małgorzata,Dudek
Szymon,Zawadzki
Iwona,Sikora
Adrian,Baran
Elżbieta,Rutkowska
Mateusz,Michalak
Izabela,Szewczyk
Damian,Ostrowski
Renata,Tomaszewska
Konrad,Chmielewski
Urszula,Witkowska
Dariusz,Walczak
Aneta,Sadowska
Filip,Bąk
Paulina,Domańska
Maciej,Jaworski
Danuta,Bielska
Tadeusz,Czarnecki
Halina,Kubiak
\.

-- 7) dotacje
COPY kluby_budzet (id_klubu, kwota_dodana, data_dofinansowania, powod_dofinansowania) FROM stdin WITH DELIMITER ',';
1,1000000.00,2025-06-01,Start sezonu
2,950000.00,2025-06-01,Start sezonu
3,1200000.00,2025-06-01,Dotacja sponsora głównego
4,1100000.00,2025-06-01,Start sezonu
5,800000.00,2025-06-01,Uzyskana licencja
6,1050000.00,2025-06-01,Start sezonu
7,980000.00,2025-06-01,Nagroda za poprzedni sezon
8,1025000.00,2025-06-01,Start sezonu
9,870000.00,2025-06-01,Subwencja z ligi
10,930000.00,2025-06-01,Start sezonu
11,890000.00,2025-06-01,Nowy sponsor techniczny
12,1150000.00,2025-06-01,Start sezonu
\.

-- 8) sezony
COPY sezony (id_sezonu, data_poczatek, data_koniec, uwagi) FROM stdin WITH DELIMITER ',';
1,2018-07-01,2019-06-30,Sezon po MŚ 2018
2,2019-07-01,2020-06-30,Sezon przerwany przez COVID-19
3,2020-07-01,2021-06-30,Sezon pandemiczny – bez kibiców
4,2021-07-01,2022-06-30,Pełny sezon z ograniczeniami
5,2022-07-01,2023-06-30,Sezon z przerwą na MŚ 2022 w Katarze
6,2023-07-01,2024-06-30,Powrót do normalności
7,2024-07-01,2025-06-30,Obecny sezon
\.

-- 9) klub_liga
COPY historia_klub_liga (id_klubu, id_ligi, id_sezonu) FROM stdin WITH DELIMITER ',';
1,1,1
2,1,1
3,1,1
4,1,1
5,1,1
6,1,1
7,2,1
8,2,1
9,2,1
10,2,1
11,2,1
12,2,1
1,1,2
2,1,2
3,1,2
4,1,2
5,1,2
6,1,2
7,2,2
8,2,2
9,2,2
10,2,2
11,2,2
12,2,2
1,1,3
2,1,3
3,1,3
4,1,3
5,1,3
6,1,3
7,2,3
8,2,3
9,2,3
10,2,3
11,2,3
12,2,3
1,1,4
2,1,4
3,1,4
4,1,4
5,1,4
6,1,4
7,2,4
8,2,4
9,2,4
10,2,4
11,2,4
12,2,4
1,1,5
2,1,5
3,1,5
4,1,5
5,1,5
6,1,5
7,2,5
8,2,5
9,2,5
10,2,5
11,2,5
12,2,5
1,1,6
2,1,6
3,1,6
4,1,6
5,1,6
6,1,6
7,2,6
8,2,6
9,2,6
10,2,6
11,2,6
12,2,6
1,1,7
2,1,7
3,1,7
4,1,7
5,1,7
6,1,7
7,2,7
8,2,7
9,2,7
10,2,7
11,2,7
12,2,7
\.

-- 10) sponsorzy
COPY sponsorzy (id_sponsora, nazwa) FROM stdin WITH DELIMITER ',';
101,RedTech Industries
102,FitLife Sportswear
103,Phoenix Power Group
104,MetroBank Polska
105,Quantum Telecom
106,AstroLite Energy
107,SkyShield Insurance
108,BioCore Health
109,PolarNet Fiber
110,Novis Motors
111,EcoTrade Alliance
112,MagnaSteel Solutions
113,VisionPay Systems
114,FerroFuel Corporation
115,Vertex Nutrition
116,GlobalSoft Technologies
117,Union Media Group
118,Crypton Logistics
119,Sprinttel Communications
120,LumenAir Travel
121,Coretex Innovations
122,Netwise Digital
123,PrimeWater Systems
124,NextStep Capital
125,Aerona Group
126,CircleOne Brewery
127,FutureLine Ventures
\.

-- 11) klub_sponsor
COPY historia_klub_sponsor (id_klubu, id_sponsora, data_zawarcia_wspolpracy, data_zakonczenia_wpolpracy) FROM stdin WITH DELIMITER ',';
1,101,2016-07-01,2019-06-30
1,102,2019-07-01,2022-06-30
1,103,2022-07-01,\N
2,104,2017-07-01,2020-06-30
2,105,2020-07-01,\N
3,106,2018-01-01,2021-12-31
3,107,2022-01-01,\N
4,108,2016-08-01,2019-07-31
4,109,2019-08-01,\N
5,110,2017-07-01,2022-06-30
5,111,2022-07-01,\N
6,112,2018-07-01,2023-06-30
6,113,2023-07-01,\N
7,114,2016-07-01,2018-06-30
7,115,2018-07-01,2021-06-30
7,116,2021-07-01,\N
8,117,2019-01-01,2022-12-31
8,118,2023-01-01,\N
9,119,2020-07-01,\N
10,120,2017-07-01,2020-06-30
10,121,2020-07-01,2023-06-30
10,122,2023-07-01,\N
11,123,2016-07-01,2019-06-30
11,124,2019-07-01,2022-06-30
11,125,2022-07-01,\N
12,126,2018-07-01,2021-06-30
12,127,2021-07-01,\N
\.

commit;