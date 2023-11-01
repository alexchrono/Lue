from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Daily(db.Model):
    __tablename__ = 'dailies'

    if environment == "production":
      __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    notes = db.Column(db.String)
    difficulty = db.Column(db.String)
    startDate = db.Column(db.Date, nullable=False)
    repeats = db.Column(db.String, nullable=False)
    repeat_quantity = db.Column(db.Integer)
    repeat_day = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    # created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    # updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'notes': self.notes,
            'difficulty': self.difficulty,
            'startDate': self.startDate.isoformat() if self.startDate else None,
            'repeats': self.repeats,
            'repeat_quantity': self.repeat_quantity,
            'repeat_day': self.repeat_day,
            'user_id': self.user_id
            # 'created_at': self.created_at.isoformat(),
            # 'updated_at': self.updated_at.isoformat(),
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
