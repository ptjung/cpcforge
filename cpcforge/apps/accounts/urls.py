from django.urls import include, path
from . import views

urlpatterns = [
    path('check_identifier', views.CheckUsername.as_view()),
    path('users', views.RetrieveUser.as_view()),
    path('users/', include([
        path('create', views.CreateUser.as_view()),
    ]))
]