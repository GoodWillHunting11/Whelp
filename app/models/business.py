from .db import db

businesses_categories = db.Table(
    "business_category",
    db.Column("business_id", db.Integer, db.ForeignKey("businesses.id"), primary_key=True),
    db.Column("category_id", db.Integer, db.ForeignKey("categories.id"), primary_key=True)
)


class Business(db.Model):
    __tablename__ = "businesses"
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(25), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    zipcode = db.Column(db.String(15), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    website = db.Column(db.String(255), nullable=False)

    reviews = db.relationship("Review", back_populates="business", cascade='all, delete-orphan')
    maps = db.relationship("Map", back_populates="business", cascade='all, delete-orphan')
    photos_business = db.relationship("Photo", back_populates="business_photo", cascade="all, delete-orphan")
    categories = db.relationship("Category", back_populates="business", secondary=businesses_categories)

class Category(db.Model):
    __tablename__ = "categories"
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

    business = db.relationship("Business", back_populates="categories", secondary=businesses_categories)
