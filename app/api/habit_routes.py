from flask import Blueprint, jsonify,request
from flask_login import login_required
from app.models import User,Habit,db
from flask_login import current_user
from icecream import ic

habit_routes = Blueprint('habits', __name__)


@habit_routes.route('/new-habit', methods=['POST'])
def makeNewHabit():
    data=request.json
    habit=data.get('habit')


    if habit:

        new_habit= Habit(
            title=habit,
            user_id=current_user.id
        )

        db.session.add(new_habit)
        db.session.commit()
        updated_habits=[hab.to_dict() for hab in Habit.query.all()]
        # ,"upd_list":upd_habit_list}
        return {'all_habits':updated_habits,'new_habit':new_habit.to_dict()}









    """
    Query for all users and returns them in a list of user dictionaries
    """
    return {"test": "7"}
