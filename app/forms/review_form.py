from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    rating = IntegerField('rating', validators=[DataRequired()])
    review = StringField('review', validators=[DataRequired()])
    url = StringField('url')
    submit = SubmitField('submit')
