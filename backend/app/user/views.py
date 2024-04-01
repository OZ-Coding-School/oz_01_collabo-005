from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.serializers import SocialLoginSerializer
from dj_rest_auth.registration.views import SocialLoginView
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView, status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token

from app.user.models import User
from app.user.serializers import UserSerializer
# from app.user.serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer

BASE_URL = "http://localhost:8000/accout/rest-auth/"
GOOGLE_CALLBACK_URI = BASE_URL + "google/callback/"


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = GOOGLE_CALLBACK_URI
    client_class = OAuth2Client
    serializer_class = SocialLoginSerializer


# class UserRegisterAPIView(APIView):
#     def post(self, request: Request):
#         serializer = UserRegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             token: Token = TokenObtainPairSerializer.get_token(user)
#             res = Response(
#                 {
#                     "user": serializer.data,
#                     "message": "registration success",
#                     "token": {
#                         "access": str(token.access_token),
#                         "refresh": str(token),
#                     },
#                 },
#                 status=status.HTTP_200_OK
#             )
#             return res
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
# class UserLoginAPIView(APIView):
#     def post(self, request: Request):
#         token_serializer = TokenObtainPairSerializer(data=request.data)
#         if token_serializer.is_valid():
#             user = token_serializer.user
#             serializer = UserLoginSerializer(user)
#             return Response(
#                 {
#                     "user": serializer.data,
#                     "message": "login success",
#                     "token": token_serializer.validated_data,
#                 },
#                 status=status.HTTP_200_OK
#             )
#         return Response(token_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class UserView(viewsets.ReadOnlyModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

# class PingAPIView(APIView):
#     permission_classes = [IsAuthenticated]
#
#     def get(self, request: Request):
#         return Response(status=status.HTTP_200_OK)
