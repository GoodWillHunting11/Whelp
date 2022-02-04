from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def validate_email(form, field):
    email = field.data
    if "@" not in email or "." not in email:
        raise ValidationError('Please enter a valid email.')

def validate_zip(form, field):
    zipcode = field.data
    if(not zipcode.isdigit() or len(zipcode) != 5):
        raise ValidationError('Please enter a valid zipcode.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), validate_email, user_exists])
    zipcode = StringField('zipcode', validators=[DataRequired(), validate_zip])
    password = StringField('password', validators=[DataRequired()])
