# app/models.py

from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    Numeric,
    Boolean,
    Text,
    PrimaryKeyConstraint,
    ForeignKey,
)
from sqlalchemy.ext.declarative import declarative_base

from .database import Base

# ------------------------------------------------------------
# 1) pilkarze
# ------------------------------------------------------------
class Pilkarz(Base):
    __tablename__ = "pilkarze"

    id_pilkarza = Column(Integer, primary_key=True, index=True, autoincrement=True)
    imie = Column(String(40), nullable=False, default="")
    nazwisko = Column(String(40), nullable=False, default="")
    wzrost_cm = Column(Integer, nullable=True)
    plec = Column(String(1), nullable=False)
    numer_buta = Column(Integer, nullable=True)
    glowna_noga = Column(String(1), nullable=True)
    data_urodzenia = Column(Date, nullable=False)
    id_kraju = Column(Integer, nullable=False)
    # brak jawnych FK – można dodać: ForeignKey("kraje.id_kraju")

    # Constraints definiowane w migracji – tutaj tylko model

# ------------------------------------------------------------
# 2) pozycje
# ------------------------------------------------------------
class Pozycja(Base):
    __tablename__ = "pozycje"

    id_pozycja = Column(Integer, primary_key=True, index=True, autoincrement=True)
    skrot = Column(String(10), nullable=False, unique=True)
    pelna_nazwa = Column(String(60), nullable=False, unique=True)

# ------------------------------------------------------------
# 3) pilkarz_pozycja (relacja wiele-do-wielu, klucz złożony)
# ------------------------------------------------------------
class PilkarzPozycja(Base):
    __tablename__ = "pilkarz_pozycja"
    id_pilkarza = Column(Integer, nullable=False)
    id_pozycja = Column(Integer, nullable=False)
    __table_args__ = (
        PrimaryKeyConstraint("id_pilkarza", "id_pozycja", name="pk_pilkarz_pozycja"),
    )

# ------------------------------------------------------------
# 4) agenci
# ------------------------------------------------------------
class Agent(Base):
    __tablename__ = "agenci"
    id_agenta = Column(Integer, primary_key=True, index=True, autoincrement=True)
    imie = Column(String(40), nullable=False, default="")
    nazwisko = Column(String(40), nullable=False, default="")

# ------------------------------------------------------------
# 5) kluby
# ------------------------------------------------------------
class Klub(Base):
    __tablename__ = "kluby"
    id_klubu = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nazwa = Column(String(120), nullable=False, unique=True)
    miasto = Column(String(120), nullable=False)
    id_stadionu = Column(Integer, nullable=True)
    rok_zalozenia = Column(Integer, nullable=True)

# ------------------------------------------------------------
# 6) kluby_budzet (klucz złożony: id_klubu + data_dofinansowania)
# ------------------------------------------------------------
class KlubBudzet(Base):
    __tablename__ = "kluby_budzet"
    id_klubu = Column(Integer, nullable=False)
    kwota_dodana = Column(Numeric, nullable=False)
    data_dofinansowania = Column(Date, primary_key=True, default=None)
    powod_dofinansowania = Column(Text, nullable=True)
    __table_args__ = (PrimaryKeyConstraint("id_klubu", "data_dofinansowania", name="pk_kluby_budzet"),)

# ------------------------------------------------------------
# 7) stadiony
# ------------------------------------------------------------
class Stadion(Base):
    __tablename__ = "stadiony"
    id_stadionu = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nazwa = Column(String(120), nullable=False, unique=True)
    id_kraju = Column(Integer, nullable=False)
    miasto = Column(String(120), nullable=False)

# ------------------------------------------------------------
# 8) historia_klub_liga (klucz złożony: id_klubu, id_ligi, id_sezonu)
# ------------------------------------------------------------
class HistoriaKlubLiga(Base):
    __tablename__ = "historia_klub_liga"
    id_klubu = Column(Integer, nullable=False)
    id_ligi = Column(Integer, nullable=False)
    id_sezonu = Column(Integer, nullable=False)
    __table_args__ = (PrimaryKeyConstraint("id_klubu", "id_ligi", "id_sezonu", name="pk_historia_klub_liga"),)

# ------------------------------------------------------------
# 9) sezony
# ------------------------------------------------------------
class Sezon(Base):
    __tablename__ = "sezony"
    id_sezonu = Column(Integer, primary_key=True, index=True)
    data_poczatek = Column(Date, nullable=False)
    data_koniec = Column(Date, nullable=False)
    uwagi = Column(Text, nullable=True)

