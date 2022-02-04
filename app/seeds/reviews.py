from app.models import db, Review


def seed_reviews():
    dog_park_review_1 = Review(
        rating=5, review='A great place for your dog to run around and meet other dogs.', user_id=1, business_id=1)
    dog_park_review_2 = Review(
        rating=5, review='Huge shady trees, soccer field, skating area, walking path, and a brand new playground.', user_id=2, business_id=1)
    dog_park_review_3 = Review(
        rating=5, review="Other than that, I've never had any problems there and it has a huge field if you want to take your dog or play a little soccer", user_id=3, business_id=1)
    pet_store_review_1 = Review(
        rating=4, review='This place has a wide selection with reasonable prices.', user_id=1, business_id=2)
    pet_store_review_2 = Review(
        rating=4, review='Such a wonderful place to get a dog! The employees definitely know what they are talking about! Clean and smells great such plus.', user_id=2, business_id=2)
    pet_store_review_3 = Review(
        rating=4, review="i got my boyfriend and i a purebred golden retriever from here at the beginning of February. the customer service was pretty good, everyone was attentive and did their best to make things go smoothly for me. as far as my dog goes, he's doing great! healthy and all things great. he's growing fast that's the only sad part lol.", user_id=3, business_id=2)
    groomer_review_1 = Review(
        rating=4, review='My little Floofy looked so handsome after his visit to The Pet Groomers.', user_id=1, business_id=3)
    groomer_review_2 = Review(
        rating=4, review="We've found our furever groomer! Our babies look so nice and adorable every time after their haircuts.", user_id=2, business_id=3)
    groomer_review_3 = Review(
        rating=4, review="I just took my American Bully there today and I absolutely love them. I just moved to Boise and was looking for a groomer and came across them. They took such good care of him and did an extra bath with his special shampoo since he has so many skin conditions. They listened to all of my requests and did an amazing job! I will always be going here from now on! Highly recommend them!", user_id=3, business_id=3)
    vet_review_1 = Review(
        rating=5, review='The doctor here was so nice to me.', user_id=1, business_id=4)
    vet_review_2 = Review(
        rating=5, review="The staff is extremely friendly and I cannot stress enough how amazing the vets are. The vet we saw sat and talked with me thoroughly about my concerns about my pets' health and made suggestions about diet to help keep them healthy and happy.", user_id=2, business_id=4)
    vet_review_3 = Review(
        rating=5, review="I've never had such outstanding service from a vet in my 40 plus years of owning animals.", user_id=3, business_id=4)
    walker_review_1 = Review(
        rating=5, review="I will never use another service. The Pet Sitter of Boise hits a home run 100% of the time. I don\'t worry about our dogs for a second. I just look forward to well-written updates and awesome pictures of my little guys. Honest and  trustworthy staff. Worth every penny and then some.", user_id=1, business_id=5)
    walker_review_2 = Review(
        rating=5, review="I would really recommend them, we use them every time we need to leave town and we love them. We have 2 dogs and they feel really loved when the pet sitter visits. I love the daily updates and pictures froM them.", user_id=2, business_id=5)
    walker_review_3 = Review(
        rating=5, review="If you need someone to walk your dog they do that and treat your pets with love and oodles of attention.", user_id=3, business_id=5)

    db.session.add(dog_park_review_1)
    db.session.add(dog_park_review_2)
    db.session.add(dog_park_review_3)

    db.session.add(pet_store_review_1)
    db.session.add(pet_store_review_2)
    db.session.add(pet_store_review_3)

    db.session.add(groomer_review_1)
    db.session.add(groomer_review_2)
    db.session.add(groomer_review_3)

    db.session.add(vet_review_1)
    db.session.add(vet_review_2)
    db.session.add(vet_review_3)

    db.session.add(walker_review_1)
    db.session.add(walker_review_2)
    db.session.add(walker_review_3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
