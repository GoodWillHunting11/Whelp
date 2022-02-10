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
    all_cats = Category.query.options(joinedload(Category.business)).all()
    data = []
    for cat in all_cats:

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
        business_set = {
            "id": each.id,
            "name": each.name,
            "address": each.address,
            "city": each.city,
            "state": each.state,
            "zipcode": each.zipcode,
            "phone": each.phone,
            "website": each.website
        }
        data.append(business_set)
    return data
