from sqlalchemy import create_engine
from models import Base


engine = create_engine("sqlite:///mazda_obd_data.db")
Base.metadata.create_all(engine)
