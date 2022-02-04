from app.models import db, 

# Adds a demo user, you can add other users here if you want
def seed_businesses_categories():
    join_1 = Business_category(
        businesses_id='1', categories_id='2')
    join_2 = Business_category(
        businesses_id='2', categories_id='5')
    join_3 = Business_category(
        businesses_id='3', categories_id='1')
    join_4 = Business_category(
        businesses_id='4', categories_id='4')
    join_5 = Business_category(
        businesses_id='5', categories_id='3')

    db.session.add(join_1)
    db.session.add(join_2)
    db.session.add(join_3)
    db.session.add(join_4)
    db.session.add(join_5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_businesses():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()
