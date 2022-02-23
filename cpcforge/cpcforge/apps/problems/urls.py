from django.urls import path
from .views import CreateProblemAPI

urlpatterns = [
    path('problems/create', CreateProblemAPI.as_view()),
]