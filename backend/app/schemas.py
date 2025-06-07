from datetime import date
from typing import Optional
from pydantic import BaseModel


# ----------------------------------------
# 1) PILKARZ
# ----------------------------------------
class PilkarzBase(BaseModel):
    imie: str
    nazwisko: str
    wzrost_cm: Optional[int] = None
    plec: str
    numer_buta: Optional[int] = None
    glowna_noga: Optional[str] = None
    data_urodzenia: date
    id_kraju: int

class PilkarzCreate(PilkarzBase):
    pass

class PilkarzUpdate(BaseModel):
    imie: Optional[str] = None
    nazwisko: Optional[str] = None
    wzrost_cm: Optional[int] = None
    plec: Optional[str] = None
    numer_buta: Optional[int] = None
    glowna_noga: Optional[str] = None
    data_urodzenia: Optional[date] = None
    id_kraju: Optional[int] = None

class PilkarzRead(PilkarzBase):
    id_pilkarza: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 2) POZYCJA
# ----------------------------------------
class PozycjaBase(BaseModel):
    skrot: str
    pelna_nazwa: str

class PozycjaCreate(PozycjaBase):
    pass

class PozycjaUpdate(BaseModel):
    skrot: Optional[str] = None
    pelna_nazwa: Optional[str] = None

class PozycjaRead(PozycjaBase):
    id_pozycja: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 3) PILKARZ_POZYCJA (klucz złożony)
# ----------------------------------------
class PilkarzPozycjaBase(BaseModel):
    id_pilkarza: int
    id_pozycja: int

class PilkarzPozycjaCreate(PilkarzPozycjaBase):
    pass

class PilkarzPozycjaRead(PilkarzPozycjaBase):
    class Config:
        orm_mode = True


# ----------------------------------------
# 4) AGENT
# ----------------------------------------
class AgentBase(BaseModel):
    imie: str
    nazwisko: str

class AgentCreate(AgentBase):
    pass

class AgentUpdate(BaseModel):
    imie: Optional[str] = None
    nazwisko: Optional[str] = None

class AgentRead(AgentBase):
    id_agenta: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 5) KLUB
# ----------------------------------------
class KlubBase(BaseModel):
    nazwa: str
    miasto: str
    id_stadionu: Optional[int] = None
    rok_zalozenia: Optional[int] = None

class KlubCreate(KlubBase):
    pass

class KlubUpdate(BaseModel):
    nazwa: Optional[str] = None
    miasto: Optional[str] = None
    id_stadionu: Optional[int] = None
    rok_zalozenia: Optional[int] = None

class KlubRead(KlubBase):
    id_klubu: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 6) KLUB_BUDZET (klucz złożony)
# ----------------------------------------
class KlubBudzetBase(BaseModel):
    id_klubu: int
    kwota_dodana: float
    data_dofinansowania: date
    powod_dofinansowania: Optional[str] = None

class KlubBudzetCreate(KlubBudzetBase):
    pass

class KlubBudzetRead(KlubBudzetBase):
    class Config:
        orm_mode = True


# ----------------------------------------
# 7) STADION
# ----------------------------------------
class StadionBase(BaseModel):
    nazwa: str
    id_kraju: int
    miasto: str

class StadionCreate(StadionBase):
    pass

class StadionUpdate(BaseModel):
    nazwa: Optional[str] = None
    id_kraju: Optional[int] = None
    miasto: Optional[str] = None

class StadionRead(StadionBase):
    id_stadionu: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 8) HISTORIA_KLUB_LIGA (klucz złożony)
# ----------------------------------------
class HistoriaKlubLigaBase(BaseModel):
    id_klubu: int
    id_ligi: int
    id_sezonu: int

class HistoriaKlubLigaCreate(HistoriaKlubLigaBase):
    pass

class HistoriaKlubLigaRead(HistoriaKlubLigaBase):
    class Config:
        orm_mode = True


# ----------------------------------------
# 9) SEZON
# ----------------------------------------
class SezonBase(BaseModel):
    id_sezonu: int
    data_poczatek: date
    data_koniec: date
    uwagi: Optional[str] = None

