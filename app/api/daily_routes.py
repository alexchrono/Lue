from flask import Blueprint, jsonify,request
from flask_login import login_required
from app.models import User,Habit,db,Daily
from flask_login import current_user
from icecream import ic
from datetime import datetime

daily_routes = Blueprint('dailies', __name__)


def custError(errors,field,message):
    errors[field]=message
    return errors


@daily_routes.route('/get-all-users-dailies',methods=['GET'])
def getAllDailies():
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
def makeNewDaily():
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


@daily_routes.route('/edit-daily', methods=['POST'])
def editDaily():
    errors={}
    ic('inside our edit DAILY route')
    data=request.json
    ic(data)
    id=data.get('dailyId')
    ic(id)
    title=data.get('title')
    ic(title)
    notes=data.get('notes')
    ic(notes)
    difficulty=data.get('difficulty')
    ic(difficulty)
    resetRateNumbers=data.get('repeatRateNumbers')
    ic(resetRateNumbers)
    ourTimeFrame=data.get('repeatTimeFrame')
    ic(ourTimeFrame)
    startDate=data.get('startDate')
    ic(startDate)
    target=Daily.query.get(id)
    ic(target)

    if len(data.get('title'))<3 or len(data.get('title'))>30:
        custError(errors,'title','title must be between 3 and 30 characters')
    if not data.get('difficulty'):
        custError(errors,'difficulty','difficulty is required.')
    if target:
        target.title=data.get('title')
        target.notes=data.get('notes')
        target.difficulty=data.get('difficulty')
        if startDate:
            target.start_date = datetime.strptime(startDate, '%Y-%m-%d').date()

        target.repeat_time_frame=data.get('repeatTimeFrame')
        target.repeat_quantity=data.get('repeatRateNumbers')
        target.updated_at = datetime.utcnow()
        db.session.commit()

        return target.to_dict()
        return {"test": "7"}

    return {"test": "7"}

@daily_routes.route('/delete-daily', methods=['POST'])
def deleteDaily():
    ic('inside our DELETE daily route')
    data=request.json
    targetId=data.get('targetId')
    ic(data)
    ic(targetId)
    targetDeletion=Daily.query.get(int(targetId))
    ic(targetDeletion)

    if targetDeletion is None:
        return {'errors': {'error':'daily not found'}}, 404
    copyTargetDeletion=targetDeletion.to_dict()
    db.session.delete(targetDeletion)
    db.session.commit()
    ic(copyTargetDeletion)
    return {"targetDeletion":int(targetId)}
    # elif album.user_owner != current_user.id:
    #     return {'errors': {'error':'forbidden'}}, 403
