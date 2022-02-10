from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField, ValidationError
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    rating = IntegerField('rating', validators=[DataRequired("Please provide a rating between 1 and 5.")])
    review = StringField('review', validators=[DataRequired("Please provide a message for your review.")])
    submit = SubmitField('submit')
