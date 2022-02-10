from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Business, Category

stateAbbreviations = [ \
 'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA', \
 'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA', \
 'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND', \
 'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT', \
 'VT','VI','VA','WA','WV','WI','WY' \
]


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

def validate_state(form, field):
    state = field.data
    if(len(state) != 2 or state not in stateAbbreviations):
        raise ValidationError('Please enter a valid state abbreviation.')

class NewBusinessForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired(), validate_state])
    zipcode = StringField('zipcode', validators=[DataRequired(), validate_zip])
    phone = StringField('phone', validators=[DataRequired(), validate_phone])
    website = StringField('website', validators=[DataRequired(), validate_web])
    category = SelectField('category', choices=["Parks", "Groomers", "Pet Stores", "Veterinarians", "Walkers"], validators=[DataRequired()])
