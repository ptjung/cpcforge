from dotenv import load_dotenv
from os import getenv
from pymongo import MongoClient
from bcrypt import checkpw, hashpw, gensalt

# Configuration Operations
load_dotenv()
class Config:
    DJANGO_SECRET_KEY = getenv('DJANGO_SECRET_KEY')
    JWT_SECRET_KEY = getenv('JWT_SECRET_KEY')
    MONGODB_CONN_STRING = getenv('MONGODB_CONN_STRING')
mongodb_client = MongoClient(Config.MONGODB_CONN_STRING)

# History
db_history = mongodb_client['history']
coll_submit_logs = db_history['submit_logs']

# Profiles
db_profiles = mongodb_client['profiles']
coll_platforms = db_profiles['platforms']
coll_problems = db_profiles['problems']
coll_users = db_profiles['users']

# Utility Functions
pwd_hash = lambda str: hashpw(str.encode('utf-8'), gensalt(10))
pwd_match = lambda str, hashed: checkpw(str.encode('utf-8'), hashed)
get_kpvals = lambda obj, keys, fn = (lambda e: e): {k: fn(obj[k]) for k in keys}