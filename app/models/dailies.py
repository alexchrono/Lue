from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from datetime import date

class Daily(db.Model):
    __tablename__ = 'dailies'

    if environment == "production":
      __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    position=db.Column(db.Integer)
    notes = db.Column(db.String)
    counter = db.Column(db.Integer, default=0)
    difficulty = db.Column(db.Integer,default=1)
    start_date = db.Column(db.Date, default=date.today)
    repeat_time_frame = db.Column(db.String, default='daily')
    repeat_quantity = db.Column(db.Integer,default=1)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    untouched=db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)
    dailies_of_user= db.relationship('User',back_populates='users_dailies')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'position': self.position,
            'notes': self.notes,
            'counter': self.counter,

            'difficulty': self.difficulty,
            'startDate': self.start_date,
            'repeatTimeFrame': self.repeat_time_frame,
            'repeatQuantity': self.repeat_quantity,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }























# # dailies go here
# Table dailies {
#   id integer [primary key]
#   title varchar
#   notes varchar
#   difficulty varchar
#   startDate date
#   repeats varchar
#   repeat_quantity integer
#   repeat_day varchar
#   user_id integer [ref: > users.id]
#   created_at timestamp
#   updated_at timestamp
# }
