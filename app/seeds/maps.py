from app.models import db, Map


def seed_maps():
    dog_park_map = Map(
        long = -116.26617238638737, lat = 43.64390737310643, business_id = 1
    )
    pet_store_map = Map(
        long = -116.35571014405932, lat = 43.61758299159893, business_id = 2
    )
    groomer_map = Map(
        long = -116.32080095755221, lat = 43.622944710475196, business_id = 3
    )
    vet_map = Map(
        long = -112.07303633056931, lat = 43.48597577968136, business_id = 4
    )
    walker_map = Map(
        long = -116.33631285755372, lat = 43.55697138083378, business_id = 5
    )

    db.session.add(dog_park_map)
    db.session.add(pet_store_map)
    db.session.add(groomer_map)
    db.session.add(vet_map)
    db.session.add(walker_map)

    db.session.commit()

def undo_maps():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()

# format = lat, long, business name
# 43.64390737310643, -116.26617238638737 -Bower Park
# 43.61758299159893, -116.35571014405932 -Puppyland Idaho
# 43.622944710475196, -116.32080095755221 -The Pet Groomers
# 43.48597577968136, -112.07303633056931 -Skyline Animal Hospital
# 43.55697138083378, -116.33631285755372 -The Pet Sitter of Boise
