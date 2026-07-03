import sqlalchemy as sql
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class Trip(Base):
    __tablename__ = "trips"

    # Primary key
    trip_id = sql.Column(sql.Integer, primary_key=True)

    # Relationship to reading
    readings = relationship("Reading", back_populates="trip")

    # PIDs
    avg_rpm = sql.Column(sql.Float)
    avg_vehicle_speed = sql.Column(sql.Float)
    avg_ect = sql.Column(sql.Float)
    avg_maf = sql.Column(sql.Float)
    avg_map_kpa = sql.Column(sql.Float)
    avg_throttle_position = sql.Column(sql.Float)
    avg_o2_sensor = sql.Column(sql.Float)
    avg_fuel_trim = sql.Column(sql.Float)
    avg_ignition_timing_advance = sql.Column(sql.Float)
    avg_iat = sql.Column(sql.Float)

    # Duration factors and date
    start_time = sql.Column(sql.DateTime)
    end_time = sql.Column(sql.DateTime)

class Reading(Base):
    __tablename__ = "readings"

    # Primary key as for reading id
    reading_id = sql.Column(sql.Integer, primary_key=True)

    # Foreign key as for trip id
    trip_id = sql.Column(sql.Integer, sql.ForeignKey('trips.trip_id'))

    # Relationship between trip and reading
    trip = relationship("Trip", back_populates="readings")
    # Timestamp
    timestamp = sql.Column(sql.DateTime)

    # PIDs
    rpm = sql.Column(sql.Float)
    vehicle_speed = sql.Column(sql.Float)
    ect = sql.Column(sql.Float)
    maf = sql.Column(sql.Float)
    map_kpa = sql.Column(sql.Float)
    throttle_position = sql.Column(sql.Float)
    o2_sensor = sql.Column(sql.Float)
    fuel_trim = sql.Column(sql.Float)
    ignition_timing_advance = sql.Column(sql.Float)
    iat = sql.Column(sql.Float)

