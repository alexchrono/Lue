## Welcome to Level up Everything

Level up's website:  https://lue.onrender.com/

## Description

Level Up Everything is a full stack application designed to help you maximize good habits and minimize bad habits.  The overall idea was inspired by Habitica.com.

After successfully signing in you can create and edit cards-  cards for habits, and cards for daily chores that need to get done.  You can also click on these cards and either level up your avatar, or have them die a temporary death should you click on/indulge in too many bad habits!

## Habits

- User can create/add a new habit.
- User can view all habits from the homepage.
- User can update/edit a habit.
- User can delete/remove a habit.

## Dailies

- User can create/add a new daily.
- User can view all dailies from the homepage.
- User can update/edit a daily.
- User can delete/remove a daily.

# Technologies Used In Level Up Everything

- Backend:
   - Python
   - Flask

- Frontend:
   - React
   - Redux
   - Javascript
   - HTML
   - CSS

- Aws:
User's can upload a custom avatar for personalization.

## Installation Instructions

1. Install dependencies
```bash
pipenv install -r requirements.txt
```
2. Create a **.env** file based on the example with proper settings for your development environment

3. Replace the value for `SCHEMA` with a unique name, **making sure you use the snake_case convention**.

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

```bash
pipenv shell
```
```bash
flask db upgrade
```
```bash
flask seed all
```
```bash
flask run
```

5. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Creator

Alex Heasley
https://github.com/alexchrono
