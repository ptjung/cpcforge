from authlib.integrations.django_client import OAuth
from django.conf import settings
from django.shortcuts import render

def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

oauth = OAuth()
oauth.register(
    "auth0",
    client_id=settings.AUTH0_CLIENT_ID,
    client_secret=settings.AUTH0_CLIENT_SECRET,
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f"https://{settings.AUTH0_DOMAIN}/.well-known/openid-configuration",
)