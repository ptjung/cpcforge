from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.shortcuts import redirect, render
from django.views import View
from cpcforge.apps.accounts import views as views_acc
from cpcforge.apps.frontend import forms
from utils import compile_json_msg_errors, extract_json_msg_errors

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

    def post(self, request):
        res = views_acc.CreateUser.as_view()(request)
        print(res)
        return redirect("sign-in")

class SignIn(View):
    def get(self, request):
        form_errors = extract_json_msg_errors(request)
        print(form_errors)
        return render(
            request,
            'form.html',
            {
                'content_id': 'sign-in',
                'page_context': { 'errors': form_errors },
            }
        )

    def post(self, request):
        sign_in_form = forms.UserSignIn(request.POST)
        compile_json_msg_errors(request, sign_in_form)
        if sign_in_form.is_valid():
            res_user = views_acc.RetrieveUser.as_view()(request)
            username = res_user.data['username']
            password = request.POST['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect("platform-list")
        return redirect("sign-in")
        # print('---')
        # print(sign_in_form.is_valid())
        # print(request.POST)
        # print(sign_in_form.errors.as_json())
        # print('===')
        # res_user = views_acc.RetrieveUser.as_view()(request)
        # if res_user.data == None:
        #     messages.error(request, "identifier")
        #     return redirect("sign-in")
        # username = res_user.data['username']
        # password = request.POST['password']
        # user = authenticate(username=username, password=password)
        # if user is not None:
        #     login(request, user)
        #     return redirect("platform-list")
        # messages.error(request, "password")
        # return redirect("sign-in")

class PlatformList(LoginRequiredMixin, View):
    redirect_field_name = None

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