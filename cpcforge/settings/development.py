from pathlib import Path
from dotenv import load_dotenv
from os import getenv, path

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv()
SECRET_KEY = getenv('DJANGO_SECRET_KEY')
JWT_SECRET_KEY = getenv('JWT_SECRET_KEY')
MONGODB_CONN_STRING = getenv('MONGODB_CONN_STRING')
PISTON_API_KEY = getenv('PISTON_API_KEY')
AUTH0_DOMAIN = getenv("AUTH0_DOMAIN")
AUTH0_CLIENT_ID = getenv("AUTH0_CLIENT_ID")
AUTH0_CLIENT_SECRET = getenv("AUTH0_CLIENT_SECRET")

DEBUG = True
ALLOWED_HOSTS = []
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    # 'mongoengine.django.mongo_auth',
    'cpcforge.apps.accounts.apps.AccountsConfig',
    'cpcforge.apps.frontend.apps.FrontendConfig',
    'cpcforge.apps.platforms.apps.PlatformsConfig',
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
            path.join(
                BASE_DIR,
                "..",
                "apps",
                "frontend"
                "templates"
            )
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
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
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
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
STATIC_ROOT = 'cpcforge/apps/frontend'
STATIC_URL = 'static/'