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
            { 'content_id': 'sign-up' }
        )

class SignIn(View):
    def get(self, request):
        return render(
            request,
            'base.html',
            { 'content_id': 'sign-in' }
        )

class PlatformList(View):
    def get(self, request):
        return render(
            request,
            'base.html',
            { 'content_id': 'platform-list' }
        )

class PlatformCreate(View):
    def get(self, request):
        return render(
            request,
            'base.html',
            { 'content_id': 'platform-create' }
        )

class PlatformView(View):
    def get(self, request, platform):
        return render(
            request,
            'base.html',
            {
                'content_id': 'platform-view',
                'page_context': {
                    'platform': platform
                }
            }
        )

class ProblemCreate(View):
    def get(self, request, platform):
        return render(
            request,
            'base.html',
            {
                'content_id': 'problem-create',
                'page_context': {
                    'platform': platform
                }
            }
        )

class ProblemView(View):
    def get(self, request, platform, problem):
        return render(
            request,
            'base.html',
            {
                'content_id': 'problem-view',
                'page_context': {
                    'platform': platform,
                    'problem': problem
                }
            }
        )


# legacy

class Index(View):
    def get(self, request):
        return render(
            request,
            'base.html',
            { 'content_id': 'app' }
        )