from .db import db

class Map(db.Model):
    __tablename__ = "maps"

    id = db.Column(db.Integer, primary_key=True)
    long = db.Column(db.Float, nullable=False)
    lat = db.Column(db.Float, nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"))

    business = db.relationship("Business", back_populates="maps")
# 43.64390737310643, -116.26617238638737 -Bower Park
# 43.61758299159893, -116.35571014405932 -Puppyland Idaho
# 43.622944710475196, -116.32080095755221 -The Pet Groomers
# 43.48597577968136, -112.07303633056931 -Skyline Animal Hospital
# 43.55697138083378, -116.33631285755372 -The Pet Sitter of Boise
