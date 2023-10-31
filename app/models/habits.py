# habits goes here
Table habits {
  id integer [primary key]
  title varchar
  position integer
  notes text
  positive boolean
  counter integer
  difficulty varchar
  user_id integer [ref: > users.id]
  created_at timestamp
  updated_at timestamp




}
