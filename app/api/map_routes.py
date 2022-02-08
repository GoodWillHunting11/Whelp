from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Business, Category, Photo, Map, db, Review, User
from app.forms import NewBusinessForm
import os
import requests

google_api = os.environ.get("GOOGLE_MAP")

map_routes = Blueprint('maps', __name__)

def extract_lat_long(address_or_zipcode):
    formatted_address, lat, lng = None, None, None
    api_key = google_api
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    endpoint = f"{base_url}?address={address_or_zipcode}&key={api_key}"
    r = requests.get(endpoint)
    if r.status_code not in range(200, 299):
        return None, None, None
    try:
        results = r.json()['results'][0]
        formatted_address = results['formatted_address']
        lat = results['geometry']['location']['lat']
        lng = results['geometry']['location']['lng']
    except:
        pass
    return [lat, lng]


@map_routes.route('/new', methods=['POST'])
@login_required
def add_coordinates():
    data = request.json
    query = data['address']
    coordinates = extract_lat_long(query)
    if len(coordinates) > 1:
        lat = coordinates[0]
        long = coordinates[1]
        new_coord = Map(lat=lat, long=long, business_id=data['id'])
        db.session.add(new_coord)
        db.session.commit()
        return { "map":new_coord }
    return "No coordinates"
