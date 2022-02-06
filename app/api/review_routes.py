from flask import Blueprint, request, render_template
from app.models import db, Review, Photo
from app.forms import ReviewForm
import json
import datetime


review_routes = Blueprint('reviews', __name__)

@review_routes.route('/', methods=['GET'])
def get_reviews(business_id):
    # form = ReviewForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    reviews = Review.query.filter(Review.business_id == business_id).all()

    return {'reviews': [review.to_dict() for review in reviews]}
    # return render_template('test.html', form=form, business_id=business_id)

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
        db.session.add(new_photo)

        db.session.commit()

    return data

@review_routes.route('/<int:review_id>', methods=["PATCH"])
def edit_review(business_id, review_id):
    form = ReviewForm()

    if form.validate_on_submit:
        data = json.loads(request.data)

        review_to_update = Review.query.filter(Review.id == review_id).one()

        review_to_update.rating = data["rating"]
        review_to_update.review = data["review"]
        review_to_update.time_updated = datetime.datetime.now()

        db.session.commit()

    return 'test patch'

@review_routes.route('/<int:review_id>', methods=["DELETE"])
def delete_review(business_id, review_id):
    Review.query.filter(Review.id == review_id).delete()

    db.session.commit()

    return 'test delete'
