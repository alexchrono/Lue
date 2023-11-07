from app.models import db,Habit, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import text


habits_list = [
    Habit(
        title='Drink Water',
        notes='Drink atleast 8 glasses of water a day',
        difficulty=1,
        position=1,
        reset_rate='daily',
        alignment=True,
        user_id=1
    ),
    Habit(
        title='Morning Jog',
        notes='Listen to Rocky and hit the streets!',
        difficulty=2,
        position=2,
        reset_rate='daily',
        alignment=True,
        user_id=1
    ),
    Habit(
        title='Skip Breakfast',
        notes='I need to stop skipping breakfast',
        difficulty=2,
        position=3,
        reset_rate='daily',
        alignment=False, 
        user_id=1
    ),
    Habit(
        title='Late Night Snacking',
        notes='Do not eat after 9 PM.  Im getting fat',
        difficulty=3,
        position=4,
        reset_rate='daily',
        alignment=False,
        user_id=1
    ),
    Habit(
        title='Read Daily',
        notes='Read at least 30 pages',
        difficulty=1,
        position=1,
        reset_rate='daily',
        alignment=True,
        user_id=2
    ),
    Habit(
        title='Meditate',
        notes='Meditate each morning for 10 minutes',
        difficulty=1,
        position=2,
        reset_rate='daily',
        alignment=True,
        user_id=2
    ),
    Habit(
        title='Fast Food',
        notes='Limit fast food- only once a week',
        difficulty=3,
        position=3,
        reset_rate='weekly',
        alignment=False,
        user_id=2
    ),
    Habit(
        title='Screen Time before Bed',
        notes='No screen time after 8 pm',
        difficulty=2,
        position=4,
        reset_rate='daily',
        alignment=False,
        user_id=2
    ),
    Habit(
        title='Practice Instrument',
        notes='Practice guitar for atleast an hour',
        difficulty=2,
        position=1,
        reset_rate='daily',
        alignment=True,
        user_id=3
    ),
    Habit(
        title='Study Sessions',
        notes='Study for 1 hour...no distractions!',
        difficulty=3,
        position=2,
        reset_rate='daily',
        alignment=True,
        user_id=3
    ),
    Habit(
        title='Binge Watching',
        notes='Avoid binge-watching TV shows',
        difficulty=4,
        position=3,
        reset_rate='weekly',
        alignment=False,
        user_id=3
    ),
    Habit(
        title='Smoking Breaks',
        notes='Cut down on smoking breaks during work',
        difficulty=4,
        position=4,
        reset_rate='daily',
        alignment=False,
        user_id=3
    )

]

def seed_habits():
    db.session.add_all(habits_list)
    db.session.commit()

def undo_habits():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.habits RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM habits"))

    db.session.commit()