class SezonCreate(BaseModel):
    id_sezonu: int
    data_poczatek: date
    data_koniec: date
    uwagi: Optional[str] = None

class SezonUpdate(BaseModel):
    data_poczatek: Optional[date] = None
    data_koniec: Optional[date] = None
    uwagi: Optional[str] = None

class SezonRead(SezonBase):
    class Config:
        orm_mode = True


# ----------------------------------------
# 10) HISTORIA_KLUB_SPONSOR (klucz złożony)
# ----------------------------------------
class HistoriaKlubSponsorBase(BaseModel):
    id_klubu: int
    id_sponsora: int
    data_zawarcia_wspolpracy: date
    data_zakonczenia_wpolpracy: Optional[date] = None

class HistoriaKlubSponsorCreate(HistoriaKlubSponsorBase):
    pass

class HistoriaKlubSponsorRead(HistoriaKlubSponsorBase):
    class Config:
        orm_mode = True


# ----------------------------------------
# 11) SPONSOR
# ----------------------------------------
class SponsorBase(BaseModel):
    nazwa: str

class SponsorCreate(SponsorBase):
    pass

class SponsorUpdate(BaseModel):
    nazwa: Optional[str] = None

class SponsorRead(SponsorBase):
    id_sponsora: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 12) LIGA
# ----------------------------------------
class LigaBase(BaseModel):
    nazwa: str
    id_kraju: int

class LigaCreate(LigaBase):
    pass

class LigaUpdate(BaseModel):
    nazwa: Optional[str] = None
    id_kraju: Optional[int] = None

class LigaRead(LigaBase):
    id_ligi: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 13) OFERTA_KLUB_KLUB
# ----------------------------------------
class OfertaKlubKlubBase(BaseModel):
    id_pilkarza: int
    id_klubu: int
    data_zlozenia_oferty: date
    id_agenta_klubu1: Optional[int] = None
    id_agenta_klubu2: Optional[int] = None
    czy_zaakceptowana: Optional[bool] = False
    do_negocjacji: Optional[bool] = True
    kto_sklada_oferte: str
    zaplata: int
    ilosc_rat: Optional[int] = 1
    dodatek_po_wystepach_w_lidze: Optional[int] = None
    po_ilu_wystepach: Optional[int] = None
    dodatek_za_wystepy_w_lidze: Optional[int] = None
    za_ile_wystepow: Optional[int] = None
    dodatek_jednorazowy_za_strzelone_bramki: Optional[int] = None
    ilosc_bramek_do_dodatku: Optional[int] = None
    premia_za_osiagniecia_w_rozgrywkach: Optional[int] = None
    procent_z_nastepnego_transferu_w_procentach: Optional[float] = None
    uwagi: Optional[str] = None

class OfertaKlubKlubCreate(OfertaKlubKlubBase):
    pass

class OfertaKlubKlubUpdate(BaseModel):
    id_pilkarza: Optional[int] = None
    id_klubu: Optional[int] = None
    data_zlozenia_oferty: Optional[date] = None
    id_agenta_klubu1: Optional[int] = None
    id_agenta_klubu2: Optional[int] = None
    czy_zaakceptowana: Optional[bool] = None
    do_negocjacji: Optional[bool] = None
    kto_sklada_oferte: Optional[str] = None
    zaplata: Optional[int] = None
    ilosc_rat: Optional[int] = None
    dodatek_po_wystepach_w_lidze: Optional[int] = None
    po_ilu_wystepach: Optional[int] = None
    dodatek_za_wystepy_w_lidze: Optional[int] = None
    za_ile_wystepow: Optional[int] = None
    dodatek_jednorazowy_za_strzelone_bramki: Optional[int] = None
    ilosc_bramek_do_dodatku: Optional[int] = None
    premia_za_osiagniecia_w_rozgrywkach: Optional[int] = None
    procent_z_nastepnego_transferu_w_procentach: Optional[float] = None
    uwagi: Optional[str] = None

class OfertaKlubKlubRead(OfertaKlubKlubBase):
    id_oferty_dla_klubu: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 14) OFERTA_KLUB_PILKARZ
