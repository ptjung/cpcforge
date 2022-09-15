from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate, get_user_model, login
from django.db.models import Q
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from jwt import encode, decode
from django.conf import settings
from cpcforge.apps.accounts.serializers import UserSerializer
from utils import db_entry_point, pwd_hash, pwd_match, get_kpvals

User = get_user_model()

class CheckUsername(APIView):

    def post(self, request):
        try:
            idn = request.data['identifier']
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        queryset = User.objects.all()
        if not queryset.filter(Q(email__iexact=idn) | Q(username__iexact=idn)).first():
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class RetrieveUser(APIView):
    
    def get(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        try:
            idn = request.data['identifier'].strip()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        queryset = User.objects.all()
        if not (user := queryset.filter(Q(email__iexact=idn) | Q(username__iexact=idn)).first()):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateUser(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        User.objects.create_user(**serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class UserViewSet(GenericViewSet):
    serializer_class = UserSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

class VerifyUserAPI(GenericAPIView):
    """
    This view verifies a user by the presence of their JWT.

    --- Body Params ---
    :token (string) - The user's token
    """
    def post(self, request):
        token = request.data['token']
        try:
            payload = decode(token, settings.JWT_SECRET_KEY, algorithms = ['HS256'])
            return Response({ 'verified': True, 'payload': payload })
        except:
            return Response({ 'verified': False, 'payload': None })

class RetrieveUserAPI(GenericAPIView):
    """
    This view retrieves a user given an identifier. `pwd_check` may
    be set and is a return value for whether a given password
    matches the account password.

    --- Body Params ---
    :identifier (string) - The username or email of the user
    :password? (string) - The plaintext password of the user
    """
    def post(self, request):
        data = request.data
        identifier = data['identifier']
        checkable_pwd = data['password'] if 'password' in data else ''

        # Query by identifier
        db_user_result = db_entry_point['users'].find_one({ 'username': identifier })
        if not db_user_result:
            db_user_result = db_entry_point['users'].find_one({ 'email': identifier })

        # Status returned with payload (given identified account is found)
        if db_user_result:
            hashed_pwd = db_user_result['password']
            result = get_kpvals(db_user_result, ('_id', 'username', 'email'), (str, str, str))
            if pwd_match(checkable_pwd, hashed_pwd):
                result['token'] = encode(result, settings.JWT_SECRET_KEY, algorithm = 'HS256')
                result['status'] = 'succeed'
            else:
                result['status'] = 'fail'
        else:
            result = { 'status': 'fail' }
        return Response(result)

class RegisterUserAPI(GenericAPIView):
    """
    This view allows user registration.

    --- Body Params ---
    :username (string) - Username of the new user
    :email (string) - Email of the new user
    :password (string) - Password of the new user
    """
    def post(self, request):
        user_data = request.data
        try:
            db_entry_point['users'].insert_one({
                'username': user_data['username'],
                'email': user_data['email'],
                'password': pwd_hash(user_data['password'])
            })
            return Response({ 'status': 'success' })
        except:
            return Response({ 'status': 'fail' })

class X(GenericAPIView):

    def get(self, request):
        # Create user and save to the database
        user = User.objects.create_user('myusername', 'myemail@crazymail.com', 'mypassword')

        # Update fields and then save again
        user.first_name = 'John'
        user.last_name = 'Citizen'
        user.save()
        return Response({ 'status': 'success' })