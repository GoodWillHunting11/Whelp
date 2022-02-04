from app.models import db, Photo


# Adds a demo user, you can add other users here if you want
def seed_photos():
    dog_park = Photo(
        url='https://whelp.s3.amazonaws.com/p1.jpg', user_id=1, business_id=1)
    pet_store = Photo(
        url='https://whelp.s3.amazonaws.com/g1.jpg', user_id=1, business_id=2)
    groomer = Photo(
        url='https://whelp.s3.amazonaws.com/s1.jpg', user_id=1, business_id=3)
    vet = Photo(
        url='https://whelp.s3.amazonaws.com/v1.jpg', user_id=2, business_id=4)
    walker = Photo(
        url='https://whelp.s3.amazonaws.com/q1.jpg', user_id=3, business_id=5)

    db.session.add(dog_park)
    db.session.add(pet_store)
    db.session.add(groomer)
    db.session.add(vet)
    db.session.add(walker)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_photos():
    db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
    db.session.commit()