# ----------------------------------------
class OfertaKlubPilkarzBase(BaseModel):
    id_oferty_od_klubu: Optional[int] = None
    id_pilkarza: int
    id_klubu: int
    id_agenta_klubu: Optional[int] = None
    id_agenta_pilkarza: Optional[int] = None
    data_zlozenia_oferty: date
    data_poczatek_kontraktu: date
    data_koniec_kontraktu: date
    czy_przyjeta: Optional[bool] = False
    do_negocjacji: Optional[bool] = True
    kto_sklada_oferte: str
    czestosc_wystepow_w_procentach: int
    placa_miesieczna: int
    kwota_gotowkowa: Optional[int] = None
    oplata_dla_agenta: Optional[int] = None
    premia_za_wystep: Optional[int] = None
    premia_za_bramke: Optional[int] = None
    premia_za_niewykorzystanego_rezerwowego: Optional[int] = None
    uwagi: Optional[str] = None

class OfertaKlubPilkarzCreate(OfertaKlubPilkarzBase):
    pass

class OfertaKlubPilkarzUpdate(BaseModel):
    id_oferty_od_klubu: Optional[int] = None
    id_pilkarza: Optional[int] = None
    id_klubu: Optional[int] = None
    id_agenta_klubu: Optional[int] = None
    id_agenta_pilkarza: Optional[int] = None
    data_zlozenia_oferty: Optional[date] = None
    data_poczatek_kontraktu: Optional[date] = None
    data_koniec_kontraktu: Optional[date] = None
    czy_przyjeta: Optional[bool] = None
    do_negocjacji: Optional[bool] = None
    kto_sklada_oferte: Optional[str] = None
    czestosc_wystepow_w_procentach: Optional[int] = None
    placa_miesieczna: Optional[int] = None
    kwota_gotowkowa: Optional[int] = None
    oplata_dla_agenta: Optional[int] = None
    premia_za_wystep: Optional[int] = None
    premia_za_bramke: Optional[int] = None
    premia_za_niewykorzystanego_rezerwowego: Optional[int] = None
    uwagi: Optional[str] = None

class OfertaKlubPilkarzRead(OfertaKlubPilkarzBase):
    id_oferty_dla_pilkarza: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 15) TRANSFERROOM_SPRZEDAZ
# ----------------------------------------
class TransferroomSprzedazBase(BaseModel):
    data_wystawienia: date
    id_klubu: int
    id_zawodnika: int
    cena_startowa: Optional[int] = None
    uwagi: Optional[str] = None

class TransferroomSprzedazCreate(TransferroomSprzedazBase):
    pass

class TransferroomSprzedazUpdate(BaseModel):
    data_wystawienia: Optional[date] = None
    id_klubu: Optional[int] = None
    id_zawodnika: Optional[int] = None
    cena_startowa: Optional[int] = None
    uwagi: Optional[str] = None

class TransferroomSprzedazRead(TransferroomSprzedazBase):
    id_oferta_sprzedarzy: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 16) TRANSFERROOM_POSZUKIWANIA
# ----------------------------------------
class TransferroomPoszukiwaniaBase(BaseModel):
    id_klubu: int
    id_pozycja: Optional[int] = None
    cena_do: Optional[int] = None
    wiek_max: Optional[int] = None
    id_kraju: Optional[int] = None
    id_ligi: Optional[int] = None

class TransferroomPoszukiwaniaCreate(TransferroomPoszukiwaniaBase):
    pass

class TransferroomPoszukiwaniaUpdate(BaseModel):
    id_klubu: Optional[int] = None
    id_pozycja: Optional[int] = None
    cena_do: Optional[int] = None
    wiek_max: Optional[int] = None
    id_kraju: Optional[int] = None
    id_ligi: Optional[int] = None

class TransferroomPoszukiwaniaRead(TransferroomPoszukiwaniaBase):
    id_poszukiwania: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 17) ZALETA_WADA_PILKARZA
# ----------------------------------------
class ZaletaWadaPilkarzaBase(BaseModel):
    opis: str

