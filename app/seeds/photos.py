from app.models import db, Photo


# Adds a demo user, you can add other users here if you want
def seed_photos():
    dog_park = Photo(
        url='https://whelp.s3.amazonaws.com/p1.jpg', user_id=1, business_id=1)
    dog_park2 = Photo(
        url='https://whelp.s3.amazonaws.com/p2.jpg', user_id=1, business_id=1)
    dog_park3 = Photo(
        url='https://whelp.s3.amazonaws.com/p3.jpg', user_id=1, business_id=1)
    dog_park4 = Photo(
        url='https://whelp.s3.amazonaws.com/p4.jpg', user_id=1, business_id=1)
    pet_store = Photo(
        url='https://whelp.s3.amazonaws.com/s1.jpg', user_id=1, business_id=2)
    pet_store2 = Photo(
        url='https://whelp.s3.amazonaws.com/s2.jpg', user_id=1, business_id=2)
    pet_store3 = Photo(
        url='https://whelp.s3.amazonaws.com/s3.jpg', user_id=1, business_id=2)
    pet_store4 = Photo(
        url='https://whelp.s3.amazonaws.com/s4.jpg', user_id=1, business_id=2)
    groomer = Photo(
        url='https://whelp.s3.amazonaws.com/g1.jpg', user_id=1, business_id=3)
    groomer2 = Photo(
        url='https://whelp.s3.amazonaws.com/g2.jpg', user_id=1, business_id=3)
    groomer3 = Photo(
        url='https://whelp.s3.amazonaws.com/g3.jpg', user_id=1, business_id=3)
    groomer4 = Photo(
        url='https://whelp.s3.amazonaws.com/g4.jpg', user_id=1, business_id=3)
    vet = Photo(
        url='https://whelp.s3.amazonaws.com/v1.jpg', user_id=2, business_id=4)
    vet2 = Photo(
        url='https://whelp.s3.amazonaws.com/v2.jpg', user_id=2, business_id=4)
    vet3 = Photo(
        url='https://whelp.s3.amazonaws.com/v3.jpg', user_id=2, business_id=4)
    vet4 = Photo(
        url='https://whelp.s3.amazonaws.com/v4.jpg', user_id=2, business_id=4)
    walker = Photo(
        url='https://whelp.s3.amazonaws.com/q1.jpg', user_id=3, business_id=5)
    walker2 = Photo(
        url='https://whelp.s3.amazonaws.com/q2.jpg', user_id=3, business_id=5)
    walker3 = Photo(
        url='https://whelp.s3.amazonaws.com/q3.jpg', user_id=3, business_id=5)
    walker4 = Photo(
        url='https://whelp.s3.amazonaws.com/q4.jpg', user_id=3, business_id=5)

    db.session.add(dog_park)
    db.session.add(dog_park2)
    db.session.add(dog_park3)
    db.session.add(dog_park4)
    db.session.add(pet_store)
    db.session.add(pet_store2)
    db.session.add(pet_store3)
    db.session.add(pet_store4)
    db.session.add(groomer)
    db.session.add(groomer2)
    db.session.add(groomer3)
    db.session.add(groomer4)
    db.session.add(vet)
    db.session.add(vet2)
    db.session.add(vet3)
    db.session.add(vet4)
    db.session.add(walker)
    db.session.add(walker2)
    db.session.add(walker3)
    db.session.add(walker4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_photos():
    db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
    db.session.commit()
