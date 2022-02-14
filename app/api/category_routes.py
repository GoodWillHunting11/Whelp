from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Business, Category, Photo, Map, db, Review, User
from sqlalchemy.orm import joinedload


category_routes = Blueprint('categories', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@category_routes.route('/', methods=['GET'])
def fetch_all():
    all_cats = Category.query.options(joinedload(Category.business).joinedload(Business.photos_business)) \
        .all()
    data = []
    for cat in all_cats:
        print(cat.business)
        business_data = get_business(cat.business)
        each = {
            "id": cat.id,
            "category": cat.name,
            "businesses": business_data
        }
        data.append(each)
    return {"data":data}

def get_business(business):
    data = []
    for each in business:
        photo_data = get_photos(each.photos_business)
        business_set = {
            "id": each.id,
            "name": each.name,
            "address": each.address,
            "city": each.city,
            "state": each.state,
            "zipcode": each.zipcode,
            "phone": each.phone,
            "website": each.website,
            "photos": photo_data
        }
        data.append(business_set)
    return data

def get_photos(photos):
    data = []
    for each in photos:

        photo_set = {
            "id": each.id,
            "url": each.url,
            "business": each.business_id,
        }
        data.append(photo_set)
    return data
