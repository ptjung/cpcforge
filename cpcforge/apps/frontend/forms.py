from django import forms
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, get_user_model
from django.db.models import Q
from cpcforge.apps.frontend import validators

User = get_user_model()

class UserSignUp(forms.ModelForm):
    first_name = forms.CharField(validators=[validators.sign_up_name])
    last_name = forms.CharField(validators=[validators.sign_up_name])
    username = forms.CharField(validators=[validators.sign_up_username])
    password = forms.CharField(validators=[validators.sign_up_password])
    confirm_password = forms.CharField(validators=[validators.sign_up_confirm_password])

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'password')

    def clean(self):
        cleaned_data = super(UserSignUp, self).clean()
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")

        if password != confirm_password:
            raise ValidationError(
                "password and confirm_password does not match"
            )

class UserSignIn(forms.Form):
    identifier = forms.CharField(
        error_messages={"required": "Enter a valid username or email"}
    )
    password = forms.CharField(required=False)

    def clean(self):
        cleaned_data = super().clean()
        idn = cleaned_data.get("identifier")
        pwd = cleaned_data.get("password")

        if not (user := User.objects.filter(Q(email=idn) | Q(username=idn)).first()):
            self.add_error("identifier", "Enter a valid username or email")
            return
        if not authenticate(username=user.username, password=pwd):
            self.add_error("password", "Password is incorrect")