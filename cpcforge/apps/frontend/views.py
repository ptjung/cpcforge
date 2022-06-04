from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.shortcuts import render

#@login_required(login_url='/login')
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')