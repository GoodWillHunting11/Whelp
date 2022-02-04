from flask import Blueprint, Response
from app.models import Review
import json


review_routes = Blueprint('reviews', __name__)

@review_routes.route('/', methods=['GET'])
def get_reviews(business_id):
    reviews = Review.query.filter(Review.business_id == business_id).all()

    return {'reviews': [review.to_dict() for review in reviews]}

@review_routes.route('/', methods=['POST'])
def post_review():
    new_review = Review()
