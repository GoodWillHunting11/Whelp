from flask import Blueprint, Response, request
from app.models import db, Review
import json
import datetime


review_routes = Blueprint('reviews', __name__)

@review_routes.route('/', methods=['GET'])
def get_reviews(business_id):
    reviews = Review.query.filter(Review.business_id == business_id).all()

    return {'reviews': [review.to_dict() for review in reviews]}

@review_routes.route('/', methods=['POST'])
def post_review(business_id):
    data = json.loads(request.data)

    new_review = Review(
        rating = data["rating"],
        review = data["review"],
        user_id = data["user_id"],
        business_id = data["business_id"],
    )

    db.session.add(new_review)

    db.session.commit()

    return 'test post'

@review_routes.route('/<int:review_id>', methods=["PATCH"])
def edit_review(business_id, review_id):
    data = json.loads(request.data)

    review_to_update = Review.query.filter(Review.id == review_id).one()

    review_to_update.rating = data["rating"]
    review_to_update.review = data["review"]
    review_to_update.time_updated = datetime.datetime.now()

    db.session.commit()

    return 'test patch'
