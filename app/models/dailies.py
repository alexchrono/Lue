# dailies go here
Table dailies {
  id integer [primary key]
  title varchar
  notes varchar
  difficulty varchar
  startDate date
  repeats varchar
  repeat_quantity integer
  repeat_day varchar
  user_id integer [ref: > users.id]
  created_at timestamp
  updated_at timestamp
}
