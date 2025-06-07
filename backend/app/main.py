# # app/main.py

# from datetime import date
# from typing import List

# from fastapi import FastAPI, HTTPException, Depends, status
# from fastapi.middleware.cors import CORSMiddleware
# from sqlalchemy.orm import Session

# from . import models, schemas
# from .database import engine, get_db

# models.Base.metadata.create_all(bind=engine)

# app = FastAPI(
#     title="FootballTransfersAPI",
#     description="API do obsługi bazy Football Transfers (Data Engineering project)",
#     version="1.0.0"
# )

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# # =============================================================================
# #                            PILKARZE
# # =============================================================================

# @app.post("/api/pilkarze/", response_model=schemas.PilkarzRead)
# def create_pilkarz(p: schemas.PilkarzCreate, db: Session = Depends(get_db)):
#     db_obj = models.Pilkarz(**p.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/pilkarze/", response_model=List[schemas.PilkarzRead])
# def read_pilkarze(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.Pilkarz).offset(skip).limit(limit).all()

# @app.get("/api/pilkarze/{pilkarz_id}", response_model=schemas.PilkarzRead)
# def read_pilkarz(pilkarz_id: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Pilkarz).filter(models.Pilkarz.id_pilkarza == pilkarz_id).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Pilkarz nie znaleziony")
#     return db_obj

# @app.put("/api/pilkarze/{pilkarz_id}", response_model=schemas.PilkarzRead)
# def update_pilkarz(pilkarz_id: int, p: schemas.PilkarzUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Pilkarz).filter(models.Pilkarz.id_pilkarza == pilkarz_id).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Pilkarz nie znaleziony")
#     for key, val in p.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/pilkarze/{pilkarz_id}", status_code=204)
# def delete_pilkarz(pilkarz_id: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Pilkarz).filter(models.Pilkarz.id_pilkarza == pilkarz_id).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Pilkarz nie znaleziony")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                            POZYCJE
# # =============================================================================

# @app.post("/api/pozycje/", response_model=schemas.PozycjaRead)
# def create_pozycja(p: schemas.PozycjaCreate, db: Session = Depends(get_db)):
#     db_obj = models.Pozycja(**p.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/pozycje/", response_model=List[schemas.PozycjaRead])
# def read_pozycje(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.Pozycja).offset(skip).limit(limit).all()

# @app.get("/api/pozycje/{id_pozycja}", response_model=schemas.PozycjaRead)
# def read_pozycja(id_pozycja: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Pozycja).filter(models.Pozycja.id_pozycja == id_pozycja).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Pozycja nie znaleziona")
#     return db_obj

# @app.put("/api/pozycje/{id_pozycja}", response_model=schemas.PozycjaRead)
# def update_pozycja(id_pozycja: int, p: schemas.PozycjaUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Pozycja).filter(models.Pozycja.id_pozycja == id_pozycja).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Pozycja nie znaleziona")
#     for key, val in p.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/pozycje/{id_pozycja}", status_code=204)
# def delete_pozycja(id_pozycja: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Pozycja).filter(models.Pozycja.id_pozycja == id_pozycja).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Pozycja nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                 PILKARZ_POZYCJA (relacja wiele-do-wielu)
# # =============================================================================

# @app.post("/api/pilkarz_pozycja/", response_model=schemas.PilkarzPozycjaRead)
# def create_pilkarz_pozycja(rel: schemas.PilkarzPozycjaCreate, db: Session = Depends(get_db)):
#     db_obj = models.PilkarzPozycja(**rel.dict())
#     db.add(db_obj)
#     db.commit()
#     return rel

# @app.get("/api/pilkarz_pozycja/", response_model=List[schemas.PilkarzPozycjaRead])
# def read_pilkarz_pozycje(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.PilkarzPozycja).offset(skip).limit(limit).all()

# @app.delete("/api/pilkarz_pozycja/", status_code=204)
# def delete_pilkarz_pozycja(id_pilkarza: int, id_pozycja: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.PilkarzPozycja).filter(
#         models.PilkarzPozycja.id_pilkarza == id_pilkarza,
#         models.PilkarzPozycja.id_pozycja == id_pozycja
#     ).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Relacja nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                            AGENCI
# # =============================================================================

# @app.post("/api/agenci/", response_model=schemas.AgentRead)
# def create_agent(a: schemas.AgentCreate, db: Session = Depends(get_db)):
#     db_obj = models.Agent(**a.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/agenci/", response_model=List[schemas.AgentRead])
# def read_agenci(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.Agent).offset(skip).limit(limit).all()

# @app.get("/api/agenci/{id_agenta}", response_model=schemas.AgentRead)
# def read_agent(id_agenta: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Agent).filter(models.Agent.id_agenta == id_agenta).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Agent nie znaleziony")
#     return db_obj

# @app.put("/api/agenci/{id_agenta}", response_model=schemas.AgentRead)
# def update_agent(id_agenta: int, a: schemas.AgentUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Agent).filter(models.Agent.id_agenta == id_agenta).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Agent nie znaleziony")
#     for key, val in a.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/agenci/{id_agenta}", status_code=204)
# def delete_agent(id_agenta: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Agent).filter(models.Agent.id_agenta == id_agenta).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Agent nie znaleziony")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                            KLUBY
# # =============================================================================

# @app.post("/api/kluby/", response_model=schemas.KlubRead)
# def create_klub(k: schemas.KlubCreate, db: Session = Depends(get_db)):
#     db_obj = models.Klub(**k.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/kluby/", response_model=List[schemas.KlubRead])
# def read_kluby(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.Klub).offset(skip).limit(limit).all()

# @app.get("/api/kluby/{id_klubu}", response_model=schemas.KlubRead)
# def read_klub(id_klubu: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Klub).filter(models.Klub.id_klubu == id_klubu).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Klub nie znaleziony")
#     return db_obj

# @app.put("/api/kluby/{id_klubu}", response_model=schemas.KlubRead)
# def update_klub(id_klubu: int, k: schemas.KlubUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Klub).filter(models.Klub.id_klubu == id_klubu).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Klub nie znaleziony")
#     for key, val in k.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/kluby/{id_klubu}", status_code=204)
# def delete_klub(id_klubu: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Klub).filter(models.Klub.id_klubu == id_klubu).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Klub nie znaleziony")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                      KLUB_BUDZET (klucz złożony)
# # =============================================================================

# @app.post("/api/kluby_budzet/", response_model=schemas.KlubBudzetRead)
# def create_klub_budzet(kb: schemas.KlubBudzetCreate, db: Session = Depends(get_db)):
#     db_obj = models.KlubBudzet(**kb.dict())
#     db.add(db_obj)
#     db.commit()
#     return kb

# @app.get("/api/kluby_budzet/", response_model=List[schemas.KlubBudzetRead])
# def read_kluby_budzet(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.KlubBudzet).offset(skip).limit(limit).all()

# @app.delete("/api/kluby_budzet/", status_code=204)
# def delete_klub_budzet(
#     id_klubu: int,
#     data_dofinansowania: date,
#     db: Session = Depends(get_db)
# ):
#     db_obj = db.query(models.KlubBudzet).filter(
#         models.KlubBudzet.id_klubu == id_klubu,
#         models.KlubBudzet.data_dofinansowania == data_dofinansowania
#     ).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Wpis budżetu nie znaleziony")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                         STADIONY
# # =============================================================================

# @app.post("/api/stadiony/", response_model=schemas.StadionRead)
# def create_stadion(s: schemas.StadionCreate, db: Session = Depends(get_db)):
#     db_obj = models.Stadion(**s.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/stadiony/", response_model=List[schemas.StadionRead])
# def read_stadiony(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.Stadion).offset(skip).limit(limit).all()

# @app.get("/api/stadiony/{id_stadionu}", response_model=schemas.StadionRead)
# def read_stadion(id_stadionu: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Stadion).filter(models.Stadion.id_stadionu == id_stadionu).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Stadion nie znaleziony")
#     return db_obj

# @app.put("/api/stadiony/{id_stadionu}", response_model=schemas.StadionRead)
# def update_stadion(id_stadionu: int, s: schemas.StadionUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Stadion).filter(models.Stadion.id_stadionu == id_stadionu).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Stadion nie znaleziony")
#     for key, val in s.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/stadiony/{id_stadionu}", status_code=204)
# def delete_stadion(id_stadionu: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Stadion).filter(models.Stadion.id_stadionu == id_stadionu).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Stadion nie znaleziony")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                  HISTORIA_KLUB_LIGA (klucz złożony)
# # =============================================================================

# @app.post("/api/historia_klub_liga/", response_model=schemas.HistoriaKlubLigaRead)
# def create_historia_klub_liga(h: schemas.HistoriaKlubLigaCreate, db: Session = Depends(get_db)):
#     db_obj = models.HistoriaKlubLiga(**h.dict())
#     db.add(db_obj)
#     db.commit()
#     return h

# @app.get("/api/historia_klub_liga/", response_model=List[schemas.HistoriaKlubLigaRead])
# def read_historia_klub_liga(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.HistoriaKlubLiga).offset(skip).limit(limit).all()

# @app.delete("/api/historia_klub_liga/", status_code=204)
# def delete_historia_klub_liga(
#     id_klubu: int,
#     id_ligi: int,
#     id_sezonu: int,
#     db: Session = Depends(get_db)
# ):
#     db_obj = db.query(models.HistoriaKlubLiga).filter(
#         models.HistoriaKlubLiga.id_klubu == id_klubu,
#         models.HistoriaKlubLiga.id_ligi == id_ligi,
#         models.HistoriaKlubLiga.id_sezonu == id_sezonu
#     ).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Historia klub→liga nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                               SEZONY
# # =============================================================================

# @app.post("/api/sezony/", response_model=schemas.SezonRead)
# def create_sezon(s: schemas.SezonCreate, db: Session = Depends(get_db)):
#     db_obj = models.Sezon(**s.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/sezony/", response_model=List[schemas.SezonRead])
# def read_sezony(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.Sezon).offset(skip).limit(limit).all()

