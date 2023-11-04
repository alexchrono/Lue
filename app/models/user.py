from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from decimal import Decimal
from datetime import datetime



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
    health = db.Column(db.Numeric(10,2),default=Decimal('50.00'),nullable=False)
    current_health= db.Column(db.Numeric(10,2),default=Decimal('50.00'),nullable=False)
    gold = db.Column(db.Numeric(10, 2), default=Decimal('0.00'), nullable=False)
    exp = db.Column(db.Numeric(10, 2), default=Decimal('0.00'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'selectedAvatar': self.selected_avatar,
            'level': self.level,
            'health': self.health,
            'currentHealth': self.current_health,
            'gold': self.gold,
            'exp': self.exp,
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
