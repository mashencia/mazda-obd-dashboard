from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Trip(BaseModel):
    class Config:
        from_attributes = True
        
    trip_id: int
    avg_rpm: Optional[float] = None
    avg_vehicle_speed: Optional[float] = None
    avg_ect: Optional[float] = None
    avg_maf: Optional[float] = None
    avg_map_kpa: Optional[float] = None
    avg_throttle_position: Optional[float] = None
    avg_o2_sensor: Optional[float] = None
    avg_fuel_trim: Optional[float] = None
    avg_ignition_timing_advance: Optional[float] = None
    avg_iat: Optional[float] = None

    # Duration factors and date
    start_time: datetime
    end_time: datetime