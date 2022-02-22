from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from common.util import coll_platforms

class CreatePlatformView(GenericAPIView):
    """
    This view allows a user to create their own custom platform. 

    --- Body Params ---
    :name (string) - The unique name of this platform
    :contributors? (List[string]) - The list of contributors (by username)
    :password? (string) = The potential password of this platform
    :mode? (integer) - The customization mode of this platform
    """
    def post(self, request):
        data = request.data
        coll_platforms.insert_one({
            'name': data['name'],
            'contributors': data['contributors'].split(','),
            'password': data['password'] if 'password' in data else '',
            'mode': data['mode'] if data['mode'] else 0
        })
        return Response({})

class RetrievePlatform(GenericAPIView):
    """
    This view retrieves a platform given a name, else if not found,
    returns an empty body.

    --- Body Params ---
    :name (string) - The name of the platform
    """
    def post(self, request):
        data = request.data
        name = data['name']
        result = coll_platforms.find_one({ 'name': name })
        return Response(({}, result)[bool(result)])

class RetrieveAllPlatforms(GenericAPIView):
    """
    This view retrieves all platforms.

    --- Body Params ---
    None
    """
    def post(self, request):
        data = request.data
        result = coll_platforms.find({})
        return Response(({}, result)[bool(result)])