# @app.get("/api/sezony/{id_sezonu}", response_model=schemas.SezonRead)
# def read_sezon(id_sezonu: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Sezon).filter(models.Sezon.id_sezonu == id_sezonu).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Sezon nie znaleziony")
#     return db_obj

# @app.put("/api/sezony/{id_sezonu}", response_model=schemas.SezonRead)
# def update_sezon(id_sezonu: int, s: schemas.SezonUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Sezon).filter(models.Sezon.id_sezonu == id_sezonu).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Sezon nie znaleziony")
#     for key, val in s.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/sezony/{id_sezonu}", status_code=204)
# def delete_sezon(id_sezonu: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Sezon).filter(models.Sezon.id_sezonu == id_sezonu).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Sezon nie znaleziony")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                  HISTORIA_KLUB_SPONSOR (klucz złożony)
# # =============================================================================

# @app.post("/api/historia_klub_sponsor/", response_model=schemas.HistoriaKlubSponsorRead)
# def create_historia_klub_sponsor(h: schemas.HistoriaKlubSponsorCreate, db: Session = Depends(get_db)):
#     db_obj = models.HistoriaKlubSponsor(**h.dict())
#     db.add(db_obj)
#     db.commit()
#     return h

# @app.get("/api/historia_klub_sponsor/", response_model=List[schemas.HistoriaKlubSponsorRead])
# def read_historia_klub_sponsor(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.HistoriaKlubSponsor).offset(skip).limit(limit).all()

# @app.delete("/api/historia_klub_sponsor/", status_code=204)
# def delete_historia_klub_sponsor(
#     id_klubu: int,
#     id_sponsora: int,
#     data_zawarcia_wspolpracy: date,
#     db: Session = Depends(get_db)
# ):
#     db_obj = db.query(models.HistoriaKlubSponsor).filter(
#         models.HistoriaKlubSponsor.id_klubu == id_klubu,
#         models.HistoriaKlubSponsor.id_sponsora == id_sponsora,
#         models.HistoriaKlubSponsor.data_zawarcia_wspolpracy == data_zawarcia_wspolpracy
#     ).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Historia sponsorowania nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                            SPONSORZY
# # =============================================================================

# @app.post("/api/sponsorzy/", response_model=schemas.SponsorRead)
# def create_sponsor(s: schemas.SponsorCreate, db: Session = Depends(get_db)):
#     db_obj = models.Sponsor(**s.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/sponsorzy/", response_model=List[schemas.SponsorRead])
# def read_sponsorzy(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.Sponsor).offset(skip).limit(limit).all()

# @app.get("/api/sponsorzy/{id_sponsora}", response_model=schemas.SponsorRead)
# def read_sponsor(id_sponsora: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Sponsor).filter(models.Sponsor.id_sponsora == id_sponsora).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Sponsor nie znaleziony")
#     return db_obj

# @app.put("/api/sponsorzy/{id_sponsora}", response_model=schemas.SponsorRead)
# def update_sponsor(id_sponsora: int, s: schemas.SponsorUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Sponsor).filter(models.Sponsor.id_sponsora == id_sponsora).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Sponsor nie znaleziony")
#     for key, val in s.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/sponsorzy/{id_sponsora}", status_code=204)
# def delete_sponsor(id_sponsora: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Sponsor).filter(models.Sponsor.id_sponsora == id_sponsora).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Sponsor nie znaleziony")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                              LIGI
# # =============================================================================

# @app.post("/api/ligi/", response_model=schemas.LigaRead)
# def create_liga(l: schemas.LigaCreate, db: Session = Depends(get_db)):
#     db_obj = models.Liga(**l.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/ligi/", response_model=List[schemas.LigaRead])
# def read_ligi(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.Liga).offset(skip).limit(limit).all()

# @app.get("/api/ligi/{id_ligi}", response_model=schemas.LigaRead)
# def read_liga(id_ligi: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Liga).filter(models.Liga.id_ligi == id_ligi).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Liga nie znaleziona")
#     return db_obj

# @app.put("/api/ligi/{id_ligi}", response_model=schemas.LigaRead)
# def update_liga(id_ligi: int, l: schemas.LigaUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Liga).filter(models.Liga.id_ligi == id_ligi).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Liga nie znaleziona")
#     for key, val in l.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/ligi/{id_ligi}", status_code=204)
# def delete_liga(id_ligi: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Liga).filter(models.Liga.id_ligi == id_ligi).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Liga nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                      OFERTA_KLUB_KLUB
# # =============================================================================

# @app.post("/api/oferty_transferowe_klub_klub/", response_model=schemas.OfertaKlubKlubRead)
# def create_oferta_klub_klub(o: schemas.OfertaKlubKlubCreate, db: Session = Depends(get_db)):
#     db_obj = models.OfertaKlubKlub(**o.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/oferty_transferowe_klub_klub/", response_model=List[schemas.OfertaKlubKlubRead])
# def read_oferty_klub_klub(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.OfertaKlubKlub).offset(skip).limit(limit).all()

# @app.get("/api/oferty_transferowe_klub_klub/{id_oferty}", response_model=schemas.OfertaKlubKlubRead)
# def read_oferta_klub_klub(id_oferty: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.OfertaKlubKlub).filter(models.OfertaKlubKlub.id_oferty_dla_klubu == id_oferty).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Oferta klub→klub nie znaleziona")
#     return db_obj

# @app.put("/api/oferty_transferowe_klub_klub/{id_oferty}", response_model=schemas.OfertaKlubKlubRead)
# def update_oferta_klub_klub(id_oferty: int, o: schemas.OfertaKlubKlubUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.OfertaKlubKlub).filter(models.OfertaKlubKlub.id_oferty_dla_klubu == id_oferty).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Oferta klub→klub nie znaleziona")
#     for key, val in o.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/oferty_transferowe_klub_klub/{id_oferty}", status_code=204)
# def delete_oferta_klub_klub(id_oferty: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.OfertaKlubKlub).filter(models.OfertaKlubKlub.id_oferty_dla_klubu == id_oferty).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Oferta klub→klub nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                    OFERTA_KLUB_PILKARZ
# # =============================================================================

# @app.post("/api/oferty_transferowe_klub_pilkarz/", response_model=schemas.OfertaKlubPilkarzRead)
# def create_oferta_klub_pilkarz(o: schemas.OfertaKlubPilkarzCreate, db: Session = Depends(get_db)):
#     db_obj = models.OfertaKlubPilkarz(**o.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/oferty_transferowe_klub_pilkarz/", response_model=List[schemas.OfertaKlubPilkarzRead])
# def read_oferty_klub_pilkarz(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.OfertaKlubPilkarz).offset(skip).limit(limit).all()

# @app.get("/api/oferty_transferowe_klub_pilkarz/{id_oferty}", response_model=schemas.OfertaKlubPilkarzRead)
# def read_oferta_klub_pilkarz(id_oferty: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.OfertaKlubPilkarz).filter(models.OfertaKlubPilkarz.id_oferty_dla_pilkarza == id_oferty).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Oferta klub→piłkarz nie znaleziona")
#     return db_obj

# @app.put("/api/oferty_transferowe_klub_pilkarz/{id_oferty}", response_model=schemas.OfertaKlubPilkarzRead)
# def update_oferta_klub_pilkarz(id_oferty: int, o: schemas.OfertaKlubPilkarzUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.OfertaKlubPilkarz).filter(models.OfertaKlubPilkarz.id_oferty_dla_pilkarza == id_oferty).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Oferta klub→piłkarz nie znaleziona")
#     for key, val in o.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/oferty_transferowe_klub_pilkarz/{id_oferty}", status_code=204)
# def delete_oferta_klub_pilkarz(id_oferty: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.OfertaKlubPilkarz).filter(models.OfertaKlubPilkarz.id_oferty_dla_pilkarza == id_oferty).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Oferta klub→piłkarz nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                 TRANSFERROOM_SPRZEDAZ
# # =============================================================================

# @app.post("/api/transferroom_sprzedaz/", response_model=schemas.TransferroomSprzedazRead)
# def create_transferroom_sprzedaz(t: schemas.TransferroomSprzedazCreate, db: Session = Depends(get_db)):
#     db_obj = models.TransferroomSprzedaz(**t.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/transferroom_sprzedaz/", response_model=List[schemas.TransferroomSprzedazRead])
# def read_transferroom_sprzedaz(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.TransferroomSprzedaz).offset(skip).limit(limit).all()

# @app.get("/api/transferroom_sprzedaz/{id_oferta}", response_model=schemas.TransferroomSprzedazRead)
# def read_transferroom_sprzedaz_one(id_oferta: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.TransferroomSprzedaz).filter(models.TransferroomSprzedaz.id_oferta_sprzedarzy == id_oferta).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Oferta sprzedazy nie znaleziona")
#     return db_obj

# @app.put("/api/transferroom_sprzedaz/{id_oferta}", response_model=schemas.TransferroomSprzedazRead)
# def update_transferroom_sprzedaz(id_oferta: int, t: schemas.TransferroomSprzedazUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.TransferroomSprzedaz).filter(models.TransferroomSprzedaz.id_oferta_sprzedarzy == id_oferta).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Oferta sprzedazy nie znaleziona")
#     for key, val in t.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/transferroom_sprzedaz/{id_oferta}", status_code=204)
# def delete_transferroom_sprzedaz(id_oferta: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.TransferroomSprzedaz).filter(models.TransferroomSprzedaz.id_oferta_sprzedarzy == id_oferta).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Oferta sprzedazy nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                TRANSFERROOM_POSZUKIWANIA
# # =============================================================================

# @app.post("/api/transferroom_poszukiwania/", response_model=schemas.TransferroomPoszukiwaniaRead)
# def create_transferroom_poszukiwania(t: schemas.TransferroomPoszukiwaniaCreate, db: Session = Depends(get_db)):
#     db_obj = models.TransferroomPoszukiwania(**t.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/transferroom_poszukiwania/", response_model=List[schemas.TransferroomPoszukiwaniaRead])
# def read_transferroom_poszukiwania(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.TransferroomPoszukiwania).offset(skip).limit(limit).all()