# ------------------------------------------------------------
# 10) historia_klub_sponsor (klucz złożony: id_klubu, id_sponsora, data_zawarcia_wspolpracy)
# ------------------------------------------------------------
class HistoriaKlubSponsor(Base):
    __tablename__ = "historia_klub_sponsor"
    id_klubu = Column(Integer, nullable=False)
    id_sponsora = Column(Integer, nullable=False)
    data_zawarcia_wspolpracy = Column(Date, nullable=False)
    data_zakonczenia_wpolpracy = Column(Date, nullable=True)
    __table_args__ = (
        PrimaryKeyConstraint(
            "id_klubu", "id_sponsora", "data_zawarcia_wspolpracy",
            name="pk_historia_klub_sponsor"
        ),
    )

# ------------------------------------------------------------
# 11) sponsorzy
# ------------------------------------------------------------
class Sponsor(Base):
    __tablename__ = "sponsorzy"
    id_sponsora = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nazwa = Column(String(120), nullable=False, unique=True)

# ------------------------------------------------------------
# 12) ligi
# ------------------------------------------------------------
class Liga(Base):
    __tablename__ = "ligi"
    id_ligi = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nazwa = Column(String(120), nullable=False, unique=True)
    id_kraju = Column(Integer, nullable=False)

# ------------------------------------------------------------
# 13) oferty_transferowe_klub_klub (klucz prosty: id_oferty_dla_klubu)
# ------------------------------------------------------------
class OfertaKlubKlub(Base):
    __tablename__ = "oferty_transferowe_klub_klub"
    id_oferty_dla_klubu = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_pilkarza = Column(Integer, nullable=False)
    id_klubu = Column(Integer, nullable=False)
    data_zlozenia_oferty = Column(Date, nullable=False)
    id_agenta_klubu1 = Column(Integer, nullable=True)
    id_agenta_klubu2 = Column(Integer, nullable=True)
    czy_zaakceptowana = Column(Boolean, nullable=False, default=False)
    do_negocjacji = Column(Boolean, nullable=False, default=True)
    kto_sklada_oferte = Column(String(20), nullable=False)
    zaplata = Column(Integer, nullable=False)
    ilosc_rat = Column(Integer, nullable=False, default=1)
    dodatek_po_wystepach_w_lidze = Column(Integer, nullable=True)
    po_ilu_wystepach = Column(Integer, nullable=True)
    dodatek_za_wystepy_w_lidze = Column(Integer, nullable=True)
    za_ile_wystepow = Column(Integer, nullable=True)
    dodatek_jednorazowy_za_strzelone_bramki = Column(Integer, nullable=True)
    ilosc_bramek_do_dodatku = Column(Integer, nullable=True)
    premia_za_osiagniecia_w_rozgrywkach = Column(Integer, nullable=True)
    procent_z_nastepnego_transferu_w_procentach = Column(Numeric(2, 0), nullable=True)
    uwagi = Column(Text, nullable=True)

# ------------------------------------------------------------
# 14) oferty_transferowe_klub_pilkarz (klucz prosty: id_oferty_dla_pilkarza)
# ------------------------------------------------------------
class OfertaKlubPilkarz(Base):
    __tablename__ = "oferty_transferowe_klub_pilkarz"
    id_oferty_dla_pilkarza = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_oferty_od_klubu = Column(Integer, nullable=True)
    id_pilkarza = Column(Integer, nullable=False)
    id_klubu = Column(Integer, nullable=False)
    id_agenta_klubu = Column(Integer, nullable=True)
    id_agenta_pilkarza = Column(Integer, nullable=True)
    data_zlozenia_oferty = Column(Date, nullable=False)
    data_poczatek_kontraktu = Column(Date, nullable=False)
    data_koniec_kontraktu = Column(Date, nullable=False)
    czy_przyjeta = Column(Boolean, nullable=False, default=False)
    do_negocjacji = Column(Boolean, nullable=False, default=True)
    kto_sklada_oferte = Column(String(20), nullable=False)
    czestosc_wystepow_w_procentach = Column(Integer, nullable=False)
    placa_miesieczna = Column(Integer, nullable=False)
    kwota_gotowkowa = Column(Integer, nullable=True)
    oplata_dla_agenta = Column(Integer, nullable=True)
    premia_za_wystep = Column(Integer, nullable=True)
    premia_za_bramke = Column(Integer, nullable=True)
    premia_za_niewykorzystanego_rezerwowego = Column(Integer, nullable=True)
    uwagi = Column(Text, nullable=True)

