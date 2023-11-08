from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from decimal import Decimal
from datetime import datetime

def default_health():
    return Decimal('50.00')

def default_gold_or_exp():
    return Decimal('0.00')

def current_date():
    return datetime.utcnow()

level_titles = {
    1: 'Novice',
    2: 'Apprentice',
    3: 'Initiate',
    4: 'Squire',
    5: 'Journeyman',
    6: 'Adventurer',
    7: 'Warrior',
    8: 'Veteran',
    9: 'Knight',
    10: 'Guardian',
    11: 'Ranger',
    12: 'Captain',
    13: 'Defender',
    14: 'Sentinel',
    15: 'Champion',
    16: 'Warlord',
    17: 'High Knight',
    18: 'Paladin',
    19: 'Ascendant',
    20: 'Master',
}

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    selected_avatar= db.Column(db.String(200),default='https://i.imgur.com/V26j32L.png')
    level = db.Column(db.Integer,default=1)
    health = db.Column(db.Numeric(10,2),default=default_health)
    current_health= db.Column(db.Numeric(10,2),default=default_health)
    gold = db.Column(db.Numeric(10, 2), default=default_gold_or_exp)
    exp = db.Column(db.Numeric(10, 2), default=default_gold_or_exp)
    created_at = db.Column(db.DateTime, default=current_date)
    updated_at = db.Column(db.DateTime, default=current_date)
    users_habits = db.relationship('Habit',back_populates='habits_of_user')
    users_dailies= db.relationship('Daily',back_populates='dailies_of_user')
    @property
    def password(self):
        return self.hashed_password

    @property
    def level_title(self):
        return level_titles.get(self.level,"Transcendent")
    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        userHabits={}
        userDailies={}
        userHabitsArray=[]
        userDailiesArray=[]
        for ele in self.users_habits:
            userHabitsArray.append(ele.id)
            userHabits[ele.id]=ele.to_dict()
        for ele2 in self.users_dailies:
            userDailiesArray.append(ele2.id)
            userDailies[ele2.id]=ele2.to_dict()

        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'selectedAvatar': self.selected_avatar,
            'level': self.level,
            'levelTitle': self.level_title,
            'health': self.health,
            'currentHealth': self.current_health,
            'gold': self.gold,
            'exp': self.exp,
            'usersHabitsArray': userHabitsArray,
            'usersHabitsObj': userHabits,
            'usersDailiesArray': userDailiesArray,
            'usersDailiesObj':userDailies,
            'created_at': self.created_at,
            'updated_at': self.updated_at


        }



# Table users {
#   id integer [primary key]
#   username varchar
#   email varchar
#   hashed_password varchar
#   selected_avatar integer
#   level integer
#   health decimal (10,2)
#   gold decimal(10,2)
#   exp decimal(10,2)
#   created_at timestamp
#   updated_at timestamp
# }
