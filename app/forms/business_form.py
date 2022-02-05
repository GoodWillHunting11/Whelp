from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Business, Category

def validate_zip(form, field):
    zipcode = field.data
    if(not zipcode.isdigit() or len(zipcode) != 5):
        raise ValidationError('Please enter a valid zipcode.')

def validate_phone(form, field):
    phone = field.data
    if(not phone.isdigit() or len(phone) != 10):
        raise ValidationError('Please enter a 10 digit phone number without symbols.')

def validate_web(form, field):
    web = field.data
    if "http" not in web or "." not in web:
        raise ValidationError('Please enter a valid url.')

class NewBusinessForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    zipcode = StringField('zipcode', validators=[DataRequired(), validate_zip])
    phone = StringField('phone', validators=[DataRequired(), validate_phone])
    website = StringField('website', validators=[DataRequired(), validate_web])
    category = SelectField('category', choices=["Parks", "Groomers", "Pet Stores", "Veterinarians", "Walker"], validators=[DataRequired()])
