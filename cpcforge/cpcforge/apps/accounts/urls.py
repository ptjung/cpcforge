from django.urls import path
from .views import VerifyUserView, RetrieveUserView, RegisterUserView

urlpatterns = [
    path('users/verify', VerifyUserView.as_view()),
    path('users/retrieve', RetrieveUserView.as_view()),
    path('users/register', RegisterUserView.as_view()),
]