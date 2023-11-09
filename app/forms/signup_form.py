from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.api.aws_helpers import ALLOWED_IMG_EXTENSIONS
from app.models import User
import re




def user_exists(form, field):
    # Checking if user exists
    email = field.data
    email_regex= re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')
    user = User.query.filter(User.email == email).first()
    if len(email)<8 or len(email)>30:
        raise ValidationError('Email must be between 8-30 characters.')
    elif not email_regex.match(email):
            raise ValidationError('Invalid email format.')

    elif user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if not username:
        raise ValidationError('Username is required')

    elif len(username) <3 or len(username)>15:
        raise ValidationError('Username must be between 3 and 15 characters')

    elif user:
        raise ValidationError('Username is already in use.')

def password_validator(form, field):
    password = field.data
    if not password:
        raise ValidationError('Password is required')

    elif len(password) <8 or len(password)>30:
        raise ValidationError('password must be between 8 and 30 characters')

def confirm_password_validator(form, field):
    password = form.password.data
    confirm_password = field.data
    if password != confirm_password:
        raise ValidationError("Password fields do not match")



class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(),password_validator])
    confirm_password= StringField('confirm_password', validators=[DataRequired(),confirm_password_validator])
    selected_avatar = FileField("Avatar Image",validators=[FileAllowed(list(ALLOWED_IMG_EXTENSIONS))])
