from .db import db

class Map(db.Model):
    __tablename__ = "maps"

    id = db.Column(db.Integer, primary_key=True)
    long = db.Column(db.Float, nullable=False)
    lat = db.Column(db.Float, nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"))

    business = db.relationship("Business", back_populates="maps")
