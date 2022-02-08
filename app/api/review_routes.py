from flask import Blueprint, request, render_template
from app.models import db, Review, Photo
from app.forms import ReviewForm, EditReviewForm
from sqlalchemy import desc
from sqlalchemy.orm import joinedload
import json
import datetime

review_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(error)
    return errorMessages

@review_routes.route('/', methods=['GET'])
def get_reviews(business_id):
    reviews = Review.query.options(joinedload(Review.user)).filter(Review.business_id == business_id).order_by(desc(Review.time_created)).all()

    return {'reviews': [{ **review.to_dict(), 'user': review.user.to_dict() } for review in reviews]}


@review_routes.route('/', methods=['POST'])
def post_review(business_id):
    data = request.json
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_review = Review(
            rating = data["rating"],
            review = data["review"],
            user_id = data["userId"],
            business_id = business_id,
        )

        new_photo = Photo(
            url = data["url"],
            user_id = data["userId"],
            business_id = business_id,
        )

        db.session.add(new_review)
        if data["url"]:
            db.session.add(new_photo)

        db.session.commit()

        return data

    return { "errors": validation_errors_to_error_messages(form.errors)}, 401

@review_routes.route('/<int:review_id>', methods=["PATCH"])
def edit_review(business_id, review_id):
    print('do i make it do edit roteffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', review_id)
    data = request.json
    form = EditReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        review_to_update = Review.query.filter(Review.id == review_id).one()

        review_to_update.rating = data["rating"]
        review_to_update.review = data["review"]
        review_to_update.time_updated = datetime.datetime.now()

        db.session.commit()

        return data

    return { "errors": validation_errors_to_error_messages(form.errors)}, 401

@review_routes.route('/<int:review_id>', methods=["DELETE"])
def delete_review(business_id, review_id):
    Review.query.filter(Review.id == review_id).delete()

    db.session.commit()

    return { 'msg': 'Successfully deleted' }
