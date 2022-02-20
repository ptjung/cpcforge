from django.urls import path
from .views import CreateUserView

urlpatterns = [
    path('users/create', CreateUserView.as_view()),
]
