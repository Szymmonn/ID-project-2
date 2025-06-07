# backend/app/database.py

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()  # wczytuje zmienne DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS z .env

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "mydb")
DB_USER = os.getenv("DB_USER", "admin")
DB_PASS = os.getenv("DB_PASS", "adminpass")

# Zbuduj URL do bazy w formacie:
# postgresql://<użytkownik>:<hasło>@<host>:<port>/<nazwa_bazy>
SQLALCHEMY_DATABASE_URL = (
    f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

# Tworzymy „engine” SQLAlchemy
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_pre_ping=True,  # opcjonalnie: by sprawdzać, czy połączenie nie jest zamknięte
)

# Każda sesja nie będzie automatycznie commit‐ować ani flushować
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# Baza dla modeli deklaratywnych
Base = declarative_base()

# Dependency dla FastAPI – zwraca sesję i zamyka ją po użyciu
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
