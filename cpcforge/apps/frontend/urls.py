from django.urls import re_path
from . import views

urlpatterns = [
    re_path(r'$', views.Home.as_view(), name="home"),
    re_path(r'signup$', views.SignUp.as_view(), name="sign-up"),
    re_path(r'login$', views.SignIn.as_view(), name="sign-in"),
    re_path(r'list$', views.PlatformList.as_view(), name="platform-list"),
    re_path(r'create$', views.PlatformCreate.as_view(), name="platform-create"),
    re_path(r'platform/(?P<platform>[A-Za-z0-9]+)$', views.PlatformView.as_view(), name="platform-view"),
    re_path(r'platform/(?P<platform>[A-Za-z0-9]+)/create$', views.ProblemCreate.as_view(), name="problem-create"),
    re_path(r'platform/(?P<platform>[A-Za-z0-9]+)/problem/(?P<problem>[A-Za-z0-9]+)$', views.ProblemView.as_view(), name="problem-view"),
]