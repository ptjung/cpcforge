from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from common.util import coll_users, pwd_hash, pwd_match
from json import dumps

class RetrieveUserView(APIView):
    """
    This view retrieves a user given an identifier.

    --- Body Params ---
    :identifier (string) - The username or email of the user
    :password (string?) - The plaintext password of the user
    """
    def post(self, request):
        data = request.data
        identifier = data['identifier']
        checkable_pwd = data['password'] if 'password' in data else ''

        result = coll_users.find_one({ 'username': identifier })
        if not result:
            result = coll_users.find_one({ 'email': identifier })
        if result:
            result = {k: result[k] for k in ('username', 'email', 'password', 'unlocked')}
            result['pwd_check'] = pwd_match(checkable_pwd, result['password'])
        else:
            result = {'pwd_check': False}
        return Response(result, status=status.HTTP_200_OK)

class CreateUserView(APIView):
    """
    This view allows user creation.

    --- Body Params ---
    :username (string) - Username of the new user
    :email (string) - Email of the new user
    :password (string) - Password of the new user
    """
    def post(self, request):
        data = request.data
        try:
            result = coll_users.insert_one({
                'username': data['username'],
                'email': data['email'],
                'password': pwd_hash(data['password']),
                'unlocked': []
            })
            return Response(dumps(result, default=str), status=status.HTTP_200_OK)
        except:
            return Response({}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)