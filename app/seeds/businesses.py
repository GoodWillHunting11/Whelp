from app.models import db, Business, Category

# Adds a demo user, you can add other users here if you want
def seed_businesses():
    dog_park = Business(
        name='Bower Park', address='5019 N Sawyer Ave', city='Boise', state='ID', zipcode='83714', phone='9113452654', website='http://idahodogpark.com/')
    pet_store = Business(
        name='Puppyland Idaho', address='3100 E Florence Dr STE 102', city='Meridian', state='ID', zipcode='83642', phone='9127459878', website='https://puppylandidaho.com/')
    groomer = Business(
        name='The Pet Groomers', address='1921 Wildwood St', city='Boise', state='ID', zipcode='83713', phone='9114587563', website='http://thepetgroomers.net/')
    vet = Business(
        name="Skyline Animal Hospital", address='1378 Grizzly Ave', city='Idaho Falls', state='ID', zipcode='83402', phone='7685945489', website='http://skylineanimalhospital.com/')
    walker = Business(
        name='The Pet Sitter of Boise', address='12350 W Lachlan St', city='Boise', state='ID', zipcode='83709', phone='4569871234', website='http://thepetsitterofboise.com/')

    groomer_cat = Category(name='Groomers')
    dog_park_cat = Category(name='Parks')
    walker_cat = Category(name='Walkers')
    vet_cat = Category(name="Veterinarians")
    pet_store_cat = Category(name='Pet Stores')

    dog_park.categories.append(dog_park_cat)
    pet_store.categories.append(pet_store_cat)
    groomer.categories.append(groomer_cat)
    vet.categories.append(vet_cat)
    walker.categories.append(walker_cat)

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
def undo_businesses():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
