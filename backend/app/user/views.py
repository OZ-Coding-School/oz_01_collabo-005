from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password
from requests import Request

# from allauth.socialaccount.models import SocialAccount
# from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
# from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# from dj_rest_auth.registration.serializers import SocialLoginSerializer
# from dj_rest_auth.registration.views import SocialLoginView
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from app.club.permissions import IsOwnerOrReadOnly
from app.user.models import User
from app.user.serializers import SignupSerializer, UserSerializer

# class SignupView(APIView):
#     def post(self, request):
#         serializer = SignupSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             # token = RefreshToken.for_user(user)
#             token = TokenObtainPairSerializer.get_token(user)
#             refresh_token = str(token)
#             access_token = str(token.access_token)
#             # return Response(serializer.data, status=status.HTTP_201_CREATED)
#             response = Response({
#                 "user": serializer.data,
#                 "token": {
#                     "access": access_token,
#                     "refresh": refresh_token,
#                 }
#             }, status=status.HTTP_201_CREATED)
#             response.set_cookie("access", access_token, httponly=True)
#             response.set_cookie("refresh", refresh_token, httponly=True)
#             return response
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class SignupView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = SignupSerializer


# class LoginView(APIView):
#     def post(self, request: Request):
#         email = request.data["email"]
#         password = request.data["password"]
#
#         user = User.objects.get(email=email)
#         if user is None:
#             return Response({"message": "not exists"}, status=status.HTTP_400_BAD_REQUEST)
#
#         if not check_password(password, user.password):
#             return Response({"message": "wrong password"}, status=status.HTTP_400_BAD_REQUEST)
#
#         token = TokenObtainPairSerializer.get_token(user)
#         refresh_token = str(token)
#         access_token = str(token.access_token)
#         response = Response(
#             {"message": "login success", "token": {"access": access_token, "refresh": refresh_token}},
#             status=status.HTTP_200_OK,
#         )
#         response.set_cookie("access", access_token, httponly=True)
#         response.set_cookie("refresh", refresh_token, httponly=True)
#         return response
#
#
# class LogoutView(APIView):
#     def delete(self, request):
#         response = Response(status=status.HTTP_204_NO_CONTENT)
#         response.delete_cookie("access")
#         response.delete_cookie("refresh")
#         return response


class UserView(generics.RetrieveUpdateDestroyAPIView[User]):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


# class UserViewSet(viewsets.ModelViewSet[User]):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


# BASE_URL = "http://localhost:8000/api/account/"
# GOOGLE_CALLBACK_URI = BASE_URL
# GOOGLE_CALLBACK_URI = BASE_URL + "google/callback/"
# GOOGLE_CALLBACK_URI = BASE_URL + "google/callback/"
# state = env("STATE")


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
