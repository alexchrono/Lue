from flask import Blueprint, jsonify,request
from flask_login import login_required
from app.models import User,Habit,db,Daily
from flask_login import current_user
from icecream import ic

daily_routes = Blueprint('dailies', __name__)



@daily_routes.route('/get-all-users-dailies',methods=['GET'])
def getAllHabits():
    currentUserObj=User.query.get(current_user.id)
        # ic(currentUserObj)
        # ic(currentUserObj.users_habits)
    if not currentUserObj:
        return {'message':'there was an error'}

    updated_dailies=[daily.to_dict() for daily in currentUserObj.users_dailies]

    print('RIGHT BEFORE RETURNING in route UPDATED DAILIES IS',updated_dailies)
    # print('RIGHT BEFORE RETURNING in routeNEW H ABIT IS',new_habit)
        # ,"upd_list":upd_habit_list}
    return {'all_dailies':updated_dailies}




@daily_routes.route('/new-daily', methods=['POST'])
def makeNewHabit():
    data=request.json
    daily=data.get('daily')


    if daily:

        new_daily= Daily(
            title=daily,
            user_id=current_user.id
        )

        db.session.add(new_daily)
        db.session.commit()

        # currentUserObj=User.query.get(current_user.id)
        # ic(currentUserObj)
        # ic(currentUserObj.users_habits)


        # updated_habits=[hab.to_dict() for hab in currentUserObj.users_habits]

        # print('RIGHT BEFORE RETURNING in route UPDATED HABITS IS',updated_habits)
        # print('RIGHT BEFORE RETURNING in routeNEW H ABIT IS',new_habit)
        # ,"upd_list":upd_habit_list}
        return new_daily.to_dict()
    #should i also return user here? or is backfill sufficient? lets test it

    return {"test": "7"}
# @daily_routes.route('/new-habit', methods=['POST'])
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


@daily_routes.route('/edit-habit', methods=['POST'])
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

@daily_routes.route('/delete-habit', methods=['POST'])
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
