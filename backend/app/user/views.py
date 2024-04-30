from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class DeleteUserView(APIView):
    def delete(self, request, *args, **kwargs):
        user = request.user
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
