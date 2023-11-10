from app.models import db,Daily,environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import text
from datetime import date

dailies_list = [
    Daily(
        title='Stretching Routine',
        notes='Do a 10-minute stretching routine in the morning',
        position=1,
        difficulty=1,
        start_date=date(2023, 9, 7),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Study',
        notes='Study coding for 1 hour',
        position=2,
        difficulty=2,
        start_date=date(2023, 9, 12),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Walk the Dog',
        notes='Walk in the park with the dog',
        position=3,
        difficulty=1,
        start_date=date(2023, 9, 15),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Play Piano',
        notes='Practice piano for 1 hour atleast once a week',
        position=4,
        difficulty=3,
        start_date=date(2023, 9, 20),
        repeat_time_frame='weekly',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Check Emails',
        notes='Clear inbox of all junk-mail once a week',
        position=5,
        difficulty=1,
        start_date=date(2023, 9, 22),
        repeat_time_frame='weekly',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Prepare Meals',
        notes='Prepare healthy meals for the week ahead',
        position=6,
        difficulty=2,
        start_date=date(2023, 9, 25),
        repeat_time_frame='weekly',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Morning Yoga',
        notes='Start the day with 15 minutes of yoga',
        position=7,
        difficulty=2,
        start_date=date(2023, 9, 28),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Learn Guitar',
        notes='Practice chords and songs for 20 minutes',
        position=8,
        difficulty=3,
        start_date=date(2023, 10, 3),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Read Novel',
        notes='Read for at least 30 minutes before bed',
        position=9,
        difficulty=1,
        start_date=date(2023, 10, 7),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Practice Spanish',
        notes='Spend 20 minutes on Spanish dict',
        position=10,
        difficulty=2,
        start_date=date(2023, 10, 11),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Meditation',
        notes='Meditate each morning',
        position=11,
        difficulty=1,
        start_date=date(2023, 10, 15),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Budget Review',
        notes='Check and update your finances once a month',
        position=12,
        difficulty=3,
        start_date=date(2023, 10, 18),
        repeat_time_frame='monthly',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Exercise Routine',
        notes='Do 30 minutes on the exercise bike',
        position=13,
        difficulty=3,
        start_date=date(2023, 10, 21),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Coding Practice',
        notes='Code for 1 hour on personal projects',
        position=14,
        difficulty=2,
        start_date=date(2023, 10, 25),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='love myself',
        notes='Look in the mirror and tell yourself youre handsome',
        position=15,
        difficulty=2,
        start_date=date(2023, 10, 29),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Gardening',
        notes='Spend time in the garden once a week',
        position=16,
        difficulty=1,
        start_date=date(2023, 11, 2),
        repeat_time_frame='weekly',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Art Project',
        notes='Draw or paint something once a week',
        position=17,
        difficulty=3,
        start_date=date(2023, 11, 5),
        repeat_time_frame='weekly',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Journaling',
        notes='Write in your journal every night',
        position=18,
        difficulty=1,
        start_date=date(2023, 11, 7),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Organize Workspace',
        notes='Spend 10 minutes tidying up my coding station.  its a mess',
        position=19,
        difficulty=1,
        start_date=date(2023, 11, 8),
        repeat_time_frame='daily',
        repeat_quantity=1,
        user_id=1
    ),
    Daily(
        title='Reflect on Goals',
        notes='Take an hour to review and reflect on your goals. Write it down in your journal',
        position=20,
        difficulty=1,
        start_date=date(2023, 9, 14),
        repeat_time_frame='monthly',
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
