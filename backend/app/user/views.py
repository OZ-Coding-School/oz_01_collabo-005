from json import JSONDecodeError

import requests
from allauth.socialaccount.models import SocialAccount
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.serializers import SocialLoginSerializer
from dj_rest_auth.registration.views import SocialLoginView
from django.http import JsonResponse
from django.shortcuts import redirect, render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token

from app.user.models import User
from app.user.serializers import UserSerializer
from mysite.settings import env

# from app.user.serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer

# BASE_URL = "http://localhost:8000/api/account/"
# GOOGLE_CALLBACK_URI = BASE_URL
# GOOGLE_CALLBACK_URI = BASE_URL + "google/callback/"
# GOOGLE_CALLBACK_URI = BASE_URL + "google/callback/"
# state = env("STATE")


class UserViewSet(viewsets.ModelViewSet[User]):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# class GoogleLogin(SocialLoginView):
#     adapter_class = GoogleOAuth2Adapter
#     callback_url = GOOGLE_CALLBACK_URI
#     client_class = OAuth2Client
#     serializer_class = SocialLoginSerializer


# def google_login(request):
#     scope = "https://www.googleapis.com/auth/userinfo.email"
#     client_id = env("SOCIAL_AUTH_GOOGLE_CLIENT_ID")
#     return redirect(f"https://accounts.google.com/o/oauth2/v2/auth?client_id={client_id}&response_type=code&redirect_uri={GOOGLE_CALLBACK_URI}&scope={scope}")
#
#
# def google_callback(request):
#     client_id = env("SOCIAL_AUTH_GOOGLE_CLIENT_ID")
#     client_secret = env("SOCIAL_AUTH_GOOGLE_SECRET")
#     code = request.GET.get("code")
#
#     # access token 요청
#     token_request = requests.post(f"https://oauth2.googleapis.com/token?client_id={client_id}&client_secret={client_secret}&code={code}&grant_type=authorization_code&redirect_uri={GOOGLE_CALLBACK_URI}&state={state}")
#     token_req_json = token_request.json()
#     error = token_req_json.get("error")
#     if error is not None:
#         raise JSONDecodeError(error)
#     access_token = token_req_json.get("access_token")
#
#     # access token으로 이메일값 요청
#     email_request = requests.get(f"https://accounts.google.com/o/oauth2")
#     if email_request.status_code != 200:
#         return JsonResponse({"error": "Failed to get email"}, status=status.HTTP_400_BAD_REQUEST)
#     email_req_json = email_request.json()
#     email = email_req_json.get("email")
#
#     # 받은 이메일, access_token, code로 회원가입/로그인
#     try:
#         user = User.objects.get(email=email)
#         # 해당 이메일 유저 찾기
#         social_user = SocialAccount.objects.get(user=user)
#         if social_user.provider != "google":
#             return JsonResponse({"error": "No matching social type"}, status=status.HTTP_400_BAD_REQUEST)
#
#         data = {"access_token": access_token, "code": code}
#         accept = requests.post(f"{BASE_URL}google/login/finish", data=data)
#         accept_status = accept.status_code
#         if accept_status != 200:
#             return JsonResponse({"error": "Failed to signup"}, status=accept_status)
#
#         accept_json = accept.json()
#         accept_json.pop('user', None)
#         return JsonResponse(accept_json)
#
#     except SocialAccount.DoesNotExist:
#         # user는 있는데 SocialAccount가 없을때
#         return JsonResponse({"error": "Email exists but not social user"}, status=status.HTTP_400_BAD_REQUEST)

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
