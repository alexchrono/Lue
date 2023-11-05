from flask import Blueprint, jsonify,request
from flask_login import login_required
from app.models import User,Habit
from icecream import ic

habit_routes = Blueprint('habits', __name__)


@habit_routes.route('/new-habit', methods=['POST'])
def makeNewHabit():
    data=request.json
    habit=data.get('habit')
    ic(habit)

    """
    Query for all users and returns them in a list of user dictionaries
    """
    return {"test": "7"}
