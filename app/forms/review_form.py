from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField, ValidationError
from wtforms.validators import DataRequired, URL, Optional


class ReviewForm(FlaskForm):
    rating = IntegerField('rating', validators=[DataRequired("Please provide a rating between 1 and 5.")])
    review = StringField('review', validators=[DataRequired("Please provide a message for your review.")])
    url = StringField('url', validators=[Optional(), URL(False, "Please provide a valid URL.")])
    submit = SubmitField('submit')
