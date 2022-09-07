from django.db import models
from django.db.models import UniqueConstraint
from django.db.models.functions import Lower
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(_('email address'), unique=True)

    class Meta:
        constraints = [
            UniqueConstraint(
                Lower('username'),
                name='lower_username_unique',
            ),
            UniqueConstraint(
                Lower('email'),
                name='lower_email_unique',
            ),
        ]
    
    def __str__(self):
        return f"<User username=\"{self.username}\" email=\"{self.email}\">"