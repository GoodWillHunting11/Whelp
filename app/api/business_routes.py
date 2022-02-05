from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Business, Category, Photo, Map, db
from sqlalchemy.orm import joinedload

business_routes = Blueprint('businesses', __name__)


@business_routes.route('/', methods=['GET'])
# @login_required
def all_businesses():
    business_data = Business.query \
                                .options(joinedload(Business.photos_business)) \
                                .options(joinedload(Business.reviews)) \
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
             "rating": each.rating,
             "review": each.review,
             "user_id": each.user_id,
             "business_id": each.business_id,
             "created": each.time_created,
             "updated": each.time_updated
         }
         data.append(review_set)
    return data


@business_routes.route('/new', methods=['POST'])
# @login_required
def create_business():
    data = request.json
    business = Business(**data)
    db.session.add(business)
    db.session.commit()
    print(business)
    return to_dict(business)

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

@business_routes.route('/delete', methods=['DELETE'])
# @login_required
def delete_business():
    data = request.json
    remove = Business.query.get(data['id'])
    db.session.delete(remove)
    db.session.commit()
    return to_dict(remove)
