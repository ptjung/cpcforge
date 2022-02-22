from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from jwt import encode, decode
from common.util import Config, coll_users, pwd_hash, pwd_match, get_kpvals

class VerifyUserView(GenericAPIView):
    """
    This view verifies a user by the presence of their JWT.

    --- Body Params ---
    :token (string) - The user's token
    """
    def post(self, request):
        data = request.data
        token = data['token']
        try:
            payload = decode(token, Config.JWT_SECRET_KEY, algorithms = ['HS256'])
            return Response({ 'alive': True, 'payload': payload })
        except:
            return Response({ 'alive': False, 'payload': None })

class RetrieveUserView(GenericAPIView):
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

        result = coll_users.find_one({ 'username': identifier })
        if not result:
            result = coll_users.find_one({ 'email': identifier })
        if result:
            hashed = result['password']
            result = get_kpvals(result, ('_id', 'username', 'email'), (str, str, str))
            if pwd_match(checkable_pwd, hashed):
                result['token'] = encode(result, Config.JWT_SECRET_KEY, algorithm = 'HS256')
        else:
            result = {}
        return Response(result)

class RegisterUserView(GenericAPIView):
    """
    This view allows user registration.

    --- Body Params ---
    :username (string) - Username of the new user
    :email (string) - Email of the new user
    :password (string) - Password of the new user
    """
    def post(self, request):
        data = request.data
        coll_users.insert_one({
            'username': data['username'],
            'email': data['email'],
            'password': pwd_hash(data['password']),
            'unlocked': []
        })
        return Response({})