from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from jwt import encode, decode
from common.util import Config, coll_platforms, get_kpvals

class CreateProblemAPI(GenericAPIView):
    """
    This view allows a user to create their own custom problem. 

    --- Body Params ---
    :platform (string) - The platform for hosting this problem, given by its handle
    :name (string) - The unique name of this problem
    :handle (string) - The unique URL handle of this problem
    :description (string) - The problem's description
    :author (string) - The username of the platform creator
    :testCasesIn (List[string]) - The input test cases (`n`th input correlates with `n`th output)
    :testCasesOut (List[string]) - The output test cases (`n`th input correlates with `n`th output)
    """
    def post(self, request):
        platform_data = request.data
        try:
            new_problem = {
                'name': platform_data['name'].strip(),
                'handle': platform_data['handle'].strip(),
                'description': platform_data['description'].strip(),
                'author': platform_data['author'].strip(),
                'testCasesIn': platform_data['testCasesIn'],
                'testCasesOut': platform_data['testCasesOut']
            }
            
            coll_platforms.find_one_and_update(
                { 'handle': platform_data['platform'] },
                { '$push': { 'problems': new_problem } }
            )
            return Response({ 'status': 'success' })
        except:
            return Response({ 'status': 'fail' })