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

    print('RIGHT BEFORE RETURNING in route UPDATED HABITS IS',updated_habits)
    # print('RIGHT BEFORE RETURNING in routeNEW H ABIT IS',new_habit)
        # ,"upd_list":upd_habit_list}
    return {'all_habits':updated_habits}




@habit_routes.route('/new-habit', methods=['POST'])
def makeNewHabit():
    err={}
    data=request.json
    habit=data.get('habit')
    ic(current_user)




    if not habit or len(habit) < 3 or len(habit) > 30:
        custError(err, 'title', 'Title is required and must be between 3 and 30 characters')

    if 'errors' in err:
        return jsonify(err), 400

    if habit:






        new_habit= Habit(
            title=habit,
            user_id=current_user.id,
            untouched=True,
            position=0

        )

        db.session.add(new_habit)
        db.session.commit()


        # currentUserObj=User.query.get(current_user.id)
        # ic(currentUserObj)
        # ic(currentUserObj.users_habits)


        # updated_habits=[hab.to_dict() for hab in currentUserObj.users_habits]

        # print('RIGHT BEFORE RETURNING in route UPDATED HABITS IS',updated_habits)
        # print('RIGHT BEFORE RETURNING in routeNEW H ABIT IS',new_habit)
        # ,"upd_list":upd_habit_list}
        test=current_user.to_dict()
        objToUpdate=test.get('usersHabitsObj')
        ic(objToUpdate)
        for ele in objToUpdate:
            objToUpdate[ele]["position"]+=1
        ic(objToUpdate)
        arrayToUpdate=test.get("usersHabitsArray")
        ic(arrayToUpdate)
        return new_habit.to_dict()
    #should i also return user here? or is backfill sufficient? lets test it

    return jsonify({"error":"There was an error in making the Habit"}),400
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

@habit_routes.route('/delete-habit', methods=['POST'])
def deleteHabit():
    ic('inside our DELETE habit route')
    data=request.json
    targetId=data.get('targetId')
    ic(data)
    ic(targetId)
    targetDeletion=Habit.query.get(int(targetId))
    ic(targetDeletion)

    if targetDeletion is None:
        return {'errors': {'error':'Habit not found'}}, 404
    copyTargetDeletion=targetDeletion.to_dict()
    db.session.delete(targetDeletion)
    db.session.commit()
    ic(copyTargetDeletion)
    return {"targetDeletion":int(targetId)}
    # elif album.user_owner != current_user.id:
    #     return {'errors': {'error':'forbidden'}}, 403
