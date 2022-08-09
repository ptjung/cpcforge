from pathlib import Path
from telnetlib import AUTHENTICATION
from dotenv import load_dotenv
from os import getenv, path
from mongoengine import connect
import pymongo

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv()
SECRET_KEY = getenv('DJANGO_SECRET_KEY')
JWT_SECRET_KEY = getenv('JWT_SECRET_KEY')
MONGODB_CONN_STRING = getenv('MONGODB_CONN_STRING')
DB_USERNAME = getenv('DB_USERNAME')
DB_PASSWORD = getenv('DB_PASSWORD')
PISTON_API_KEY = getenv('PISTON_API_KEY')
AUTH0_DOMAIN = getenv("AUTH0_DOMAIN")
AUTH0_CLIENT_ID = getenv("AUTH0_CLIENT_ID")
AUTH0_CLIENT_SECRET = getenv("AUTH0_CLIENT_SECRET")

try:
    connect(alias="default", host=MONGODB_CONN_STRING)
except pymongo.errors.ConfigurationError:
    ...

DEBUG = True
ALLOWED_HOSTS = []
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    'rest_framework',
    'cpcforge.apps.accounts',
    'cpcforge.apps.frontend',
    'cpcforge.apps.platforms',
]
REST_FRAMEWORK = {}
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
ROOT_URLCONF = 'cpcforge.urls'
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            path.join(BASE_DIR.parent, "templates"),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
WSGI_APPLICATION = 'cpcforge.wsgi.application'
DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'cpcforge',
        'CLIENT': {
            'host': MONGODB_CONN_STRING
        }
    }
}
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
AUTHENTICATION_BACKENDS = [
    'cpcforge.apps.accounts.backends.AuthBackend',
]
AUTH_USER_MODEL = 'accounts.User'
LOGIN_REDIRECT_URL = '/'
LOGIN_URL = '/login'
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
STATIC_ROOT = 'cpcforge/apps/frontend'
STATIC_URL = 'static/'
STATICFILES_DIRS = [
    BASE_DIR / 'apps/frontend/static/dist',
]