from flask import Blueprint, jsonify,request
from flask_login import login_required
from app.models import User,Habit,db,Daily
from flask_login import current_user
from icecream import ic
from datetime import datetime

daily_routes = Blueprint('dailies', __name__)


def custError(err,field,message):
    if 'errors' not in err:
        err["errors"]={}
    err["errors"][field]=message
    return err


@daily_routes.route('/get-all-users-dailies',methods=['GET'])
def getAllDailies():
    currentUserObj=User.query.get(current_user.id)
        # ic(currentUserObj)
        # ic(currentUserObj.users_habits)
    if not currentUserObj:
        return {'message':'there was an error'}

    updated_dailies=[daily.to_dict() for daily in currentUserObj.users_dailies]
    current_user.set_habits_and_dailies()
    updated_dailies_array=currentUserObj.users_dailies_array[:]

    print('RIGHT BEFORE RETURNING in route UPDATED DAILIES IS',updated_dailies)
    # print('RIGHT BEFORE RETURNING in routeNEW H ABIT IS',new_habit)
        # ,"upd_list":upd_habit_list}
    return {'all_dailies': updated_dailies,'arrayDailies': updated_dailies_array}




@daily_routes.route('/new-daily', methods=['POST'])
def makeNewDaily():
    err = {}
    data = request.json
    daily_title = data.get('daily')

    if not daily_title or len(daily_title) < 3 or len(daily_title) > 30:
        custError(err, 'title', 'Daily Title is required and must be between 3 and 30 characters')
        if 'errors' in err:
            return jsonify(err), 400
    ic(current_user.users_dailies)
    new_daily = Daily(
        title=daily_title,
        user_id=current_user.id,
        untouched=True,
        position=0
    )
    db.session.add(new_daily)
    db.session.commit()

    for daily in current_user.users_dailies:
        ic(daily.position)
        daily.position=daily.position+1
    db.session.commit()


    current_user.set_habits_and_dailies()


    ourGuyDict = current_user.to_dict()
    updatedArray = ourGuyDict.get("usersDailiesArray")
    updatedObj= ourGuyDict.get("usersDailiesObj")

    return jsonify({"newArray": updatedArray, "dailiesObj": updatedObj})
    #should i also return user here? or is backfill sufficient? lets test it

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
    err={}
    data=request.json
    id=data.get('dailyId')
    ic(id)
    title=data.get('title')
    notes=data.get('notes')
    difficulty=int(data.get('difficulty'))
    ic(difficulty)
    resetRateNumbers=data.get('repeatRateNumbers')
    ic(resetRateNumbers)
    ourTimeFrame=data.get('repeatTimeFrame')
    startDate=data.get('startDate')

    if not title or len(title) < 3 or len(title) > 30:
        custError(err, 'title', 'Title is required and must be between 3 and 30 characters')
    if difficulty not in [1, 2, 3, 4]:
        custError(err, 'difficulty', 'Difficulty field is required. Please enter valid selection from dropdown')
    if ourTimeFrame =='' or ourTimeFrame not in ['daily', 'weekly', 'monthly']:
        custError(err, 'repeatTimeFrame', 'Please choose how often this should occur')
    if not startDate:
        custError(err,'startDate','startDate is required')
    if resetRateNumbers==None or resetRateNumbers<=0 or resetRateNumbers>=21:
        custError(err,'repeatQuantity','Repeat quantity must be a number from 1 to 20.')
    if 'errors' in err:


        return jsonify(err), 400

    target=Daily.query.get(id)
    ic(target)

    if target:
        target.title=title
        target.notes=notes
        target.difficulty=difficulty
        target.start_date = datetime.strptime(startDate, '%Y-%m-%d').date()

        target.repeat_time_frame=ourTimeFrame
        target.repeat_quantity=resetRateNumbers
        target.updated_at = datetime.utcnow()
        target.untouched = False
        db.session.commit()

        return target.to_dict()


    return jsonify({"error":"The Daily could not be found"}),400

@daily_routes.route('/delete-daily/<int:id>', methods=['DELETE'])
def deleteDaily(id):
    ic('inside our DELETE daily route')
    ic(id)
    targetDeletion=Daily.query.get(id)
    ic(targetDeletion)

    if targetDeletion is None:
        return {'errors': {'error':'daily not found'}}, 404
    copyTargetDeletion=targetDeletion.to_dict()
    db.session.delete(targetDeletion)
    db.session.commit()
    ic(copyTargetDeletion)
    return {"targetDeletion":id}
    # elif album.user_owner != current_user.id:
    #     return {'errors': {'error':'forbidden'}}, 403
