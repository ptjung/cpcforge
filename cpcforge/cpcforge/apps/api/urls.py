from django.urls import path
from .views import RetrieveUserView, CreateUserView

urlpatterns = [
    path('users/retrieve', RetrieveUserView.as_view()),
    path('users/create', CreateUserView.as_view()),
]
