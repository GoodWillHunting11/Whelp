from app.models import db, Review


def seed_reviews():
    dog_park_review = Review(
        rating=5, review='A great place for your dog to run around and meet other dogs.', user_id=1, business_id=1)
    pet_store_review = Review(
        rating=4, review='This place has a wide selection with reasonable prices.', user_id=2, business_id=2)
    groomer_review = Review(
        rating=4, review='My little Floofy looked so handsome after his visit to The Pet Groomers.', user_id=3, business_id=3)
    vet_review = Review(
        rating=5, review='The doctor here was so nice to me.', user_id=2, business_id=4)
    walker_review = Review(
        rating=5, review="I will never use another service. The Pet Sitter of Boise hits a home run 100% of the time. I don\'t worry about our dogs for a second. I just look forward to well-written updates and awesome pictures of my little guys. Honest and  trustworthy staff. Worth every penny and then some.", user_id=3, business_id=5)

    db.session.add(dog_park_review)
    db.session.add(pet_store_review)
    db.session.add(groomer_review)
    db.session.add(vet_review)
    db.session.add(walker_review)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