# ------------------------------------------------------------
# 15) transferroom_sprzedaz (klucz prosty: id_oferta_sprzedarzy)
# ------------------------------------------------------------
class TransferroomSprzedaz(Base):
    __tablename__ = "transferroom_sprzedaz"
    id_oferta_sprzedarzy = Column(Integer, primary_key=True, index=True, autoincrement=True)
    data_wystawienia = Column(Date, nullable=False)
    id_klubu = Column(Integer, nullable=False)
    id_zawodnika = Column(Integer, nullable=False)
    cena_startowa = Column(Integer, nullable=True)
    uwagi = Column(Text, nullable=True)

# ------------------------------------------------------------
# 16) transferroom_poszukiwania (klucz prosty: id_poszukiwania)
# ------------------------------------------------------------
class TransferroomPoszukiwania(Base):
    __tablename__ = "transferroom_poszukiwania"
    id_poszukiwania = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_klubu = Column(Integer, nullable=False)
    id_pozycja = Column(Integer, nullable=True)
    cena_do = Column(Integer, nullable=True)
    wiek_max = Column(Integer, nullable=True)
    id_kraju = Column(Integer, nullable=True)
    id_ligi = Column(Integer, nullable=True)

# ------------------------------------------------------------
# 17) tabela_zalety_wady_pilkarza (klucz prosty: id_cechy)
# ------------------------------------------------------------
class ZaletaWadaPilkarza(Base):
    __tablename__ = "tabela_zalety_wady_pilkarza"
    id_cechy = Column(Integer, primary_key=True, index=True, autoincrement=True)
    opis = Column(String(120), nullable=False, unique=True)

# ------------------------------------------------------------
# 18) mecze (klucz prosty: id_meczu)
# ------------------------------------------------------------
class Mecz(Base):
    __tablename__ = "mecze"
    id_meczu = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_gospodarze = Column(Integer, nullable=False)
    id_goscie = Column(Integer, nullable=False)
    data = Column(Date, nullable=False)
    id_stadionu = Column(Integer, nullable=False)
    nierozstrzygniety = Column(Boolean, nullable=True, default=False)
    rodzaj_meczu = Column(String(20), nullable=True)
    uwagi = Column(Text, nullable=True)

# ------------------------------------------------------------
# 19) mecz_statystyki_gracze_meczu (klucz złożony: id_meczu, id_pilkarza)
# ------------------------------------------------------------
class MeczStatyGracze(Base):
    __tablename__ = "mecz_statystyki_gracze_meczu"
    id_meczu = Column(Integer, nullable=False)
    id_pilkarza = Column(Integer, nullable=False)
    boisko_lawka = Column(String(1), nullable=False)
    __table_args__ = (
        PrimaryKeyConstraint("id_meczu", "id_pilkarza", name="pk_mecz_staty_gracze"),
    )

# ------------------------------------------------------------
# 20) mecz_statystyki_zmiany (klucz złożony: id_meczu, id_pilkarza_wchodzi, id_pilkarza_zchodzi)
# ------------------------------------------------------------
class MeczStatyZmiany(Base):
    __tablename__ = "mecz_statystyki_zmiany"
    id_meczu = Column(Integer, nullable=False)
    id_pilkarza_zchodzi = Column(Integer, nullable=False)
    id_pilkarza_wchodzi = Column(Integer, nullable=False)
    minuta = Column(Integer, nullable=False)
    minuta_czasu_doliczonego = Column(Integer, nullable=True)
    __table_args__ = (
        PrimaryKeyConstraint(
            "id_meczu", "id_pilkarza_wchodzi", "id_pilkarza_zchodzi",
            name="pk_mecz_staty_zmiany"
        ),
    )

# ------------------------------------------------------------
# 21) mecz_statystyki_wydarzenia (klucz prosty: id_wydarzenia)
# ------------------------------------------------------------
class MeczStatyWydarzenia(Base):
    __tablename__ = "mecz_statystyki_wydarzenia"
    id_wydarzenia = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nazwa = Column(String(40), nullable=True)

# ------------------------------------------------------------
# 22) mecz_statystyki_wydarzenia_na_boisku (klucz prosty: id)
# ------------------------------------------------------------
class MeczStatyWydarzeniaNaBoisku(Base):
    __tablename__ = "mecz_statystyki_wydarzenia_na_boisku"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_wydarzenia = Column(Integer, nullable=False)
    id_meczu = Column(Integer, nullable=False)
    id_pilkarza = Column(Integer, nullable=False)
    minuta = Column(Integer, nullable=False)
    minuta_czasu_doliczonego = Column(Integer, nullable=True)

