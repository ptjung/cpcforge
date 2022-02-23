import imp
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from datetime import datetime
from common.util import coll_submit_logs, coll_platforms, runner

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
            
class SubmitProblemAPI(GenericAPIView):
    """
    This view allows a user to submit a problem solution.

    --- Body Params ---
    :username (string) - The username of the submitter
    :pltHandle (string) - The platform's unique handle
    :probHandle (string) - The problem's unique handle
    :writtenCode (string) - The user's written code (just Python, for now!)
    """
    def post(self, request):
        questn_data = request.data
        problem_lst = coll_platforms.find_one({ 'handle': questn_data['pltHandle'] })['problems']
        for prob in problem_lst:
            # Finding the specific problem of the given handles
            if prob['handle'] == questn_data['probHandle']:
                result = runner.solve_tcases(questn_data['writtenCode'], prob['testCasesIn'], prob['testCasesOut'])
                coll_submit_logs.insert_one({
                    'date': '{date:%Y-%m-%d_%H:%M:%S}'.format( date=datetime.now() ),
                    'username': questn_data['username'],
                    'platform': questn_data['pltHandle'],
                    'problem': questn_data['probHandle'],
                    'result': result
                })
                return Response({ 'status': 'success', 'result': result })
        return Response({ 'status': 'fail' })