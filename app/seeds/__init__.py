from flask.cli import AppGroup
from .users import seed_users, undo_users
from .businesses import seed_businesses, undo_businesses
from .categories import seed_categories, undo_categories
from .businesses_categories import seed_businesses_categories, undo_businesses_categories
from .maps import seed_maps, undo_maps
from .reviews import seed_reviews, undo_reviews
from .photos import seed_photos, undo_photos



# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_businesses()
    seed_categories()
    seed_businesses_categories()
    seed_maps()
    seed_reviews()
    seed_photos()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_businesses()
    undo_categories()
    undo_businesses_categories()
    undo_maps()
    undo_reviews()
    undo_photos()

