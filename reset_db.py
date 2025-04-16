# reset_db.py
from backend.database import Base, engine

# Drops all tables
Base.metadata.drop_all(bind=engine)
print("Dropped all tables.")

# Creates all tables based on your models (including the new 'price' column)
Base.metadata.create_all(bind=engine)
print("Created all tables.")
