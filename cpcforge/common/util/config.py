from dotenv import load_dotenv
from os import getenv

# Configuration Operations
load_dotenv()
class Config:
    DJANGO_SECRET_KEY = getenv('DJANGO_SECRET_KEY')
    JWT_SECRET_KEY = getenv('JWT_SECRET_KEY')
    MONGODB_CONN_STRING = getenv('MONGODB_CONN_STRING')
    PISTON_API_KEY = getenv('PISTON_API_KEY')