from django.urls import path
from . import views

urlpatterns = [
    path('', views.Home.as_view()),
    path('signup', views.SignUp.as_view()),
    path('login', views.SignIn.as_view()),
    path('list', views.PlatformList.as_view()),
    path('create', views.PlatformCreate.as_view()),
    path('platform/<str:platform>', views.PlatformView.as_view()),
    path('platform/<str:platform>/create', views.ProblemCreate.as_view()),
    path('platform/<str:platform>/problem/<str:problem>', views.ProblemView.as_view()),
]