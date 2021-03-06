from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Business, Category, Photo, Map, db, Review, User
from app.forms import NewBusinessForm
from sqlalchemy.orm import joinedload

business_routes = Blueprint('businesses', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@business_routes.route('/', methods=['GET'])
def all_businesses():
    business_data = Business.query \
                                .options(joinedload(Business.photos_business)) \
                                .options(joinedload(Business.reviews).options(joinedload(Review.user))) \
                                .options(joinedload(Business.maps)) \
                                .options(joinedload(Business.categories)) \
                                .all()
    data = []
    for business in business_data:
        album_data = get_photos(business.photos_business)
        review_data = get_reviews(business.reviews)
        map_data = get_maps(business.maps)
        category_data = get_category(business.categories)

        each = {
            "id": business.id,
            "name": business.name,
            "address": business.address,
            "city": business.city,
            "state": business.state,
            "zipcode": business.zipcode,
            "phone": business.phone,
            "website": business.website,
            "photos": album_data,
            "reviews": review_data,
            "map": map_data,
            "categories": category_data
        }
        data.append(each)
    return {"data": data}

def get_photos(photos):
    data = []
    for each in photos:
         photo_set = {
             "id": each.id,
             "url": each.url,
             "user_id": each.user_id,
             "business_id": each.business_id
         }
         data.append(photo_set)
    return data


def get_category(categories):
    data = []
    for each in categories:
         category_set = {
             "id": each.id,
             "category": each.name,
         }
         data.append(category_set)
    return data

def get_maps(maps):
    data = []
    for each in maps:
         map_set = {
             "long": each.long,
             "lat": each.lat,
             "business_id": each.business_id
         }
         data.append(map_set)
    return data

def get_reviews(reviews):
    data = []
    for each in reviews:
         review_set = {
             "id": each.id,
             "rating": each.rating,
             "review": each.review,
             "user_id": each.user_id,
             "business_id": each.business_id,
             "created": each.time_created,
             "updated": each.time_updated
         }
         data.append(review_set)
    return data


@business_routes.route('/new/', methods=['POST'])
@login_required
def create_business():
    data = request.json
    form = NewBusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        cat = Category.query.filter(Category.name == data['category']).one()
        data.pop('category')
        business = Business(**data)
        business.categories.append(cat)
        db.session.add(business)
        db.session.commit()

        return to_dict(business)

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

def to_dict(self):
    return {
        'id': self.id,
        'name': self.name,
        'address': self.address,
        'city': self.city,
        'state': self.state,
        'zipcode': self.zipcode,
        'phone': self.phone,
        'website': self.website
    }

@business_routes.route('/delete/<int:id>/', methods=['DELETE'])
@login_required
def delete_business(id):
    remove = Business.query.get(id)
    db.session.delete(remove)
    db.session.commit()
    return to_dict(remove)

@business_routes.route('/edit/<int:id>/', methods=['PATCH'])
@login_required
def patch_business(id):
    data = request.json
    form = NewBusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        business = Business.query.get(id)
        business.name = data['name']
        business.address = data['address']
        business.city = data['city']
        business.state = data['state']
        business.zipcode = data['zipcode']
        business.phone = data['phone']
        business.website = data['website']
        db.session.commit()
        return to_dict(business)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
