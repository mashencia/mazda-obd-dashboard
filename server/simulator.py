import random
from datetime import datetime, timedelta
from sqlalchemy.orm import sessionmaker
from database import engine
from models import Trip, Reading

# Session factory class
Session = sessionmaker(bind=engine)

# Session instance
session = Session()

# PIDs per trip
pids = ["rpm", "vehicle_speed", "ect", "maf", "map_kpa",
        "throttle_position", "o2_sensor", "fuel_trim",
        "ignition_timing_advance", "iat"]

# Insert a trip entity into the session
def insert_trip(start_time, end_time):
    trip = Trip()
    trip.start_time = start_time
    trip.end_time = end_time
    session.add(trip)
    session.commit()

    return trip

def insert_reading(trip, elapsed_seconds):
    reading = Reading()
    reading.timestamp = trip.start_time + timedelta(seconds=elapsed_seconds)
    reading.trip_id = trip.trip_id
    reading.rpm = random.uniform(600, 3000)
    reading.vehicle_speed = random.uniform(1, 140)
    reading.ect = random.uniform(90, 105)
    reading.maf = random.uniform(2, 25)
    reading.map_kpa = random.uniform(20, 50)
    reading.throttle_position = random.uniform(10, 90)
    reading.oxygen = random.uniform(0.1, 0.9)
    reading.fuel_trim = random.uniform(-10, 10)
    reading.ignition_timing_advance = random.uniform(5, 45)
    reading.iat = random.uniform(6, 28)
    session.add(reading)

    return reading.reading_id

def calculate_averages(trip):
    readings = session.query(Reading).filter(Reading.trip_id == trip.trip_id).all()

    for pid in pids:
        setattr(trip, "avg_" + pid ,sum(getattr(reading,pid) for reading in readings)/len(readings))

    session.commit()

def trip_config(start_time, end_time, num_readings=300):
    trip = insert_trip(start_time, end_time)

    for i in range(num_readings):
        insert_reading(trip, i)

    session.commit()
    calculate_averages(trip)

# Entry point
if __name__ == "__main__":
    trip_config(datetime.now(), datetime.now() + timedelta(minutes=5))
