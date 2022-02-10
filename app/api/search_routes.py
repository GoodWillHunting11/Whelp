# from flask import Blueprint, request, render_template
# from app.models import db, Business
# from app.forms import ReviewForm, EditReviewForm
# from sqlalchemy import desc, func
# from sqlalchemy.orm import joinedload

# search_routes = Blueprint('searches', __name__)

# # def validation_errors_to_error_messages(validation_errors):
# #     """
# #     Simple function that turns the WTForms validation errors into a simple list
# #     """
# #     errorMessages = []
# #     for field in validation_errors:
# #         for error in validation_errors[field]:
# #             errorMessages.append(error)
# #     return errorMessages


# @search_routes.route('/<search_query>', methods=['GET'])
# def get_searches(search_query):
#     searches = Business.query.filter(func.lower(Business.name).like(f'%{search_query.lower()}%'))
#     return {'result': [search.to_dict() for search in searches]}
