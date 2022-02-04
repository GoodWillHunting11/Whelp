from .db import db
from sqlalchemy import func

class Photo(db.Model):
    __tablename__ = "photos"
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"))
    time_created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    time_updated = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user_photo = db.relationship("User", back_populates="photos_user")
    business_photo = db.relationship("Business", back_populates="photos_business")