class ZaletaWadaPilkarzaCreate(ZaletaWadaPilkarzaBase):
    pass

class ZaletaWadaPilkarzaUpdate(BaseModel):
    opis: Optional[str] = None

class ZaletaWadaPilkarzaRead(ZaletaWadaPilkarzaBase):
    id_cechy: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 18) MECZ
# ----------------------------------------
class MeczBase(BaseModel):
    id_gospodarze: int
    id_goscie: int
    data: date
    id_stadionu: int
    nierozstrzygniety: Optional[bool] = False
    rodzaj_meczu: Optional[str] = None
    uwagi: Optional[str] = None

class MeczCreate(MeczBase):
    pass

class MeczUpdate(BaseModel):
    id_gospodarze: Optional[int] = None
    id_goscie: Optional[int] = None
    data: Optional[date] = None
    id_stadionu: Optional[int] = None
    nierozstrzygniety: Optional[bool] = None
    rodzaj_meczu: Optional[str] = None
    uwagi: Optional[str] = None

class MeczRead(MeczBase):
    id_meczu: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 19) MECZ_STATY_GRACZE (klucz złożony)
# ----------------------------------------
class MeczStatyGraczeBase(BaseModel):
    id_meczu: int
    id_pilkarza: int
    boisko_lawka: str

class MeczStatyGraczeCreate(MeczStatyGraczeBase):
    pass

class MeczStatyGraczeRead(MeczStatyGraczeBase):
    class Config:
        orm_mode = True


# ----------------------------------------
# 20) MECZ_STATY_ZMIANY (klucz złożony)
# ----------------------------------------
class MeczStatyZmianyBase(BaseModel):
    id_meczu: int
    id_pilkarza_zchodzi: int
    id_pilkarza_wchodzi: int
    minuta: int
    minuta_czasu_doliczonego: Optional[int] = None

class MeczStatyZmianyCreate(MeczStatyZmianyBase):
    pass

class MeczStatyZmianyRead(MeczStatyZmianyBase):
    class Config:
        orm_mode = True


# ----------------------------------------
# 21) MECZ_STATY_WYDARZENIA (klucz prosty)
# ----------------------------------------
class MeczStatyWydarzeniaBase(BaseModel):
    nazwa: Optional[str] = None

class MeczStatyWydarzeniaCreate(MeczStatyWydarzeniaBase):
    pass

class MeczStatyWydarzeniaUpdate(BaseModel):
    nazwa: Optional[str] = None

class MeczStatyWydarzeniaRead(MeczStatyWydarzeniaBase):
    id_wydarzenia: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 22) MECZ_STATY_WYDARZENIA_NA_BOISKU (klucz prosty)
# ----------------------------------------
class MeczStatyWydarzeniaNaBoiskuBase(BaseModel):
    id_wydarzenia: int
    id_meczu: int
    id_pilkarza: int
    minuta: int
    minuta_czasu_doliczonego: Optional[int] = None

class MeczStatyWydarzeniaNaBoiskuCreate(MeczStatyWydarzeniaNaBoiskuBase):
    pass

class MeczStatyWydarzeniaNaBoiskuUpdate(BaseModel):
    id_wydarzenia: Optional[int] = None
    id_meczu: Optional[int] = None
    id_pilkarza: Optional[int] = None
    minuta: Optional[int] = None
    minuta_czasu_doliczonego: Optional[int] = None

class MeczStatyWydarzeniaNaBoiskuRead(MeczStatyWydarzeniaNaBoiskuBase):
    id: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 23) KONTUZJA (klucz złożony)
# ----------------------------------------
class KontuzjaBase(BaseModel):
    id_pilkarza: int
    id_meczu: Optional[int] = None
    data_kontuzji: date
    opis_kontuzji: str
    przewidywany_czas_leczenia_w_dniach: int

class KontuzjaCreate(KontuzjaBase):
    pass

class KontuzjaRead(KontuzjaBase):
    class Config:
        orm_mode = True


# ----------------------------------------
# 24) SKAUT
# ----------------------------------------
class SkautBase(BaseModel):
    imie: str
    nazwisko: str

