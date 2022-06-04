from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from jwt import encode, decode
from django.conf import settings
from utils import db_entry_point, get_kpvals

class CreatePlatformAPI(GenericAPIView):
    """
    This view allows a user to create their own custom platform. 

    --- Body Params ---
    :username (string) - The username of the platform creator
    :name (string) - The unique name of this platform
    :handle (string) - The unique URL handle of this platform
    :description (string) - The platform's description
    :contributors? (List[string]) - The list of contributors (by username, expects delimited by commas)
    :password? (string) = The potential password of this platform
    :mode? (integer) - The customization mode of this platform
    """
    def post(self, request):
        platform_data = request.data
        contribs = [platform_data['username'].strip()] + platform_data['contributors'].strip().strip(',').split(',')
        contribs = sorted(set(map(lambda c: c.lower(), contribs)), key = lambda c: -len(c))
        while contribs and not contribs[-1]:
            contribs.pop()
        try:
            db_entry_point['platforms'].insert_one({
                'name': platform_data['name'].strip(),
                'handle': platform_data['handle'].strip(),
                'description': platform_data['description'].strip(),
                'contributors': contribs,
                'problems': [],
                'password': platform_data['password'] if 'password' in platform_data else '',
                'mode': platform_data['mode'] if 'mode' in platform_data else 0
            })
            return Response({ 'status': 'success' })
        except:
            return Response({ 'status': 'fail' })

class AuthUserForPlatformAPI(GenericAPIView):
    """
    This view authenticates a user for a platform.

    --- Body Params ---
    :handle (string) - The unique handle of the platform
    """
    def post(self, request):
        handle = request.data['handle']
        plt_auth_token = encode({ 'authed_for': handle }, settings.JWT_SECRET_KEY, algorithm = 'HS256')
        return Response({ 'token': plt_auth_token })

class VerifyPlatformAuthAPI(GenericAPIView):
    """
    This view verifies a user for a platform by the presence of their JWT.

    --- Body Params ---
    :token (string) - The user's token
    :handle (string) - The platforms's handle
    """
    def post(self, request):
        req_data = request.data
        token, handle = req_data['token'], req_data['handle']
        try:
            payload = decode(token, settings.JWT_SECRET_KEY, algorithms = ['HS256'])
            return Response({ 'verified': payload['authed_for'] == handle })
        except:
            return Response({ 'verified': False })

class RetrievePlatformAPI(GenericAPIView):
    """
    This view retrieves a platform given a handle, else if not found,
    returns an empty body.

    --- Body Params ---
    :handle (string) - The unique handle of the platform
    """
    def post(self, request):
        handle = request.data['handle']
        db_platform_result = db_entry_point['platforms'].find_one({ 'handle': handle })
        if db_platform_result:
            parsed_platform_data = get_kpvals(db_platform_result,
                ('_id', 'mode', 'description', 'contributors', 'problems', 'name', 'password'),
                (str, int, str, None, None, str, str)
            )
            return Response({ 'status': 'success', 'result': parsed_platform_data })
        return Response({ 'status': 'fail' })

class RetrieveAllPlatformsAPI(GenericAPIView):
    """
    This view retrieves all platforms.

    --- Body Params ---
    None
    """
    def get(self, request):
        try:
            result = db_entry_point['platforms'].find({})
            if result:
                new_result = []
                for elem in result:
                    new_result.append(
                        get_kpvals(elem,
                            ('_id', 'name', 'handle', 'description', 'password', 'contributors', 'problems'),
                            (str, str, str, str, str, None, len)
                        )
                    )
            return Response({ 'status': 'success', 'data': new_result })
        except:
            return Response({ 'status': 'fail' })