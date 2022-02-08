from flask import Blueprint, request
from app.models import db, Photo
# from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

photo_routes = Blueprint("photos", __name__)

@photo_routes.route('/', methods=['GET'])
def index():
    return "hello"

@photo_routes.route("/new", methods=["POST"])
# @login_required
def upload_image():

    data = request.json
    if "photo" not in request.files:
        return {"errors": "photo required"}, 400

    photo = request.files["photo"]

    if not allowed_file(photo.filename):
        return {"errors": "file type not permitted"}, 400

    photo.filename = get_unique_filename(photo.filename)

    upload = upload_file_to_s3(photo)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    user_id = request.form['user_id']
    business_id = request.form['business_id']
    # flask_login allows us to get the current user from the request
    new_image = Photo(user_id=user_id, url=url, business_id=business_id)
    db.session.add(new_image)
    db.session.commit()
    return {"url": url}
