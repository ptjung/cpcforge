from django.urls import path
from .views import CreateProblemAPI, SubmitProblemAPI

urlpatterns = [
    path('problems/create', CreateProblemAPI.as_view()),
    path('problems/submit', SubmitProblemAPI.as_view()),
]