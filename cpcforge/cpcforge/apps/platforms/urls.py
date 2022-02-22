from django.urls import path
from .views import CreatePlatformView, RetrievePlatform, RetrieveAllPlatforms

urlpatterns = [
    path('platforms/create', CreatePlatformView.as_view()),
    path('platforms/retrieve', RetrievePlatform.as_view()),
    path('platforms/list', RetrieveAllPlatforms.as_view()),
]