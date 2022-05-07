from pymongo import MongoClient
from django.conf import settings

mongodb_client = MongoClient(settings.MONGODB_CONN_STRING)

# History
db_history = mongodb_client['history']
coll_submit_logs = db_history['submit_logs']

# Profiles
db_profiles = mongodb_client['profiles']
coll_platforms = db_profiles['platforms']
coll_users = db_profiles['users']