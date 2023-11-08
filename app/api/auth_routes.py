from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from icecream import ic
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename,remove_file_from_s3
from decimal import Decimal

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    ic(form.data)
    if form.validate_on_submit():
        ic('atleast inside validate')
        url='https://i.imgur.com/V26j32L.png'
        if form.data['selected_avatar']:
            image=form.data['selected_avatar']
            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return { 'errors': validation_errors_to_error_messages(form.errors) }, 400
            url=upload['url']
        user = User(
                username=form.data['username'],
                email=form.data['email'],
                password=form.data['password'],
                selected_avatar=url

            )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/edit-health-or-exp', methods=['POST'])
def editHealth():
    ic('DID WE EVEN HIT OUR ROUTE')
    data2= request.json
    ic(data2)
    data=data2.get("healthOrExp")
    ic(data)
    if (data.get('health')):
        health=Decimal(data.get('health'))
        if current_user:
            current_user.health= (current_user.health+health)
            db.session.commit()
            return current_user.to_dict()
        else:
            return jsonify({"error":"There was an error while updating your health"}),400
    elif (data.get('gold')):
        gold=data.get('gold')
        exp=data.get('exp')
        if current_user:
            current_user.gold= (current_user.gold+gold)
            current_user.exp= (current_user.exp+exp)
            db.session.commit()
            return current_user.to_dict()
        else:
            return jsonify({"error":"There was an error while updating your Gold and exp"}),400

@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