# @app.get("/api/transferroom_poszukiwania/{id_poszukiwania}", response_model=schemas.TransferroomPoszukiwaniaRead)
# def read_transferroom_poszukiwania_one(id_poszukiwania: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.TransferroomPoszukiwania).filter(models.TransferroomPoszukiwania.id_poszukiwania == id_poszukiwania).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Wpis poszukiwania nie znaleziona")
#     return db_obj

# @app.put("/api/transferroom_poszukiwania/{id_poszukiwania}", response_model=schemas.TransferroomPoszukiwaniaRead)
# def update_transferroom_poszukiwania(id_poszukiwania: int, t: schemas.TransferroomPoszukiwaniaUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.TransferroomPoszukiwania).filter(models.TransferroomPoszukiwania.id_poszukiwania == id_poszukiwania).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Wpis poszukiwania nie znaleziona")
#     for key, val in t.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/transferroom_poszukiwania/{id_poszukiwania}", status_code=204)
# def delete_transferroom_poszukiwania(id_poszukiwania: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.TransferroomPoszukiwania).filter(models.TransferroomPoszukiwania.id_poszukiwania == id_poszukiwania).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Wpis poszukiwania nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                    ZALETA_WADA_PILKARZA
# # =============================================================================

# @app.post("/api/zalety_wady/", response_model=schemas.ZaletaWadaPilkarzaRead)
# def create_zaleta_wada(z: schemas.ZaletaWadaPilkarzaCreate, db: Session = Depends(get_db)):
#     db_obj = models.ZaletaWadaPilkarza(**z.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/zalety_wady/", response_model=List[schemas.ZaletaWadaPilkarzaRead])
# def read_zalety_wady(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.ZaletaWadaPilkarza).offset(skip).limit(limit).all()

# @app.get("/api/zalety_wady/{id_cechy}", response_model=schemas.ZaletaWadaPilkarzaRead)
# def read_zaleta_wada(id_cechy: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.ZaletaWadaPilkarza).filter(models.ZaletaWadaPilkarza.id_cechy == id_cechy).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Cecha nie znaleziona")
#     return db_obj

# @app.put("/api/zalety_wady/{id_cechy}", response_model=schemas.ZaletaWadaPilkarzaRead)
# def update_zaleta_wada(id_cechy: int, z: schemas.ZaletaWadaPilkarzaUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.ZaletaWadaPilkarza).filter(models.ZaletaWadaPilkarza.id_cechy == id_cechy).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Cecha nie znaleziona")
#     for key, val in z.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/zalety_wady/{id_cechy}", status_code=204)
# def delete_zaleta_wada(id_cechy: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.ZaletaWadaPilkarza).filter(models.ZaletaWadaPilkarza.id_cechy == id_cechy).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Cecha nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                           MECZE
# # =============================================================================

# @app.post("/api/mecze/", response_model=schemas.MeczRead)
# def create_mecz(m: schemas.MeczCreate, db: Session = Depends(get_db)):
#     db_obj = models.Mecz(**m.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/mecze/", response_model=List[schemas.MeczRead])
# def read_mecze(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.Mecz).offset(skip).limit(limit).all()

# @app.get("/api/mecze/{id_meczu}", response_model=schemas.MeczRead)
# def read_mecz(id_meczu: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Mecz).filter(models.Mecz.id_meczu == id_meczu).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Mecz nie znaleziony")
#     return db_obj

# @app.put("/api/mecze/{id_meczu}", response_model=schemas.MeczRead)
# def update_mecz(id_meczu: int, m: schemas.MeczUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Mecz).filter(models.Mecz.id_meczu == id_meczu).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Mecz nie znaleziony")
#     for key, val in m.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/mecze/{id_meczu}", status_code=204)
# def delete_mecz(id_meczu: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Mecz).filter(models.Mecz.id_meczu == id_meczu).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Mecz nie znaleziony")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #        MECZ_STATY_GRACZE_MECZU (klucz złożony)
# # =============================================================================

# @app.post("/api/mecz_statystyki_gracze_meczu/", response_model=schemas.MeczStatyGraczeRead)
# def create_mecz_staty_gracze(m: schemas.MeczStatyGraczeCreate, db: Session = Depends(get_db)):
#     db_obj = models.MeczStatyGracze(**m.dict())
#     db.add(db_obj)
#     db.commit()
#     return m

# @app.get("/api/mecz_statystyki_gracze_meczu/", response_model=List[schemas.MeczStatyGraczeRead])
# def read_mecz_staty_gracze(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.MeczStatyGracze).offset(skip).limit(limit).all()

# @app.delete("/api/mecz_statystyki_gracze_meczu/", status_code=204)
# def delete_mecz_staty_gracze(id_meczu: int, id_pilkarza: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.MeczStatyGracze).filter(
#         models.MeczStatyGracze.id_meczu == id_meczu,
#         models.MeczStatyGracze.id_pilkarza == id_pilkarza
#     ).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Statystyki gracza nie znalezione")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #       MECZ_STATY_ZMIANY (klucz złożony)
# # =============================================================================

# @app.post("/api/mecz_statystyki_zmiany/", response_model=schemas.MeczStatyZmianyRead)
# def create_mecz_staty_zmiany(m: schemas.MeczStatyZmianyCreate, db: Session = Depends(get_db)):
#     db_obj = models.MeczStatyZmiany(**m.dict())
#     db.add(db_obj)
#     db.commit()
#     return m

# @app.get("/api/mecz_statystyki_zmiany/", response_model=List[schemas.MeczStatyZmianyRead])
# def read_mecz_staty_zmiany(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.MeczStatyZmiany).offset(skip).limit(limit).all()

# @app.delete("/api/mecz_statystyki_zmiany/", status_code=204)
# def delete_mecz_staty_zmiany(
#     id_meczu: int,
#     id_pilkarza_zchodzi: int,
#     id_pilkarza_wchodzi: int,
#     db: Session = Depends(get_db)
# ):
#     db_obj = db.query(models.MeczStatyZmiany).filter(
#         models.MeczStatyZmiany.id_meczu == id_meczu,
#         models.MeczStatyZmiany.id_pilkarza_zchodzi == id_pilkarza_zchodzi,
#         models.MeczStatyZmiany.id_pilkarza_wchodzi == id_pilkarza_wchodzi
#     ).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Zmiana nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #           MECZ_STATY_WYDARZENIA
# # =============================================================================

# @app.post("/api/mecz_statystyki_wydarzenia/", response_model=schemas.MeczStatyWydarzeniaRead)
# def create_mecz_staty_wydarzenia(m: schemas.MeczStatyWydarzeniaCreate, db: Session = Depends(get_db)):
#     db_obj = models.MeczStatyWydarzenia(**m.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/mecz_statystyki_wydarzenia/", response_model=List[schemas.MeczStatyWydarzeniaRead])
# def read_mecz_staty_wydarzenia(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.MeczStatyWydarzenia).offset(skip).limit(limit).all()

# @app.get("/api/mecz_statystyki_wydarzenia/{id_wydarzenia}", response_model=schemas.MeczStatyWydarzeniaRead)
# def read_mecz_staty_wydarzenia_one(id_wydarzenia: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.MeczStatyWydarzenia).filter(models.MeczStatyWydarzenia.id_wydarzenia == id_wydarzenia).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Wydarzenie nie znaleziona")
#     return db_obj

# @app.put("/api/mecz_statystyki_wydarzenia/{id_wydarzenia}", response_model=schemas.MeczStatyWydarzeniaRead)
# def update_mecz_staty_wydarzenia(id_wydarzenia: int, m: schemas.MeczStatyWydarzeniaUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.MeczStatyWydarzenia).filter(models.MeczStatyWydarzenia.id_wydarzenia == id_wydarzenia).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Wydarzenie nie znaleziona")
#     for key, val in m.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/mecz_statystyki_wydarzenia/{id_wydarzenia}", status_code=204)
# def delete_mecz_staty_wydarzenia(id_wydarzenia: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.MeczStatyWydarzenia).filter(models.MeczStatyWydarzenia.id_wydarzenia == id_wydarzenia).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Wydarzenie nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #      MECZ_STATY_WYDARZENIA_NA_BOISKU
# # =============================================================================

# @app.post("/api/mecz_statystyki_wydarzenia_na_boisku/", response_model=schemas.MeczStatyWydarzeniaNaBoiskuRead)
# def create_mecz_staty_wydarzenia_na_boisku(m: schemas.MeczStatyWydarzeniaNaBoiskuCreate, db: Session = Depends(get_db)):
#     db_obj = models.MeczStatyWydarzeniaNaBoisku(**m.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/mecz_statystyki_wydarzenia_na_boisku/", response_model=List[schemas.MeczStatyWydarzeniaNaBoiskuRead])
# def read_mecz_staty_wydarzenia_na_boisku(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.MeczStatyWydarzeniaNaBoisku).offset(skip).limit(limit).all()

# @app.get("/api/mecz_statystyki_wydarzenia_na_boisku/{id_instancji}", response_model=schemas.MeczStatyWydarzeniaNaBoiskuRead)
# def read_mecz_staty_wydarzenia_na_boisku_one(id_instancji: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.MeczStatyWydarzeniaNaBoisku).filter(models.MeczStatyWydarzeniaNaBoisku.id == id_instancji).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Instancja wydarzenia nie znaleziona")
#     return db_obj

# @app.put("/api/mecz_statystyki_wydarzenia_na_boisku/{id_instancji}", response_model=schemas.MeczStatyWydarzeniaNaBoiskuRead)
# def update_mecz_staty_wydarzenia_na_boisku(id_instancji: int, m: schemas.MeczStatyWydarzeniaNaBoiskuUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.MeczStatyWydarzeniaNaBoisku).filter(models.MeczStatyWydarzeniaNaBoisku.id == id_instancji).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Instancja wydarzenia nie znaleziona")
#     for key, val in m.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/mecz_statystyki_wydarzenia_na_boisku/{id_instancji}", status_code=204)
# def delete_mecz_staty_wydarzenia_na_boisku(id_instancji: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.MeczStatyWydarzeniaNaBoisku).filter(models.MeczStatyWydarzeniaNaBoisku.id == id_instancji).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Instancja wydarzenia nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                         KONTUZJE (klucz złożony)
# # =============================================================================

