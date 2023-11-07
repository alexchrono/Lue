from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Habit(db.Model):
    __tablename__ = 'habits'

    if environment == "production":
      __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    position = db.Column(db.Integer)
    notes = db.Column(db.Text)
    alignment = db.Column(db.Boolean,default=True)
    counter = db.Column(db.Integer, default=0)
    difficulty = db.Column(db.Integer,default=1)
    reset_rate=db.Column(db.String,default='daily')
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    untouched=db.Column(db.Boolean,default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)


    habits_of_user = db.relationship('User', back_populates='users_habits')

    # usebackref instead of backpopulates?
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'position': self.position,
            'notes': self.notes,
            'alignment': self.alignment,
            'counter': self.counter,
            'difficulty': self.difficulty,
            'resetRate': self.reset_rate,
            'userId': self.user_id,
            'untouched': self.untouched,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

# Table habits {
#   id integer [primary key]
#   title varchar
#   position integer
#   notes text
#   positive boolean
#   counter integer
#   difficulty varchar
#   user_id integer [ref: > users.id]
#   created_at timestamp
#   updated_at timestamp




# }
