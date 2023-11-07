from app.models import db,Daily,environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import text
from datetime import date

dailies_list = [
    Daily(
        title='Stretching Routine',
        notes='Do a 10-minute stretching routine in the morning',
        position=1,
        difficulty=1,
        start_date=date(2023, 11, 5),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Study',
        notes='Study coding for 1 hour',
        position=2,
        difficulty=2,
        start_date=date(2023, 11, 5),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Walk the Dog',
        notes='walk in the park with the dog',
        position=3,
        difficulty=1,
        start_date=date(2023, 11, 5),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Play Piano',
        notes='Practice piano for 30 minutes',
        position=4,
        difficulty=3,
        start_date=date(2023, 11, 5),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Check Emails',
        notes='Clear inbox and respond to urgent emails',
        position=5,
        difficulty=1,
        start_date=date(2023, 11, 5),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Prepare Meals',
        notes='Prepare healthy meals for the next day',
        position=6,
        difficulty=2,
        start_date=date(2023, 11, 5),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Morning Yoga',
        notes='Start the day with 15 minutes of yoga',
        position=1,
        difficulty=2,
        start_date=date(2023, 11, 5),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=2
    ),
    Daily(
        title='Learn Guitar',
        notes='Practice chords and songs for 20 minutes',
        position=2,
        difficulty=3,
        start_date=date(2023, 11, 5),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=2
    ),
    Daily(
        title='Read Novel',
        notes='Read for at least 30 minutes before bed',
        position=3,
        difficulty=1,
        start_date=date(2023, 11, 5),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=2
    ),
    Daily(
        title='Practice Spanish',
        notes='Spend 20 minutes on spanish dict',
        position=4,
        difficulty=2,
        start_date=date(2023, 11, 5),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=2
    ),
    Daily(
        title='Meditation',
        notes='Meditate each morning',
        position=5,
        difficulty=1,
        start_date=date(2023, 11, 5),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=2
    ),
    Daily(
        title='Budget Review',
        notes='Check and update your finances',
        position=6,
        difficulty=3,
        start_date=date(2023, 11, 5),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=2
    ),
    Daily(
        title='Exercise Routine',
        notes='Do 30 minutes on the exercise bike',
        position=1,
        difficulty=3,
        start_date=date(2023, 11, 5),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=3
    ),
    Daily(
        title='Coding Practice',
        notes='Code for 1 hour on personal projects',
        position=2,
        difficulty=2,
        start_date=date(2023, 11, 5),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=3
    ),
    Daily(
        title='Cook New Recipe',
        notes='Try cooking a new recipe for dinner',
        position=3,
        difficulty=2,
        start_date=date(2023, 11, 5),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=3
    ),
    Daily(
        title='Gardening',
        notes='Spend time in the garden',
        position=4,
        difficulty=1,
        start_date=date(2023, 11, 5),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=3
    ),
    Daily(
        title='Art Project',
        notes='Draw or paint something',
        position=5,
        difficulty=3,
        start_date=date(2023, 11, 5),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=3
    ),
    Daily(
        title='Journaling',
        notes='Write in your journal every night',
        position=6,
        difficulty=1,
        start_date=date(2023, 11, 5),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=3
    ),
]


def seed_dailies():
    db.session.add_all(dailies_list)
    db.session.commit()

def undo_dailies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.dailies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM dailies"))

    db.session.commit()
