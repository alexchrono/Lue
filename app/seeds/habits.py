from app.models import db,Habit, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import text


habits_list = [
    Habit(
        title='Drink Water',
        notes='Drink at least 8 glasses of water a day',
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
        notes='Do not eat after 9 PM. I\'m getting fat',
        difficulty=3,
        position=4,
        reset_rate='daily',
        alignment=False,
        user_id=1
    ),
    Habit(
        title='Daily Stretching',
        notes='Do a full-body stretching routine in the morning',
        difficulty=1,
        position=5,
        reset_rate='daily',
        alignment=True,
        user_id=1
    ),
    Habit(
        title='Use Stairs',
        notes='Use the stairs instead of the elevator for a month',
        difficulty=2,
        position=6,
        reset_rate='monthly',
        alignment=True,
        user_id=1
    ),
    Habit(
        title='Fast Food',
        notes='Limit fast food to only once a week',
        difficulty=3,
        position=7,
        reset_rate='weekly',
        alignment=False,
        user_id=1
    ),
    Habit(
        title='Flossing',
        notes='Floss every night before bed',
        difficulty=1,
        position=8,
        reset_rate='daily',
        alignment=True,
        user_id=1
    ),
    Habit(
        title='Junk Food',
        notes='No more candy or chips',
        difficulty=2,
        position=9,
        reset_rate='daily',
        alignment=False,
        user_id=1
    ),
    Habit(
        title='Gratitude Journal',
        notes='Write three things you\'re grateful for',
        difficulty=1,
        position=10,
        reset_rate='daily',
        alignment=True,
        user_id=1
    ),
    Habit(
        title='Procrastination',
        notes='Do not procrastinate on tasks',
        difficulty=3,
        position=11,
        reset_rate='daily',
        alignment=False,
        user_id=1
    ),
    Habit(
        title='pre-cooking Meals',
        notes='pre-cook healthy meals at home every sunday',
        difficulty=2,
        position=12,
        reset_rate='weekly',
        alignment=True,
        user_id=1
    ),
    Habit(
        title='Snacking',
        notes='Eliminate snacking between meals',
        difficulty=2,
        position=13,
        reset_rate='daily',
        alignment=False,
        user_id=1
    ),
    Habit(
        title='Yoga',
        notes='Practice yoga every morning',
        difficulty=1,
        position=14,
        reset_rate='daily',
        alignment=True,
        user_id=1
    ),
    Habit(
        title='Online Shopping',
        notes='Reduce unnecessary online purchases',
        difficulty=3,
        position=15,
        reset_rate='weekly',
        alignment=False,
        user_id=1
    ),
    Habit(
        title='Reading before bed',
        notes='Read for 30 minutes before sleep',
        difficulty=1,
        position=16,
        reset_rate='daily',
        alignment=True,
        user_id=1
    ),
    Habit(
        title='Soda Drinks',
        notes='Cut out soda from your diet',
        difficulty=2,
        position=17,
        reset_rate='daily',
        alignment=False,
        user_id=1
    ),
    Habit(
        title='Morning Meditation',
        notes='Meditate each morning for 10 minutes',
        difficulty=1,
        position=18,
        reset_rate='daily',
        alignment=True,
        user_id=1
    ),
    Habit(
        title='Negativity',
        notes='Avoid negative self-talk throughout the day',
        difficulty=3,
        position=19,
        reset_rate='daily',
        alignment=False,
        user_id=1
    ),
    Habit(
        title='Improve social life',
        notes='Try to go on a date every week- I need to find misses right!',
        difficulty=2,
        position=20,
        reset_rate='weekly',
        alignment=True,
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
