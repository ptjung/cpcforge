from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model

User = get_user_model()

class AuthBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None):
        user = User.objects.get(username__iexact=username)
        if user.check_password(password):
            return user
        return None