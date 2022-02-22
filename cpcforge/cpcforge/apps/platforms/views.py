from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from common.util import coll_platforms, get_kpvals

class CreatePlatformView(GenericAPIView):
    """
    This view allows a user to create their own custom platform. 

    --- Body Params ---
    :username (string) - The username of the platform creator
    :name (string) - The unique name of this platform
    :handle (string) - The unique URL handle of this platform
    :contributors? (List[string]) - The list of contributors (by username)
    :password? (string) = The potential password of this platform
    :mode? (integer) - The customization mode of this platform
    """
    def post(self, request):
        data = request.data
        contribs = [data['username'].strip()] + data['contributors'].strip().strip(',').split(',')
        contribs = sorted(set(contribs), key = lambda c: -len(c))
        while contribs and not contribs[-1]:
            contribs.pop()
        coll_platforms.insert_one({
            'name': data['name'].strip(),
            'handle': data['handle'].strip(),
            'contributors': contribs,
            'password': data['password'] if 'password' in data else '',
            'mode': data['mode'] if 'mode' in data else 0
        })
        return Response({})

class RetrievePlatform(GenericAPIView):
    """
    This view retrieves a platform given a handle, else if not found,
    returns an empty body.

    --- Body Params ---
    :handle (string) - The unique handle of the platform
    """
    def post(self, request):
        data = request.data
        handle = data['handle']
        result = coll_platforms.find_one({ 'handle': handle })
        if result:
            result = get_kpvals(result, ('_id', 'mode', 'contributors', 'name', 'password'), (str, int, lambda e: e, str, str))
        return Response(({}, result)[bool(result)])

class RetrieveAllPlatforms(GenericAPIView):
    """
    This view retrieves all platforms.

    --- Body Params ---
    None
    """
    def get(self):
        result = coll_platforms.find({})
        return Response(({}, result)[bool(result)])