"""empty message

Revision ID: be4497897f70
Revises:
Create Date: 2023-11-01 12:11:12.132990

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'be4497897f70'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('selected_avatar', sa.String(length=200), nullable=False),
    sa.Column('level', sa.Integer(), nullable=False),
    sa.Column('health', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.Column('gold', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.Column('exp', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
    op.create_table('dailies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('notes', sa.String(), nullable=True),
    sa.Column('difficulty', sa.String(), nullable=True),
    sa.Column('startDate', sa.Date(), nullable=False),
    sa.Column('repeats', sa.String(), nullable=False),
    sa.Column('repeat_quantity', sa.Integer(), nullable=True),
    sa.Column('repeat_day', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE dailies SET SCHEMA {SCHEMA};")
    op.create_table('habits',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('position', sa.Integer(), nullable=True),
    sa.Column('notes', sa.Text(), nullable=True),
    sa.Column('alignment', sa.Boolean(), nullable=False),
    sa.Column('counter', sa.Integer(), nullable=True),
    sa.Column('difficulty', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    
    if environment == "production":
        op.execute(f"ALTER TABLE habits SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('habits')
    op.drop_table('dailies')
    op.drop_table('users')
    # ### end Alembic commands ###
