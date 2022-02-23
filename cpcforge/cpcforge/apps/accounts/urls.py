from django.urls import path
from .views import VerifyUserAPI, RetrieveUserAPI, RegisterUserAPI

urlpatterns = [
    path('users/verify', VerifyUserAPI.as_view()),
    path('users/retrieve', RetrieveUserAPI.as_view()),
    path('users/register', RegisterUserAPI.as_view()),
]