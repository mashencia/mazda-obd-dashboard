from fastapi import FastAPI, Depends
from database import engine
from models import Trip, Reading
from sqlalchemy.orm import sessionmaker

app = FastAPI()
# Session factory class
Session = sessionmaker(bind=engine)

# Dependency Injection method for the database instance
def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()
@app.get("/trips")

def get_trips(db: Session = Depends(get_db)):
    trips = db.query(Trip).all()
    return trips

