from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Business, Category, Photo, Map
from sqlalchemy.orm import joinedload

business_routes = Blueprint('businesses', __name__)


@business_routes.route('/')
@login_required
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
