from fastapi import FastAPI, Depends
from database import engine
from models import Trip, Reading
from sqlalchemy.orm import sessionmaker
from schemas import TripResponse, ReadingResponse
from models import Base

Base.metadata.create_all(engine)
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
@app.get("/trips", response_model=list[TripResponse])
def get_trips(db: Session = Depends(get_db)):
    trips = db.query(Trip).all()
    return trips

@app.get("/trips/{trip_id}/readings", response_model=list[ReadingResponse])
def get_readings(trip_id: int, db: Session = Depends(get_db)):
    readings = db.query(Reading).filter(Reading.trip_id == trip_id).all()
    return readings