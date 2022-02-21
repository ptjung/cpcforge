from dotenv import load_dotenv
from os import getenv
from pymongo import MongoClient

load_dotenv()

class Config:
    DJANGO_SECRET_KEY = getenv('DJANGO_SECRET_KEY')
    MONGODB_CONN_STRING = getenv('MONGODB_CONN_STRING')

mongodb_client = MongoClient(Config.MONGODB_CONN_STRING)
# neigh_coll = mongodb_client['sample_restaurants']['neighborhoods']
# print(neigh_coll.find_one()['name'])