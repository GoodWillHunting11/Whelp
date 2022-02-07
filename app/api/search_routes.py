from flask import Blueprint, jsonify
from app.models import Business

search_routes = Blueprint('search', __name__)


@search_routes.route('/searched', method=['POST'])
def search():
    searchForm = SearchForm()
    businesses = models.Business.query
    #Get data from form
    if searchForm.validate_on_submit():
     #Query the db
        businesses = businesses.filter(models.Business.name.like('%' + searchForm.name.data + '%'))
        businesses = businesses.order_by(models.Business.name).all()

        return {'businesses': [business.to_dict() for business in businesses])}

# @app.route('/search', methods=['GET', 'POST'])
# def search():
#     searchForm = searchForm()
#     courses = models.Course.query

#     if searchForm.validate_on_submit():
#         courses = courses.filter(models.Course.name.like('%' + searchForm.courseName.data + '%'))

#     courses = courses.order_by(models.Course.name).all()

#     return render_template('courselist.html', courses = courses)