# ------------------------------------------------------------
# 23) kontuzje (klucz złożony: id_pilkarza, data_kontuzji, opis_kontuzji)
# ------------------------------------------------------------
class Kontuzja(Base):
    __tablename__ = "kontuzje"
    id_pilkarza = Column(Integer, nullable=False)
    id_meczu = Column(Integer, nullable=True)
    data_kontuzji = Column(Date, nullable=False)
    opis_kontuzji = Column(Text, nullable=False)
    przewidywany_czas_leczenia_w_dniach = Column(Integer, nullable=False)
    __table_args__ = (
        PrimaryKeyConstraint(
            "id_pilkarza", "data_kontuzji", "opis_kontuzji", name="pk_kontuzje"
        ),
    )

# ------------------------------------------------------------
# 24) skauci
# ------------------------------------------------------------
class Skaut(Base):
    __tablename__ = "skauci"
    id_skauta = Column(Integer, primary_key=True, index=True, autoincrement=True)
    imie = Column(String(40), nullable=False, default="")
    nazwisko = Column(String(40), nullable=False, default="")

# ------------------------------------------------------------
# 25) historia_skauci_kluby (klucz złożony: id_skauta, id_klubu, data_rozpoczecia_wspolpracy)
# ------------------------------------------------------------
class HistoriaSkautiKluby(Base):
    __tablename__ = "historia_skauci_kluby"
    id_skauta = Column(Integer, nullable=False)
    id_klubu = Column(Integer, nullable=False)
    data_rozpoczecia_wspolpracy = Column(Date, nullable=False)
    data_zakonczenia_wspolpracy = Column(Date, nullable=False)
    __table_args__ = (
        PrimaryKeyConstraint(
            "id_skauta", "id_klubu", "data_rozpoczecia_wspolpracy",
            name="pk_historia_skauci_kluby"
        ),
    )

# ------------------------------------------------------------
# 26) skaut_raport
# ------------------------------------------------------------
class SkautRaport(Base):
    __tablename__ = "skaut_raport"
    id_raportu = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_skauta = Column(Integer, nullable=False)
    data_zlozenia_raportu = Column(Date, nullable=False)

# ------------------------------------------------------------
# 27) raporty (klucz złożony: id_raportu, id_zawodnika)
# ------------------------------------------------------------
class Raport(Base):
    __tablename__ = "raporty"
    id_raportu = Column(Integer, nullable=False)
    id_zawodnika = Column(Integer, nullable=False)
    ocena_skauta = Column(Integer, nullable=False)
    czy_chetny_na_transfer = Column(Boolean, nullable=False, default=True)
    cecha = Column(Integer, nullable=True)
    uwagi = Column(Text, nullable=True)
    __table_args__ = (
        PrimaryKeyConstraint("id_raportu", "id_zawodnika", name="pk_raporty"),
    )

# ------------------------------------------------------------
# 28) licencje
# ------------------------------------------------------------
class Licencja(Base):
    __tablename__ = "licencje"
    id_licencji = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nazwa = Column(String(20), nullable=False, unique=True)

# ------------------------------------------------------------
# 29) managerzy
# ------------------------------------------------------------
class Manager(Base):
    __tablename__ = "managerzy"
    id_managera = Column(Integer, primary_key=True, index=True, autoincrement=True)
    imie = Column(String(40), nullable=False, default="")
    nazwisko = Column(String(40), nullable=False, default="")
    data_urodzenia = Column(Date, nullable=False)
    kraj_pochodzenia = Column(Integer, nullable=False)
    licencja = Column(Integer, nullable=False)

# ------------------------------------------------------------
# 30) oferty_managerow (klucz prosty: id_oferty_managera)
# ------------------------------------------------------------
class OfertaManager(Base):
    __tablename__ = "oferty_managerow"
    id_oferty_managera = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_managera = Column(Integer, nullable=False)
    id_klubu = Column(Integer, nullable=False)
    data_propozycji = Column(Date, nullable=False)
    czy_przyjeta = Column(Boolean, nullable=False)
    pensja = Column(Integer, nullable=False)
    data_rozpoczecia_kontraktu = Column(Date, nullable=False)
    data_zakonczenia_kontraktu = Column(Date, nullable=False)

# ------------------------------------------------------------
# 31) kraje
# ------------------------------------------------------------
class Kraj(Base):
    __tablename__ = "kraje"
    id_kraju = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nazwa = Column(String(60), nullable=False, unique=True)
