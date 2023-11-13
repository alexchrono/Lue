from flask import Blueprint, jsonify,request
from flask_login import login_required
from app.models import User,Habit,db
from flask_login import current_user
from icecream import ic
from datetime import datetime

habit_routes = Blueprint('habits', __name__)

def custError(err,field,message):
    if 'errors' not in err:
        err["errors"]={}
    err["errors"][field]=message
    return err

@habit_routes.route('/get-all-users-habits',methods=['GET'])
def getAllHabits():
    currentUserObj=User.query.get(current_user.id)
        # ic(currentUserObj)
        # ic(currentUserObj.users_habits)
    if not currentUserObj:
        return {'message':'there was an error'}

    updated_habits=[hab.to_dict() for hab in currentUserObj.users_habits]
    current_user.set_habits_and_dailies()
    updated_habits_array=currentUserObj.users_habits_array[:]

    print('RIGHT BEFORE RETURNING in route UPDATED HABITS IS',updated_habits)
    # print('RIGHT BEFORE RETURNING in routeNEW H ABIT IS',new_habit)
        # ,"upd_list":upd_habit_list}
    return {'all_habits':updated_habits,'arrayHabits':updated_habits_array}




# @habit_routes.route('/new-habit', methods=['POST'])
# def makeNewHabit():
#     err = {}
#     data = request.json
#     habit_title = data.get('habit')
#     ic(habit_title)

#     if not habit_title or len(habit_title) < 3 or len(habit_title) > 30:
#         custError(err, 'title', 'Habit Title is required and must be between 3 and 30 characters')

#     if 'errors' in err:
#         return jsonify(err), 400

#     new_habit = Habit(
#         title=habit_title,
#         user_id=current_user.id,
#         untouched=True,
#         position=0
#     )
#     db.session.add(new_habit)
#     db.session.commit()

#     for habit in current_user.users_habits:
#         habit.position += 1

#     db.session.commit()

#     current_user.set_habits_and_dailies()

#     ourGuyDict = current_user.to_dict()
#     updatedArray = ourGuyDict.get("usersHabitsArray")

#     return jsonify({"newHabit": new_habit.to_dict(), "newArray": updatedArray})


@habit_routes.route('/new-habit', methods=['POST'])
def makeNewHabit():
    err = {}
    data = request.json
    habit_title = data.get('habit')

    if not habit_title or len(habit_title) < 3 or len(habit_title) > 30:
        custError(err, 'title', 'Habit Title is required and must be between 3 and 30 characters')

    if 'errors' in err:
        return jsonify(err), 400

    new_habit = Habit(
        title=habit_title,
        user_id=current_user.id,
        untouched=True,
        position=0
    )
    db.session.add(new_habit)
    db.session.commit()

    for habit in current_user.users_habits:
            habit.position=habit.position+1

    db.session.commit()

    current_user.set_habits_and_dailies()

    ourGuyDict = current_user.to_dict()
    updatedArray = ourGuyDict.get("usersHabitsArray")
    updatedObj= ourGuyDict.get("usersHabitsObj")



    return jsonify({ "newArray": updatedArray,'habitsObj':updatedObj})

    #should i also return user here? or is backfill sufficient? lets test it


# @habit_routes.route('/new-habit', methods=['POST'])
# def makeNewHabit():
#     data=request.json
#     habit=data.get('habit')


#     if habit:

#         new_habit= Habit(
#             title=habit,
#             user_id=current_user.id
#         )

#         db.session.add(new_habit)
#         db.session.commit()
#         updated_habits=[hab.to_dict() for hab in Habit.query.all()]
#         # ,"upd_list":upd_habit_list}
#         return {'all_habits':updated_habits,'new_habit':new_habit.to_dict()}

#     return {"test": "7"}


@habit_routes.route('/edit-habit', methods=['POST'])
def editHabit():
    err = {}
    data = request.json

    title = data.get('title')
    difficulty = int(data.get('difficulty'))
    alignment = data.get('alignment')
    reset_rate = data.get('resetRate')
    habit_id = data.get('habitId')
    notes = data.get('notes')


    if not title or len(title) < 3 or len(title) > 30:
        custError(err, 'title', 'Title is required and must be between 3 and 30 characters')
    if difficulty not in [1, 2, 3, 4]:
        custError(err, 'difficulty', 'Difficulty field is required. Please enter valid selection from dropdown')
    if alignment not in [True, False]:
        custError(err, 'alignment', 'Please choose whether this is a good or bad habit')
    if reset_rate not in ['daily', 'weekly', 'monthly']:
        custError(err, 'resetRate', 'Please choose how often to reset the counter')
    if 'errors' in err:


        return jsonify(err), 400
    target = Habit.query.get(habit_id)
    if target:
        target.title = title
        target.notes = notes
        target.difficulty = difficulty
        target.reset_rate = reset_rate
        target.alignment = alignment
        target.updated_at = datetime.utcnow()
        target.untouched = False

        db.session.commit()
        return target.to_dict()

    return jsonify({"error":"The Habit could not be found"}),400

@habit_routes.route('/delete-habit/<int:id>', methods=['DELETE'])
def deleteHabit(id):


    targetDeletion=Habit.query.get(id)
    positionOfDeletee=targetDeletion.position


    if targetDeletion is None:
        return {'errors': {'error':'Habit not found'}}, 404
    copyTargetDeletion=targetDeletion.to_dict()
    db.session.delete(targetDeletion)
    db.session.commit()
    for habit in current_user.users_habits:
        if habit.position>positionOfDeletee:
            habit.position=habit.position-1
    db.session.commit()

    current_user.set_habits_and_dailies()
    ourGuyDict=current_user.to_dict()
    updatedObj=ourGuyDict.get('usersHabitsObj')
    updatedArray=ourGuyDict.get("usersHabitsArray")

    return jsonify({"newArray":updatedArray,"habitsObj":updatedObj})
    # elif album.user_owner != current_user.id:
    #     return {'errors': {'error':'forbidden'}}, 403
