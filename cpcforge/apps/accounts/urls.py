from django.urls import path
from .views import VerifyUserAPI, RetrieveUserAPI, RegisterUserAPI, X

urlpatterns = [
    path('users/verify', VerifyUserAPI.as_view()),
    path('users/retrieve', RetrieveUserAPI.as_view()),
    path('users/register', RegisterUserAPI.as_view()),
    path('users/register_test', X.as_view()),
]