# @app.post("/api/kontuzje/", response_model=schemas.KontuzjaRead)
# def create_kontuzja(k: schemas.KontuzjaCreate, db: Session = Depends(get_db)):
#     db_obj = models.Kontuzja(**k.dict())
#     db.add(db_obj)
#     db.commit()
#     return k

# @app.get("/api/kontuzje/", response_model=List[schemas.KontuzjaRead])
# def read_kontuzje(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.Kontuzja).offset(skip).limit(limit).all()

# @app.delete("/api/kontuzje/", status_code=204)
# def delete_kontuzja(id_pilkarza: int, data_kontuzji: date, opis_kontuzji: str, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Kontuzja).filter(
#         models.Kontuzja.id_pilkarza == id_pilkarza,
#         models.Kontuzja.data_kontuzji == data_kontuzji,
#         models.Kontuzja.opis_kontuzji == opis_kontuzji,
#     ).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Kontuzja nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                            SKAUCI
# # =============================================================================

# @app.post("/api/skauci/", response_model=schemas.SkautRead)
# def create_skaut(s: schemas.SkautCreate, db: Session = Depends(get_db)):
#     db_obj = models.Skaut(**s.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/skauci/", response_model=List[schemas.SkautRead])
# def read_skauci(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.Skaut).offset(skip).limit(limit).all()

# @app.get("/api/skauci/{id_skauta}", response_model=schemas.SkautRead)
# def read_skaut(id_skauta: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Skaut).filter(models.Skaut.id_skauta == id_skauta).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Skaut nie znaleziona")
#     return db_obj

# @app.put("/api/skauci/{id_skauta}", response_model=schemas.SkautRead)
# def update_skaut(id_skauta: int, s: schemas.SkautUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Skaut).filter(models.Skaut.id_skauta == id_skauta).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Skaut nie znaleziona")
#     for key, val in s.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/skauci/{id_skauta}", status_code=204)
# def delete_skaut(id_skauta: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Skaut).filter(models.Skaut.id_skauta == id_skauta).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Skaut nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #             HISTORIA_SKAUCI_KLUBY (klucz złożony)
# # =============================================================================

# @app.post("/api/historia_skauci_kluby/", response_model=schemas.HistoriaSkautiKlubyRead)
# def create_historia_skauti_kluby(h: schemas.HistoriaSkautiKlubyCreate, db: Session = Depends(get_db)):
#     db_obj = models.HistoriaSkautiKluby(**h.dict())
#     db.add(db_obj)
#     db.commit()
#     return h

# @app.get("/api/historia_skauci_kluby/", response_model=List[schemas.HistoriaSkautiKlubyRead])
# def read_historia_skauci_kluby(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.HistoriaSkautiKluby).offset(skip).limit(limit).all()

# @app.delete("/api/historia_skauci_kluby/", status_code=204)
# def delete_historia_skauci_kluby(
#     id_skauta: int,
#     id_klubu: int,
#     data_rozpoczecia_wspolpracy: date,
#     db: Session = Depends(get_db)
# ):
#     db_obj = db.query(models.HistoriaSkautiKluby).filter(
#         models.HistoriaSkautiKluby.id_skauta == id_skauta,
#         models.HistoriaSkautiKluby.id_klubu == id_klubu,
#         models.HistoriaSkautiKluby.data_rozpoczecia_wspolpracy == data_rozpoczecia_wspolpracy
#     ).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Historia skauta nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                          SKAUT_RAPORT
# # =============================================================================

# @app.post("/api/skaut_raport/", response_model=schemas.SkautRaportRead)
# def create_skaut_raport(r: schemas.SkautRaportCreate, db: Session = Depends(get_db)):
#     db_obj = models.SkautRaport(**r.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/skaut_raport/", response_model=List[schemas.SkautRaportRead])
# def read_skaut_raport(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.SkautRaport).offset(skip).limit(limit).all()

# @app.get("/api/skaut_raport/{id_raportu}", response_model=schemas.SkautRaportRead)
# def read_skaut_raport_one(id_raportu: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.SkautRaport).filter(models.SkautRaport.id_raportu == id_raportu).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Raport nie znaleziona")
#     return db_obj

# @app.put("/api/skaut_raport/{id_raportu}", response_model=schemas.SkautRaportRead)
# def update_skaut_raport(id_raportu: int, r: schemas.SkautRaportUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.SkautRaport).filter(models.SkautRaport.id_raportu == id_raportu).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Raport nie znaleziona")
#     for key, val in r.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/skaut_raport/{id_raportu}", status_code=204)
# def delete_skaut_raport(id_raportu: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.SkautRaport).filter(models.SkautRaport.id_raportu == id_raportu).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Raport nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                            RAPORTY (klucz złożony)
# # =============================================================================

# @app.post("/api/raporty/", response_model=schemas.RaportRead)
# def create_raport(r: schemas.RaportCreate, db: Session = Depends(get_db)):
#     db_obj = models.Raport(**r.dict())
#     db.add(db_obj)
#     db.commit()
#     return r

# @app.get("/api/raporty/", response_model=List[schemas.RaportRead])
# def read_raporty(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.Raport).offset(skip).limit(limit).all()

# @app.delete("/api/raporty/", status_code=204)
# def delete_raport(id_raportu: int, id_zawodnika: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Raport).filter(
#         models.Raport.id_raportu == id_raportu,
#         models.Raport.id_zawodnika == id_zawodnika
#     ).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Raport nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                          LICENCJE
# # =============================================================================

# @app.post("/api/licencje/", response_model=schemas.LicencjaRead)
# def create_licencja(l: schemas.LicencjaCreate, db: Session = Depends(get_db)):
#     db_obj = models.Licencja(**l.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/licencje/", response_model=List[schemas.LicencjaRead])
# def read_licencje(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.Licencja).offset(skip).limit(limit).all()

# @app.get("/api/licencje/{id_licencji}", response_model=schemas.LicencjaRead)
# def read_licencja(id_licencji: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Licencja).filter(models.Licencja.id_licencji == id_licencji).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Licencja nie znaleziona")
#     return db_obj

# @app.put("/api/licencje/{id_licencji}", response_model=schemas.LicencjaRead)
# def update_licencja(id_licencji: int, l: schemas.LicencjaUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Licencja).filter(models.Licencja.id_licencji == id_licencji).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Licencja nie znaleziona")
#     for key, val in l.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/licencje/{id_licencji}", status_code=204)
# def delete_licencja(id_licencji: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Licencja).filter(models.Licencja.id_licencji == id_licencji).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Licencja nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                            MANAGERZY
# # =============================================================================

# @app.post("/api/managerzy/", response_model=schemas.ManagerRead)
# def create_manager(m: schemas.ManagerCreate, db: Session = Depends(get_db)):
#     db_obj = models.Manager(**m.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/managerzy/", response_model=List[schemas.ManagerRead])
# def read_managerzy(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.Manager).offset(skip).limit(limit).all()

# @app.get("/api/managerzy/{id_managera}", response_model=schemas.ManagerRead)
# def read_manager(id_managera: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Manager).filter(models.Manager.id_managera == id_managera).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Manager nie znaleziony")
#     return db_obj

# @app.put("/api/managerzy/{id_managera}", response_model=schemas.ManagerRead)
# def update_manager(id_managera: int, m: schemas.ManagerUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Manager).filter(models.Manager.id_managera == id_managera).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Manager nie znaleziony")
#     for key, val in m.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/managerzy/{id_managera}", status_code=204)
# def delete_manager(id_managera: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Manager).filter(models.Manager.id_managera == id_managera).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Manager nie znaleziony")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                    OFERTY_MANAGEROW
# # =============================================================================

# @app.post("/api/oferty_managerow/", response_model=schemas.OfertaManagerRead)
# def create_oferta_manager(o: schemas.OfertaManagerCreate, db: Session = Depends(get_db)):
#     db_obj = models.OfertaManager(**o.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/oferty_managerow/", response_model=List[schemas.OfertaManagerRead])
# def read_oferty_managerow(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.OfertaManager).offset(skip).limit(limit).all()

# @app.get("/api/oferty_managerow/{id_oferty}", response_model=schemas.OfertaManagerRead)
# def read_oferta_manager(id_oferty: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.OfertaManager).filter(models.OfertaManager.id_oferty_managera == id_oferty).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Oferta managera nie znaleziona")
#     return db_obj

# @app.put("/api/oferty_managerow/{id_oferty}", response_model=schemas.OfertaManagerRead)
# def update_oferta_manager(id_oferty: int, o: schemas.OfertaManagerUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.OfertaManager).filter(models.OfertaManager.id_oferty_managera == id_oferty).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Oferta managera nie znaleziona")
#     for key, val in o.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/oferty_managerow/{id_oferty}", status_code=204)
# def delete_oferta_manager(id_oferty: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.OfertaManager).filter(models.OfertaManager.id_oferty_managera == id_oferty).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Oferta managera nie znaleziona")
#     db.delete(db_obj)
#     db.commit()
#     return {}


# # =============================================================================
# #                            KRAJE
# # =============================================================================

# @app.post("/api/kraje/", response_model=schemas.KrajRead)
# def create_kraj(k: schemas.KrajCreate, db: Session = Depends(get_db)):
#     db_obj = models.Kraj(**k.dict())
#     db.add(db_obj)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.get("/api/kraje/", response_model=List[schemas.KrajRead])
# def read_kraje(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(models.Kraj).offset(skip).limit(limit).all()

# @app.get("/api/kraje/{id_kraju}", response_model=schemas.KrajRead)
# def read_kraj(id_kraju: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Kraj).filter(models.Kraj.id_kraju == id_kraju).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Kraj nie znaleziony")
#     return db_obj

# @app.put("/api/kraje/{id_kraju}", response_model=schemas.KrajRead)
# def update_kraj(id_kraju: int, k: schemas.KrajUpdate, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Kraj).filter(models.Kraj.id_kraju == id_kraju).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Kraj nie znaleziony")
#     for key, val in k.dict(exclude_unset=True).items():
#         setattr(db_obj, key, val)
#     db.commit()
#     db.refresh(db_obj)
#     return db_obj