class SkautCreate(SkautBase):
    pass

class SkautUpdate(BaseModel):
    imie: Optional[str] = None
    nazwisko: Optional[str] = None

class SkautRead(SkautBase):
    id_skauta: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 25) HISTORIA_SKAUCI_KLUBY (klucz złożony)
# ----------------------------------------
class HistoriaSkautiKlubyBase(BaseModel):
    id_skauta: int
    id_klubu: int
    data_rozpoczecia_wspolpracy: date
    data_zakonczenia_wspolpracy: date

class HistoriaSkautiKlubyCreate(HistoriaSkautiKlubyBase):
    pass

class HistoriaSkautiKlubyRead(HistoriaSkautiKlubyBase):
    class Config:
        orm_mode = True


# ----------------------------------------
# 26) SKAUT_RAPORT
# ----------------------------------------
class SkautRaportBase(BaseModel):
    id_skauta: int
    data_zlozenia_raportu: date

class SkautRaportCreate(SkautRaportBase):
    pass

class SkautRaportUpdate(BaseModel):
    id_skauta: Optional[int] = None
    data_zlozenia_raportu: Optional[date] = None

class SkautRaportRead(SkautRaportBase):
    id_raportu: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 27) RAPORT
# ----------------------------------------
class RaportBase(BaseModel):
    id_raportu: int
    id_zawodnika: int
    ocena_skauta: int
    czy_chetny_na_transfer: Optional[bool] = True
    cecha: Optional[int] = None
    uwagi: Optional[str] = None

class RaportCreate(RaportBase):
    pass

class RaportUpdate(BaseModel):
    ocena_skauta: Optional[int] = None
    czy_chetny_na_transfer: Optional[bool] = None
    cecha: Optional[int] = None
    uwagi: Optional[str] = None

class RaportRead(RaportBase):
    class Config:
        orm_mode = True


# ----------------------------------------
# 28) LICENCJA
# ----------------------------------------
class LicencjaBase(BaseModel):
    nazwa: str

class LicencjaCreate(LicencjaBase):
    pass

class LicencjaUpdate(BaseModel):
    nazwa: Optional[str] = None

class LicencjaRead(LicencjaBase):
    id_licencji: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 29) MANAGER
# ----------------------------------------
class ManagerBase(BaseModel):
    imie: str
    nazwisko: str
    data_urodzenia: date
    kraj_pochodzenia: int
    licencja: int

class ManagerCreate(ManagerBase):
    pass

class ManagerUpdate(BaseModel):
    imie: Optional[str] = None
    nazwisko: Optional[str] = None
    data_urodzenia: Optional[date] = None
    kraj_pochodzenia: Optional[int] = None
    licencja: Optional[int] = None

class ManagerRead(ManagerBase):
    id_managera: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 30) OFERTA_MANAGER
# ----------------------------------------
class OfertaManagerBase(BaseModel):
    id_managera: int
    id_klubu: int
    data_propozycji: date
    czy_przyjeta: bool
    pensja: int
    data_rozpoczecia_kontraktu: date
    data_zakonczenia_kontraktu: date

class OfertaManagerCreate(OfertaManagerBase):
    pass

class OfertaManagerUpdate(BaseModel):
    id_managera: Optional[int] = None
    id_klubu: Optional[int] = None
    data_propozycji: Optional[date] = None
    czy_przyjeta: Optional[bool] = None
    pensja: Optional[int] = None
    data_rozpoczecia_kontraktu: Optional[date] = None
    data_zakonczenia_kontraktu: Optional[date] = None

class OfertaManagerRead(OfertaManagerBase):
    id_oferty_managera: int

    class Config:
        orm_mode = True


# ----------------------------------------
# 31) KRAJ
# ----------------------------------------
class KrajBase(BaseModel):
    nazwa: str

class KrajCreate(KrajBase):
    pass

class KrajUpdate(BaseModel):
    nazwa: Optional[str] = None

class KrajRead(KrajBase):
    id_kraju: int

    class Config:
        orm_mode = True
