from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class CreateUserView(APIView):
    def post(self, request):
        data = {"x": 5}
        return Response({"status": "success", "data": data}, status=status.HTTP_200_OK)