# @app.delete("/api/kraje/{id_kraju}", status_code=204)
# def delete_kraj(id_kraju: int, db: Session = Depends(get_db)):
#     db_obj = db.query(models.Kraj).filter(models.Kraj.id_kraju == id_kraju).first()
#     if not db_obj:
#         raise HTTPException(status_code=404, detail="Kraj nie znaleziony")
#     db.delete(db_obj)
#     db.commit()
#     return {}

# app/main.py

from datetime import date
from typing import List

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import models, schemas
from .database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FootballTransfersAPI",
    description="API do obsługi bazy Football Transfers (Data Engineering project)",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =============================================================================
#                            PILKARZE
# =============================================================================

@app.post("/api/pilkarze/", response_model=schemas.PilkarzRead)
def create_pilkarz(p: schemas.PilkarzCreate, db: Session = Depends(get_db)):
    db_obj = models.Pilkarz(**p.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/pilkarze/", response_model=List[schemas.PilkarzRead])
def read_pilkarze(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Pilkarz).offset(skip).limit(limit).all()

@app.get("/api/pilkarze/{pilkarz_id}", response_model=schemas.PilkarzRead)
def read_pilkarz(pilkarz_id: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Pilkarz).filter(models.Pilkarz.id_pilkarza == pilkarz_id).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Pilkarz nie znaleziony")
    return db_obj

@app.put("/api/pilkarze/{pilkarz_id}", response_model=schemas.PilkarzRead)
def update_pilkarz(pilkarz_id: int, p: schemas.PilkarzUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.Pilkarz).filter(models.Pilkarz.id_pilkarza == pilkarz_id).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Pilkarz nie znaleziony")
    for key, val in p.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/pilkarze/{pilkarz_id}", status_code=204)
def delete_pilkarz(pilkarz_id: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Pilkarz).filter(models.Pilkarz.id_pilkarza == pilkarz_id).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Pilkarz nie znaleziony")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                            POZYCJE
# =============================================================================

@app.post("/api/pozycje/", response_model=schemas.PozycjaRead)
def create_pozycja(p: schemas.PozycjaCreate, db: Session = Depends(get_db)):
    db_obj = models.Pozycja(**p.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/pozycje/", response_model=List[schemas.PozycjaRead])
def read_pozycje(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Pozycja).offset(skip).limit(limit).all()

@app.get("/api/pozycje/{id_pozycja}", response_model=schemas.PozycjaRead)
def read_pozycja(id_pozycja: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Pozycja).filter(models.Pozycja.id_pozycja == id_pozycja).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Pozycja nie znaleziona")
    return db_obj

@app.put("/api/pozycje/{id_pozycja}", response_model=schemas.PozycjaRead)
def update_pozycja(id_pozycja: int, p: schemas.PozycjaUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.Pozycja).filter(models.Pozycja.id_pozycja == id_pozycja).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Pozycja nie znaleziona")
    for key, val in p.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/pozycje/{id_pozycja}", status_code=204)
def delete_pozycja(id_pozycja: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Pozycja).filter(models.Pozycja.id_pozycja == id_pozycja).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Pozycja nie znaleziona")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                 PILKARZ_POZYCJA (relacja wiele-do-wielu)
# =============================================================================

@app.post("/api/pilkarz_pozycja/", response_model=schemas.PilkarzPozycjaRead)
def create_pilkarz_pozycja(rel: schemas.PilkarzPozycjaCreate, db: Session = Depends(get_db)):
    db_obj = models.PilkarzPozycja(**rel.dict())
    db.add(db_obj)
    db.commit()
    # Nie ma sensu refreshować (brak dodatk. kolumn), ale zwracamy utworzony obiekt
    return db_obj

@app.get("/api/pilkarz_pozycja/", response_model=List[schemas.PilkarzPozycjaRead])
def read_pilkarz_pozycje(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.PilkarzPozycja).offset(skip).limit(limit).all()

@app.delete("/api/pilkarz_pozycja/", status_code=204)
def delete_pilkarz_pozycja(id_pilkarza: int, id_pozycja: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.PilkarzPozycja).filter(
        models.PilkarzPozycja.id_pilkarza == id_pilkarza,
        models.PilkarzPozycja.id_pozycja == id_pozycja
    ).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Relacja nie znaleziona")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                            AGENCI
# =============================================================================

@app.post("/api/agenci/", response_model=schemas.AgentRead)
def create_agent(a: schemas.AgentCreate, db: Session = Depends(get_db)):
    db_obj = models.Agent(**a.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/agenci/", response_model=List[schemas.AgentRead])
def read_agenci(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Agent).offset(skip).limit(limit).all()

@app.get("/api/agenci/{id_agenta}", response_model=schemas.AgentRead)
def read_agent(id_agenta: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Agent).filter(models.Agent.id_agenta == id_agenta).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Agent nie znaleziony")
    return db_obj

@app.put("/api/agenci/{id_agenta}", response_model=schemas.AgentRead)
def update_agent(id_agenta: int, a: schemas.AgentUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.Agent).filter(models.Agent.id_agenta == id_agenta).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Agent nie znaleziony")
    for key, val in a.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/agenci/{id_agenta}", status_code=204)
def delete_agent(id_agenta: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Agent).filter(models.Agent.id_agenta == id_agenta).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Agent nie znaleziony")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                            KLUBY
# =============================================================================

@app.post("/api/kluby/", response_model=schemas.KlubRead)
def create_klub(k: schemas.KlubCreate, db: Session = Depends(get_db)):
    db_obj = models.Klub(**k.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/kluby/", response_model=List[schemas.KlubRead])
def read_kluby(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Klub).offset(skip).limit(limit).all()

@app.get("/api/kluby/{id_klubu}", response_model=schemas.KlubRead)
def read_klub(id_klubu: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Klub).filter(models.Klub.id_klubu == id_klubu).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Klub nie znaleziony")
    return db_obj

@app.put("/api/kluby/{id_klubu}", response_model=schemas.KlubRead)
def update_klub(id_klubu: int, k: schemas.KlubUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.Klub).filter(models.Klub.id_klubu == id_klubu).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Klub nie znaleziony")
    for key, val in k.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/kluby/{id_klubu}", status_code=204)
def delete_klub(id_klubu: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Klub).filter(models.Klub.id_klubu == id_klubu).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Klub nie znaleziony")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                      KLUB_BUDZET (klucz złożony)
# =============================================================================

@app.post("/api/kluby_budzet/", response_model=schemas.KlubBudzetRead)
def create_klub_budzet(kb: schemas.KlubBudzetCreate, db: Session = Depends(get_db)):
    db_obj = models.KlubBudzet(**kb.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/kluby_budzet/", response_model=List[schemas.KlubBudzetRead])
def read_kluby_budzet(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.KlubBudzet).offset(skip).limit(limit).all()

@app.delete("/api/kluby_budzet/", status_code=204)
def delete_klub_budzet(
    id_klubu: int,
    data_dofinansowania: date,
    db: Session = Depends(get_db)
):
    db_obj = db.query(models.KlubBudzet).filter(
        models.KlubBudzet.id_klubu == id_klubu,
        models.KlubBudzet.data_dofinansowania == data_dofinansowania
    ).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Wpis budżetu nie znaleziony")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                         STADIONY
# =============================================================================

@app.post("/api/stadiony/", response_model=schemas.StadionRead)
def create_stadion(s: schemas.StadionCreate, db: Session = Depends(get_db)):
    db_obj = models.Stadion(**s.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/stadiony/", response_model=List[schemas.StadionRead])
def read_stadiony(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Stadion).offset(skip).limit(limit).all()

@app.get("/api/stadiony/{id_stadionu}", response_model=schemas.StadionRead)
def read_stadion(id_stadionu: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Stadion).filter(models.Stadion.id_stadionu == id_stadionu).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Stadion nie znaleziony")
    return db_obj

@app.put("/api/stadiony/{id_stadionu}", response_model=schemas.StadionRead)
def update_stadion(id_stadionu: int, s: schemas.StadionUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.Stadion).filter(models.Stadion.id_stadionu == id_stadionu).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Stadion nie znaleziony")
    for key, val in s.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/stadiony/{id_stadionu}", status_code=204)
def delete_stadion(id_stadionu: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Stadion).filter(models.Stadion.id_stadionu == id_stadionu).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Stadion nie znaleziony")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                  HISTORIA_KLUB_LIGA (klucz złożony)
# =============================================================================

@app.post("/api/historia_klub_liga/", response_model=schemas.HistoriaKlubLigaRead)
def create_historia_klub_liga(h: schemas.HistoriaKlubLigaCreate, db: Session = Depends(get_db)):
    db_obj = models.HistoriaKlubLiga(**h.dict())
    db.add(db_obj)
    db.commit()
    return db_obj

@app.get("/api/historia_klub_liga/", response_model=List[schemas.HistoriaKlubLigaRead])
def read_historia_klub_liga(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.HistoriaKlubLiga).offset(skip).limit(limit).all()

@app.delete("/api/historia_klub_liga/", status_code=204)
def delete_historia_klub_liga(
    id_klubu: int,
    id_ligi: int,
    id_sezonu: int,
    db: Session = Depends(get_db)
):
    db_obj = db.query(models.HistoriaKlubLiga).filter(
        models.HistoriaKlubLiga.id_klubu == id_klubu,
        models.HistoriaKlubLiga.id_ligi == id_ligi,
        models.HistoriaKlubLiga.id_sezonu == id_sezonu
    ).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Historia klub→liga nie znaleziona")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                               SEZONY
# =============================================================================

@app.post("/api/sezony/", response_model=schemas.SezonRead)
def create_sezon(s: schemas.SezonCreate, db: Session = Depends(get_db)):
    db_obj = models.Sezon(**s.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/sezony/", response_model=List[schemas.SezonRead])
def read_sezony(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Sezon).offset(skip).limit(limit).all()

@app.get("/api/sezony/{id_sezonu}", response_model=schemas.SezonRead)
def read_sezon(id_sezonu: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Sezon).filter(models.Sezon.id_sezonu == id_sezonu).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Sezon nie znaleziony")
    return db_obj

@app.put("/api/sezony/{id_sezonu}", response_model=schemas.SezonRead)
def update_sezon(id_sezonu: int, s: schemas.SezonUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.Sezon).filter(models.Sezon.id_sezonu == id_sezonu).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Sezon nie znaleziony")
    for key, val in s.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/sezony/{id_sezonu}", status_code=204)
def delete_sezon(id_sezonu: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Sezon).filter(models.Sezon.id_sezonu == id_sezonu).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Sezon nie znaleziony")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                  HISTORIA_KLUB_SPONSOR (klucz złożony)
# =============================================================================

@app.post("/api/historia_klub_sponsor/", response_model=schemas.HistoriaKlubSponsorRead)
def create_historia_klub_sponsor(h: schemas.HistoriaKlubSponsorCreate, db: Session = Depends(get_db)):
    db_obj = models.HistoriaKlubSponsor(**h.dict())
    db.add(db_obj)
    db.commit()
    return db_obj

@app.get("/api/historia_klub_sponsor/", response_model=List[schemas.HistoriaKlubSponsorRead])
def read_historia_klub_sponsor(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.HistoriaKlubSponsor).offset(skip).limit(limit).all()

@app.delete("/api/historia_klub_sponsor/", status_code=204)
def delete_historia_klub_sponsor(
    id_klubu: int,
    id_sponsora: int,
    data_zawarcia_wspolpracy: date,
    db: Session = Depends(get_db)
):
    db_obj = db.query(models.HistoriaKlubSponsor).filter(
        models.HistoriaKlubSponsor.id_klubu == id_klubu,
        models.HistoriaKlubSponsor.id_sponsora == id_sponsora,
        models.HistoriaKlubSponsor.data_zawarcia_wspolpracy == data_zawarcia_wspolpracy
    ).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Historia sponsorowania nie znaleziona")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                            SPONSORZY
# =============================================================================

@app.post("/api/sponsorzy/", response_model=schemas.SponsorRead)
def create_sponsor(s: schemas.SponsorCreate, db: Session = Depends(get_db)):
    db_obj = models.Sponsor(**s.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/sponsorzy/", response_model=List[schemas.SponsorRead])
def read_sponsorzy(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Sponsor).offset(skip).limit(limit).all()

@app.get("/api/sponsorzy/{id_sponsora}", response_model=schemas.SponsorRead)
def read_sponsor(id_sponsora: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Sponsor).filter(models.Sponsor.id_sponsora == id_sponsora).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Sponsor nie znaleziony")
    return db_obj

@app.put("/api/sponsorzy/{id_sponsora}", response_model=schemas.SponsorRead)
def update_sponsor(id_sponsora: int, s: schemas.SponsorUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.Sponsor).filter(models.Sponsor.id_sponsora == id_sponsora).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Sponsor nie znaleziony")
    for key, val in s.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/sponsorzy/{id_sponsora}", status_code=204)
def delete_sponsor(id_sponsora: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Sponsor).filter(models.Sponsor.id_sponsora == id_sponsora).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Sponsor nie znaleziony")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                              LIGI
# =============================================================================

@app.post("/api/ligi/", response_model=schemas.LigaRead)
def create_liga(l: schemas.LigaCreate, db: Session = Depends(get_db)):
    db_obj = models.Liga(**l.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/ligi/", response_model=List[schemas.LigaRead])
def read_ligi(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Liga).offset(skip).limit(limit).all()

@app.get("/api/ligi/{id_ligi}", response_model=schemas.LigaRead)
def read_liga(id_ligi: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Liga).filter(models.Liga.id_ligi == id_ligi).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Liga nie znaleziona")
    return db_obj

@app.put("/api/ligi/{id_ligi}", response_model=schemas.LigaRead)
def update_liga(id_ligi: int, l: schemas.LigaUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.Liga).filter(models.Liga.id_ligi == id_ligi).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Liga nie znaleziona")
    for key, val in l.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/ligi/{id_ligi}", status_code=204)
def delete_liga(id_ligi: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Liga).filter(models.Liga.id_ligi == id_ligi).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Liga nie znaleziona")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                      OFERTA_KLUB_KLUB
# =============================================================================

@app.post("/api/oferty_transferowe_klub_klub/", response_model=schemas.OfertaKlubKlubRead)
def create_oferta_klub_klub(o: schemas.OfertaKlubKlubCreate, db: Session = Depends(get_db)):
    db_obj = models.OfertaKlubKlub(**o.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/oferty_transferowe_klub_klub/", response_model=List[schemas.OfertaKlubKlubRead])
def read_oferty_klub_klub(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.OfertaKlubKlub).offset(skip).limit(limit).all()

@app.get("/api/oferty_transferowe_klub_klub/{id_oferty}", response_model=schemas.OfertaKlubKlubRead)
def read_oferta_klub_klub(id_oferty: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.OfertaKlubKlub).filter(models.OfertaKlubKlub.id_oferty_dla_klubu == id_oferty).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Oferta klub→klub nie znaleziona")
    return db_obj

@app.put("/api/oferty_transferowe_klub_klub/{id_oferty}", response_model=schemas.OfertaKlubKlubRead)
def update_oferta_klub_klub(id_oferty: int, o: schemas.OfertaKlubKlubUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.OfertaKlubKlub).filter(models.OfertaKlubKlub.id_oferty_dla_klubu == id_oferty).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Oferta klub→klub nie znaleziona")
    for key, val in o.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/oferty_transferowe_klub_klub/{id_oferty}", status_code=204)
def delete_oferta_klub_klub(id_oferty: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.OfertaKlubKlub).filter(models.OfertaKlubKlub.id_oferty_dla_klubu == id_oferty).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Oferta klub→klub nie znaleziona")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                    OFERTA_KLUB_PILKARZ
# =============================================================================

@app.post("/api/oferty_transferowe_klub_pilkarz/", response_model=schemas.OfertaKlubPilkarzRead)
def create_oferta_klub_pilkarz(o: schemas.OfertaKlubPilkarzCreate, db: Session = Depends(get_db)):
    db_obj = models.OfertaKlubPilkarz(**o.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/oferty_transferowe_klub_pilkarz/", response_model=List[schemas.OfertaKlubPilkarzRead])
def read_oferty_klub_pilkarz(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.OfertaKlubPilkarz).offset(skip).limit(limit).all()

@app.get("/api/oferty_transferowe_klub_pilkarz/{id_oferty}", response_model=schemas.OfertaKlubPilkarzRead)
def read_oferta_klub_pilkarz(id_oferty: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.OfertaKlubPilkarz).filter(models.OfertaKlubPilkarz.id_oferty_dla_pilkarza == id_oferty).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Oferta klub→piłkarz nie znaleziona")
    return db_obj

@app.put("/api/oferty_transferowe_klub_pilkarz/{id_oferty}", response_model=schemas.OfertaKlubPilkarzRead)
def update_oferta_klub_pilkarz(id_oferty: int, o: schemas.OfertaKlubPilkarzUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.OfertaKlubPilkarz).filter(models.OfertaKlubPilkarz.id_oferty_dla_pilkarza == id_oferty).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Oferta klub→piłkarz nie znaleziona")
    for key, val in o.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/oferty_transferowe_klub_pilkarz/{id_oferty}", status_code=204)
def delete_oferta_klub_pilkarz(id_oferty: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.OfertaKlubPilkarz).filter(models.OfertaKlubPilkarz.id_oferty_dla_pilkarza == id_oferty).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Oferta klub→piłkarz nie znaleziona")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                 TRANSFERROOM_SPRZEDAZ
# =============================================================================

@app.post("/api/transferroom_sprzedaz/", response_model=schemas.TransferroomSprzedazRead)
def create_transferroom_sprzedaż(t: schemas.TransferroomSprzedazCreate, db: Session = Depends(get_db)):
    db_obj = models.TransferroomSprzedaz(**t.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/transferroom_sprzedaz/", response_model=List[schemas.TransferroomSprzedazRead])
def read_transferroom_sprzedaz(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.TransferroomSprzedaz).offset(skip).limit(limit).all()

@app.get("/api/transferroom_sprzedaz/{id_oferta}", response_model=schemas.TransferroomSprzedazRead)
def read_transferroom_sprzedaz_one(id_oferta: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.TransferroomSprzedaz).filter(models.TransferroomSprzedaz.id_oferta_sprzedarzy == id_oferta).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Oferta sprzedaży nie znaleziona")
    return db_obj

@app.put("/api/transferroom_sprzedaz/{id_oferta}", response_model=schemas.TransferroomSprzedazRead)
def update_transferroom_sprzedaz(id_oferta: int, t: schemas.TransferroomSprzedazUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.TransferroomSprzedaz).filter(models.TransferroomSprzedaz.id_oferta_sprzedarzy == id_oferta).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Oferta sprzedaży nie znaleziona")
    for key, val in t.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/transferroom_sprzedaz/{id_oferta}", status_code=204)
def delete_transferroom_sprzedaz(id_oferta: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.TransferroomSprzedaz).filter(models.TransferroomSprzedaz.id_oferta_sprzedarzy == id_oferta).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Oferta sprzedaży nie znaleziona")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                TRANSFERROOM_POSZUKIWANIA
# =============================================================================

@app.post("/api/transferroom_poszukiwania/", response_model=schemas.TransferroomPoszukiwaniaRead)
def create_transferroom_poszukiwania(t: schemas.TransferroomPoszukiwaniaCreate, db: Session = Depends(get_db)):
    db_obj = models.TransferroomPoszukiwania(**t.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/transferroom_poszukiwania/", response_model=List[schemas.TransferroomPoszukiwaniaRead])
def read_transferroom_poszukiwania(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.TransferroomPoszukiwania).offset(skip).limit(limit).all()

@app.get("/api/transferroom_poszukiwania/{id_poszukiwania}", response_model=schemas.TransferroomPoszukiwaniaRead)
def read_transferroom_poszukiwania_one(id_poszukiwania: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.TransferroomPoszukiwania).filter(models.TransferroomPoszukiwania.id_poszukiwania == id_poszukiwania).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Wpis poszukiwania nie znaleziona")
    return db_obj

@app.put("/api/transferroom_poszukiwania/{id_poszukiwania}", response_model=schemas.TransferroomPoszukiwaniaRead)
def update_transferroom_poszukiwania(id_poszukiwania: int, t: schemas.TransferroomPoszukiwaniaUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.TransferroomPoszukiwania).filter(models.TransferroomPoszukiwania.id_poszukiwania == id_poszukiwania).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Wpis poszukiwania nie znaleziona")
    for key, val in t.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/transferroom_poszukiwania/{id_poszukiwania}", status_code=204)
def delete_transferroom_poszukiwania(id_poszukiwania: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.TransferroomPoszukiwania).filter(models.TransferroomPoszukiwania.id_poszukiwania == id_poszukiwania).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Wpis poszukiwania nie znaleziona")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                    ZALETA_WADA_PILKARZA
# =============================================================================

@app.post("/api/zalety_wady/", response_model=schemas.ZaletaWadaPilkarzaRead)
def create_zaleta_wada(z: schemas.ZaletaWadaPilkarzaCreate, db: Session = Depends(get_db)):
    db_obj = models.ZaletaWadaPilkarza(**z.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/zalety_wady/", response_model=List[schemas.ZaletaWadaPilkarzaRead])
def read_zalety_wady(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.ZaletaWadaPilkarza).offset(skip).limit(limit).all()

@app.get("/api/zalety_wady/{id_cechy}", response_model=schemas.ZaletaWadaPilkarzaRead)
def read_zaleta_wada(id_cechy: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.ZaletaWadaPilkarza).filter(models.ZaletaWadaPilkarza.id_cechy == id_cechy).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Cecha nie znaleziona")
    return db_obj

@app.put("/api/zalety_wady/{id_cechy}", response_model=schemas.ZaletaWadaPilkarzaRead)
def update_zaleta_wada(id_cechy: int, z: schemas.ZaletaWadaPilkarzaUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.ZaletaWadaPilkarza).filter(models.ZaletaWadaPilkarza.id_cechy == id_cechy).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Cecha nie znaleziona")
    for key, val in z.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/zalety_wady/{id_cechy}", status_code=204)
def delete_zaleta_wada(id_cechy: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.ZaletaWadaPilkarza).filter(models.ZaletaWadaPilkarza.id_cechy == id_cechy).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Cecha nie znaleziona")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                           MECZE
# =============================================================================

@app.post("/api/mecze/", response_model=schemas.MeczRead)
def create_mecz(m: schemas.MeczCreate, db: Session = Depends(get_db)):
    db_obj = models.Mecz(**m.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/mecze/", response_model=List[schemas.MeczRead])
def read_mecze(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Mecz).offset(skip).limit(limit).all()

@app.get("/api/mecze/{id_meczu}", response_model=schemas.MeczRead)
def read_mecz(id_meczu: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Mecz).filter(models.Mecz.id_meczu == id_meczu).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Mecz nie znaleziony")
    return db_obj

@app.put("/api/mecze/{id_meczu}", response_model=schemas.MeczRead)
def update_mecz(id_meczu: int, m: schemas.MeczUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.Mecz).filter(models.Mecz.id_meczu == id_meczu).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Mecz nie znaleziony")
    for key, val in m.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/mecze/{id_meczu}", status_code=204)
def delete_mecz(id_meczu: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Mecz).filter(models.Mecz.id_meczu == id_meczu).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Mecz nie znaleziony")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#        MECZ_STATY_GRACZE_MECZU (klucz złożony)
# =============================================================================

@app.post("/api/mecz_statystyki_gracze_meczu/", response_model=schemas.MeczStatyGraczeRead)
def create_mecz_staty_gracze(m: schemas.MeczStatyGraczeCreate, db: Session = Depends(get_db)):
    db_obj = models.MeczStatyGracze(**m.dict())
    db.add(db_obj)
    db.commit()
    return db_obj

@app.get("/api/mecz_statystyki_gracze_meczu/", response_model=List[schemas.MeczStatyGraczeRead])
def read_mecz_staty_gracze(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.MeczStatyGracze).offset(skip).limit(limit).all()

@app.delete("/api/mecz_statystyki_gracze_meczu/", status_code=204)
def delete_mecz_staty_gracze(id_meczu: int, id_pilkarza: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.MeczStatyGracze).filter(
        models.MeczStatyGracze.id_meczu == id_meczu,
        models.MeczStatyGracze.id_pilkarza == id_pilkarza
    ).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Statystyki gracza nie znalezione")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#       MECZ_STATY_ZMIANY (klucz złożony)
# =============================================================================

@app.post("/api/mecz_statystyki_zmiany/", response_model=schemas.MeczStatyZmianyRead)
def create_mecz_staty_zmiany(m: schemas.MeczStatyZmianyCreate, db: Session = Depends(get_db)):
    db_obj = models.MeczStatyZmiany(**m.dict())
    db.add(db_obj)
    db.commit()
    return db_obj

@app.get("/api/mecz_statystyki_zmiany/", response_model=List[schemas.MeczStatyZmianyRead])
def read_mecz_staty_zmiany(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.MeczStatyZmiany).offset(skip).limit(limit).all()

@app.delete("/api/mecz_statystyki_zmiany/", status_code=204)
def delete_mecz_staty_zmiany(
    id_meczu: int,
    id_pilkarza_zchodzi: int,
    id_pilkarza_wchodzi: int,
    db: Session = Depends(get_db)
):
    db_obj = db.query(models.MeczStatyZmiany).filter(
        models.MeczStatyZmiany.id_meczu == id_meczu,
        models.MeczStatyZmiany.id_pilkarza_zchodzi == id_pilkarza_zchodzi,
        models.MeczStatyZmiany.id_pilkarza_wchodzi == id_pilkarza_wchodzi
    ).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Zmiana nie znaleziona")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#           MECZ_STATY_WYDARZENIA
# =============================================================================

@app.post("/api/mecz_statystyki_wydarzenia/", response_model=schemas.MeczStatyWydarzeniaRead)
def create_mecz_staty_wydarzenia(m: schemas.MeczStatyWydarzeniaCreate, db: Session = Depends(get_db)):
    db_obj = models.MeczStatyWydarzenia(**m.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/mecz_statystyki_wydarzenia/", response_model=List[schemas.MeczStatyWydarzeniaRead])
def read_mecz_staty_wydarzenia(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.MeczStatyWydarzenia).offset(skip).limit(limit).all()

@app.get("/api/mecz_statystyki_wydarzenia/{id_wydarzenia}", response_model=schemas.MeczStatyWydarzeniaRead)
def read_mecz_staty_wydarzenia_one(id_wydarzenia: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.MeczStatyWydarzenia).filter(models.MeczStatyWydarzenia.id_wydarzenia == id_wydarzenia).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Wydarzenie nie znalezione")
    return db_obj

@app.put("/api/mecz_statystyki_wydarzenia/{id_wydarzenia}", response_model=schemas.MeczStatyWydarzeniaRead)
def update_mecz_staty_wydarzenia(id_wydarzenia: int, m: schemas.MeczStatyWydarzeniaUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.MeczStatyWydarzenia).filter(models.MeczStatyWydarzenia.id_wydarzenia == id_wydarzenia).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Wydarzenie nie znalezione")
    for key, val in m.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/mecz_statystyki_wydarzenia/{id_wydarzenia}", status_code=204)
def delete_mecz_staty_wydarzenia(id_wydarzenia: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.MeczStatyWydarzenia).filter(models.MeczStatyWydarzenia.id_wydarzenia == id_wydarzenia).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Wydarzenie nie znalezione")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#      MECZ_STATY_WYDARZENIA_NA_BOISKU
# =============================================================================

@app.post("/api/mecz_statystyki_wydarzenia_na_boisku/", response_model=schemas.MeczStatyWydarzeniaNaBoiskuRead)
def create_mecz_staty_wydarzenia_na_boisku(m: schemas.MeczStatyWydarzeniaNaBoiskuCreate, db: Session = Depends(get_db)):
    db_obj = models.MeczStatyWydarzeniaNaBoisku(**m.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/mecz_statystyki_wydarzenia_na_boisku/", response_model=List[schemas.MeczStatyWydarzeniaNaBoiskuRead])
def read_mecz_staty_wydarzenia_na_boisku(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.MeczStatyWydarzeniaNaBoisku).offset(skip).limit(limit).all()

@app.get("/api/mecz_statystyki_wydarzenia_na_boisku/{id_instancji}", response_model=schemas.MeczStatyWydarzeniaNaBoiskuRead)
def read_mecz_staty_wydarzenia_na_boisku_one(id_instancji: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.MeczStatyWydarzeniaNaBoisku).filter(models.MeczStatyWydarzeniaNaBoisku.id == id_instancji).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Instancja wydarzenia nie znaleziona")
    return db_obj

@app.put("/api/mecz_statystyki_wydarzenia_na_boisku/{id_instancji}", response_model=schemas.MeczStatyWydarzeniaNaBoiskuRead)
def update_mecz_staty_wydarzenia_na_boisku(id_instancji: int, m: schemas.MeczStatyWydarzeniaNaBoiskuUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.MeczStatyWydarzeniaNaBoisku).filter(models.MeczStatyWydarzeniaNaBoisku.id == id_instancji).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Instancja wydarzenia nie znaleziona")
    for key, val in m.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/mecz_statystyki_wydarzenia_na_boisku/{id_instancji}", status_code=204)
def delete_mecz_staty_wydarzenia_na_boisku(id_instancji: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.MeczStatyWydarzeniaNaBoisku).filter(models.MeczStatyWydarzeniaNaBoisku.id == id_instancji).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Instancja wydarzenia nie znaleziona")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                         KONTUZJE (klucz złożony)
# =============================================================================

@app.post("/api/kontuzje/", response_model=schemas.KontuzjaRead)
def create_kontuzja(k: schemas.KontuzjaCreate, db: Session = Depends(get_db)):
    db_obj = models.Kontuzja(**k.dict())
    db.add(db_obj)
    db.commit()
    return db_obj

@app.get("/api/kontuzje/", response_model=List[schemas.KontuzjaRead])
def read_kontuzje(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Kontuzja).offset(skip).limit(limit).all()

@app.delete("/api/kontuzje/", status_code=204)
def delete_kontuzja(id_pilkarza: int, data_kontuzji: date, opis_kontuzji: str, db: Session = Depends(get_db)):
    db_obj = db.query(models.Kontuzja).filter(
        models.Kontuzja.id_pilkarza == id_pilkarza,
        models.Kontuzja.data_kontuzji == data_kontuzji,
        models.Kontuzja.opis_kontuzji == opis_kontuzji,
    ).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Kontuzja nie znaleziona")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                            SKAUCI
# =============================================================================

@app.post("/api/skauci/", response_model=schemas.SkautRead)
def create_skaut(s: schemas.SkautCreate, db: Session = Depends(get_db)):
    db_obj = models.Skaut(**s.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/skauci/", response_model=List[schemas.SkautRead])
def read_skauci(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Skaut).offset(skip).limit(limit).all()

@app.get("/api/skauci/{id_skauta}", response_model=schemas.SkautRead)
def read_skaut(id_skauta: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Skaut).filter(models.Skaut.id_skauta == id_skauta).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Skaut nie znaleziony")
    return db_obj

@app.put("/api/skauci/{id_skauta}", response_model=schemas.SkautRead)
def update_skaut(id_skauta: int, s: schemas.SkautUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.Skaut).filter(models.Skaut.id_skauta == id_skauta).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Skaut nie znaleziony")
    for key, val in s.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/skauci/{id_skauta}", status_code=204)
def delete_skaut(id_skauta: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Skaut).filter(models.Skaut.id_skauta == id_skauta).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Skaut nie znaleziony")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#             HISTORIA_SKAUCI_KLUBY (klucz złożony)
# =============================================================================

@app.post("/api/historia_skauci_kluby/", response_model=schemas.HistoriaSkautiKlubyRead)
def create_historia_skauti_kluby(h: schemas.HistoriaSkautiKlubyCreate, db: Session = Depends(get_db)):
    db_obj = models.HistoriaSkautiKluby(**h.dict())
    db.add(db_obj)
    db.commit()
    return db_obj

@app.get("/api/historia_skauci_kluby/", response_model=List[schemas.HistoriaSkautiKlubyRead])
def read_historia_skauci_kluby(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.HistoriaSkautiKluby).offset(skip).limit(limit).all()

@app.delete("/api/historia_skauci_kluby/", status_code=204)
def delete_historia_skauci_kluby(
    id_skauta: int,
    id_klubu: int,
    data_rozpoczecia_wspolpracy: date,
    db: Session = Depends(get_db)
):
    db_obj = db.query(models.HistoriaSkautiKluby).filter(
        models.HistoriaSkautiKluby.id_skauta == id_skauta,
        models.HistoriaSkautiKluby.id_klubu == id_klubu,
        models.HistoriaSkautiKluby.data_rozpoczecia_wspolpracy == data_rozpoczecia_wspolpracy
    ).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Historia skauta nie znaleziona")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                          SKAUT_RAPORT
# =============================================================================

@app.post("/api/skaut_raport/", response_model=schemas.SkautRaportRead)
def create_skaut_raport(r: schemas.SkautRaportCreate, db: Session = Depends(get_db)):
    db_obj = models.SkautRaport(**r.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/skaut_raport/", response_model=List[schemas.SkautRaportRead])
def read_skaut_raport(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.SkautRaport).offset(skip).limit(limit).all()

@app.get("/api/skaut_raport/{id_raportu}", response_model=schemas.SkautRaportRead)
def read_skaut_raport_one(id_raportu: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.SkautRaport).filter(models.SkautRaport.id_raportu == id_raportu).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Raport nie znaleziony")
    return db_obj

@app.put("/api/skaut_raport/{id_raportu}", response_model=schemas.SkautRaportRead)
def update_skaut_raport(id_raportu: int, r: schemas.SkautRaportUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.SkautRaport).filter(models.SkautRaport.id_raportu == id_raportu).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Raport nie znaleziony")
    for key, val in r.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/skaut_raport/{id_raportu}", status_code=204)
def delete_skaut_raport(id_raportu: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.SkautRaport).filter(models.SkautRaport.id_raportu == id_raportu).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Raport nie znaleziony")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                            RAPORTY (klucz złożony)
# =============================================================================

@app.post("/api/raporty/", response_model=schemas.RaportRead)
def create_raport(r: schemas.RaportCreate, db: Session = Depends(get_db)):
    db_obj = models.Raport(**r.dict())
    db.add(db_obj)
    db.commit()
    return db_obj

@app.get("/api/raporty/", response_model=List[schemas.RaportRead])
def read_raporty(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Raport).offset(skip).limit(limit).all()

@app.delete("/api/raporty/", status_code=204)
def delete_raport(id_raportu: int, id_zawodnika: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Raport).filter(
        models.Raport.id_raportu == id_raportu,
        models.Raport.id_zawodnika == id_zawodnika
    ).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Raport nie znaleziony")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                          LICENCJE
# =============================================================================

@app.post("/api/licencje/", response_model=schemas.LicencjaRead)
def create_licencja(l: schemas.LicencjaCreate, db: Session = Depends(get_db)):
    db_obj = models.Licencja(**l.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/licencje/", response_model=List[schemas.LicencjaRead])
def read_licencje(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Licencja).offset(skip).limit(limit).all()

@app.get("/api/licencje/{id_licencji}", response_model=schemas.LicencjaRead)
def read_licencja(id_licencji: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Licencja).filter(models.Licencja.id_licencji == id_licencji).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Licencja nie znaleziona")
    return db_obj

@app.put("/api/licencje/{id_licencji}", response_model=schemas.LicencjaRead)
def update_licencja(id_licencji: int, l: schemas.LicencjaUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.Licencja).filter(models.Licencja.id_licencji == id_licencji).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Licencja nie znaleziona")
    for key, val in l.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/licencje/{id_licencji}", status_code=204)
def delete_licencja(id_licencji: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Licencja).filter(models.Licencja.id_licencji == id_licencji).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Licencja nie znaleziona")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                            MANAGERZY
# =============================================================================

@app.post("/api/managerzy/", response_model=schemas.ManagerRead)
def create_manager(m: schemas.ManagerCreate, db: Session = Depends(get_db)):
    db_obj = models.Manager(**m.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/managerzy/", response_model=List[schemas.ManagerRead])
def read_managerzy(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Manager).offset(skip).limit(limit).all()

@app.get("/api/managerzy/{id_managera}", response_model=schemas.ManagerRead)
def read_manager(id_managera: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Manager).filter(models.Manager.id_managera == id_managera).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Manager nie znaleziony")
    return db_obj

@app.put("/api/managerzy/{id_managera}", response_model=schemas.ManagerRead)
def update_manager(id_managera: int, m: schemas.ManagerUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.Manager).filter(models.Manager.id_managera == id_managera).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Manager nie znaleziony")
    for key, val in m.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/managerzy/{id_managera}", status_code=204)
def delete_manager(id_managera: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Manager).filter(models.Manager.id_managera == id_managera).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Manager nie znaleziony")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                    OFERTY_MANAGEROW
# =============================================================================

@app.post("/api/oferty_managerow/", response_model=schemas.OfertaManagerRead)
def create_oferta_manager(o: schemas.OfertaManagerCreate, db: Session = Depends(get_db)):
    db_obj = models.OfertaManager(**o.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/oferty_managerow/", response_model=List[schemas.OfertaManagerRead])
def read_oferty_managerow(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.OfertaManager).offset(skip).limit(limit).all()

@app.get("/api/oferty_managerow/{id_oferty}", response_model=schemas.OfertaManagerRead)
def read_oferta_manager(id_oferty: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.OfertaManager).filter(models.OfertaManager.id_oferty_managera == id_oferty).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Oferta managera nie znaleziona")
    return db_obj

@app.put("/api/oferty_managerow/{id_oferty}", response_model=schemas.OfertaManagerRead)
def update_oferta_manager(id_oferty: int, o: schemas.OfertaManagerUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.OfertaManager).filter(models.OfertaManager.id_oferty_managera == id_oferty).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Oferta managera nie znaleziona")
    for key, val in o.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/oferty_managerow/{id_oferty}", status_code=204)
def delete_oferta_manager(id_oferty: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.OfertaManager).filter(models.OfertaManager.id_oferty_managera == id_oferty).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Oferta managera nie znaleziona")
    db.delete(db_obj)
    db.commit()
    return {}


# =============================================================================
#                            KRAJE
# =============================================================================

@app.post("/api/kraje/", response_model=schemas.KrajRead)
def create_kraj(k: schemas.KrajCreate, db: Session = Depends(get_db)):
    db_obj = models.Kraj(**k.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.get("/api/kraje/", response_model=List[schemas.KrajRead])
def read_kraje(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Kraj).offset(skip).limit(limit).all()

@app.get("/api/kraje/{id_kraju}", response_model=schemas.KrajRead)
def read_kraj(id_kraju: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Kraj).filter(models.Kraj.id_kraju == id_kraju).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Kraj nie znaleziony")
    return db_obj

@app.put("/api/kraje/{id_kraju}", response_model=schemas.KrajRead)
def update_kraj(id_kraju: int, k: schemas.KrajUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(models.Kraj).filter(models.Kraj.id_kraju == id_kraju).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Kraj nie znaleziony")
    for key, val in k.dict(exclude_unset=True).items():
        setattr(db_obj, key, val)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/api/kraje/{id_kraju}", status_code=204)
def delete_kraj(id_kraju: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Kraj).filter(models.Kraj.id_kraju == id_kraju).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Kraj nie znaleziony")
    db.delete(db_obj)
    db.commit()
    return {}

