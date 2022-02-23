from django.urls import path
from .views import CreatePlatformAPI, AuthUserForPlatformAPI, VerifyPlatformAuthAPI, RetrievePlatformAPI, RetrieveAllPlatformsAPI

urlpatterns = [
    path('platforms/create', CreatePlatformAPI.as_view()),
    path('platforms/auth', AuthUserForPlatformAPI.as_view()),
    path('platforms/verify', VerifyPlatformAuthAPI.as_view()),
    path('platforms/retrieve', RetrievePlatformAPI.as_view()),
    path('platforms/list', RetrieveAllPlatformsAPI.as_view()),
]