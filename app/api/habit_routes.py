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

    return {"test": "7"}


@habit_routes.route('/edit-habit', methods=['POST'])
def editHabit():
    ic('inside our edit habit route')
    data=request.json
    ic(data)
    id=data.get('habitId')
    title=data.get('title')
    notes=data.get('notes')
    difficulty=data.get('difficulty')
    resetRate=data.get('resetRate')
    alignment=data.get('alignment')
    ic(title)
    ic(notes)
    ic(difficulty)
    ic(resetRate)
    ic(alignment)
    target=Habit.query.get(id)
    ic(target)
    if target:
        target.title=data.get('title')
        target.notes=data.get('notes')
        target.difficulty=data.get('difficulty')
        target.reset_rate=data.get('resetRate')
        target.alignment=data.get('alignment')
        db.session.commit()
        return target.to_dict()

    return {"test": "7"}

@habit_routes.route('/delete-habit', methods=['POST'])
def deleteHabit():
    ic('inside our DELETE habit route')
    data=request.json
    targetId=data.get('targetId')
    ic(data)
    ic(targetId)
    targetDeletion=Habit.query.get(id)

    if targetDeletion is None:
        return {'errors': {'error':'Habit not found'}}, 404
    copyTargetDeletion=targetDeletion.to_dict()
    db.session.delete(targetDeletion)
    db.session.commit()
    return copyTargetDeletion,200
    # elif album.user_owner != current_user.id:
    #     return {'errors': {'error':'forbidden'}}, 403
    
