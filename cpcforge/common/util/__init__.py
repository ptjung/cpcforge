
from dotenv import load_dotenv
from os import getenv
load_dotenv()

env = lambda key: getenv(key)