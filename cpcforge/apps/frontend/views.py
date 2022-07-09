from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.shortcuts import render
from django.views import View

#@login_required(login_url='/login')
# def index(request, *args, **kwargs):
#     return render(request, 'frontend/index.html')

class Home(View):
    def get(self, request):
        return render(
            request,
            'base.html',
            { 'content_id': 'home' }
        )

class SignUp(View):
    def get(self, request):
        return render(
            request,
            'base.html',
            { 'content_id': 'signup' }
        )

class Index(View):
    def get(self, request):
        return render(
            request,
            'base.html',
            { 'content_id': 'app' }
        )