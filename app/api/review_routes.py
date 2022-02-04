from flask import Blueprint


review_routes = Blueprint('reviews', __name__)

@review_routes.route('/')
def get_reviews(business_id):
    return 'THis shit works hOmie'
