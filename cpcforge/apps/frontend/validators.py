from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

def sign_up_name(value):
    if len(value.strip()) == 0:
        raise ValidationError(
            _('Required'),
            code='required'
        )

def sign_up_username(value):
    ...

def sign_up_password(value):
    ...

def sign_up_confirm_password(value):
    ...