from django import forms
from django.contrib.auth import authenticate, get_user_model
from django.db.models import Q
from re import match as regex_match

User = get_user_model()

class UserSignUp(forms.ModelForm):
    first_name = forms.CharField(
        error_messages={"required": "Required"}
    )
    last_name = forms.CharField(
        error_messages={"required": "Required"}
    )
    username = forms.CharField(
        error_messages={
            "required": "Required",
            "unique": "This username has already been taken"
        }
    )
    email = forms.CharField(
        error_messages={
            "required": "Required",
            "unique": "This email has already been taken"
        }
    )
    password = forms.CharField(
        error_messages={"required": "Required"}
    )
    
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'email', 'password')

    def clean_first_name(self):
        return self.cleaned_data['first_name'].strip()

    def clean_last_name(self):
        return self.cleaned_data['last_name'].strip()

    def clean_username(self):
        new_username = self.cleaned_data['username'].strip()
        if not regex_match(r'^[A-Za-z0-9_]{3,16}$', new_username):
            self.add_error("username", "Username must consist of 3 to 16 alphanumeric characters")
        return new_username

    def clean_email(self):
        new_email = self.cleaned_data['email'].strip()
        if not regex_match(r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$', new_email):
            self.add_error("email", "Email address must contain a valid handle and domain")
        elif len(new_email) > 255:
            self.add_error("email", "Email address cannot exceed 255 characters")
        return new_email

    def clean_password(self):
        password = self.data['password']
        if len(password) < 8:
            self.add_error("password", "Password must consist of 8 or more non-whitespace characters")
        elif len(password) > 255:
            self.add_error("password", "Password cannot exceed 255 characters")
        return password

class UserSignIn(forms.Form):
    identifier = forms.CharField(
        error_messages={"required": "Enter a valid username or email"}
    )
    password = forms.CharField(required=False)

    def clean_identifier(self):
        return self.cleaned_data['identifier'].strip()

    def clean(self):
        cleaned_data = super().clean()
        idn = cleaned_data.get("identifier")
        pwd = cleaned_data.get("password")

        if not (user := User.objects.filter(Q(email__iexact=idn) | Q(username__iexact=idn)).first()):
            self.add_error("identifier", "Enter a valid username or email")
            return
        if not authenticate(username=user.username, password=pwd):
            self.add_error("password", "Password is incorrect")