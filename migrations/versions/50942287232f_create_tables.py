"""create tables

Revision ID: 50942287232f
Revises: 
Create Date: 2022-02-04 12:01:01.803954

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '50942287232f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('businesses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('address', sa.String(length=255), nullable=False),
    sa.Column('city', sa.String(length=25), nullable=False),
    sa.Column('state', sa.String(length=2), nullable=False),
    sa.Column('zipcode', sa.String(length=15), nullable=False),
    sa.Column('phone', sa.String(length=15), nullable=False),
    sa.Column('website', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=255), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('zipcode', sa.String(length=15), nullable=False),
    sa.Column('role', sa.String(length=25), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('business_category',
    sa.Column('business_id', sa.Integer(), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['business_id'], ['businesses.id'], ),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ),
    sa.PrimaryKeyConstraint('business_id', 'category_id')
    )
    op.create_table('maps',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('long', sa.Float(), nullable=False),
    sa.Column('lat', sa.Float(), nullable=False),
    sa.Column('business_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['business_id'], ['businesses.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('photos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('business_id', sa.Integer(), nullable=True),
    sa.Column('time_created', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('time_updated', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['business_id'], ['businesses.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('review', sa.Text(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('business_id', sa.Integer(), nullable=True),
    sa.Column('time_created', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('time_updated', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['business_id'], ['businesses.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('photos')
    op.drop_table('maps')
    op.drop_table('business_category')
    op.drop_table('users')
    op.drop_table('categories')
    op.drop_table('businesses')
    # ### end Alembic commands ###