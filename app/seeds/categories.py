from app.models import db, Category

# Adds a demo user, you can add other users here if you want
def seed_categories():
    groomer = Category(
        name='Groomers')
    dog_park = Category(
        name='Parks')
    walker = Category(
        name='Walkers')
    vet = Category(
        name="Veterinarians")
    pet_store = Category(
        name='Pet Stores')

    db.session.add(groomer)
    db.session.add(dog_park)
    db.session.add(walker)
    db.session.add(vet)
    db.session.add(pet_store)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_businesses():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()
