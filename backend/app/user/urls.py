from django.contrib.auth import views as auth_views
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from app.user import views
# from app.user.views import UserView

# from app.user.views import UserViewSet, google_login, google_callback, GoogleLogin

# from app.user.views import UserRegisterAPIView, UserLoginAPIView

# app_name = "user"
# router = DefaultRouter()
# router.register(r"", views.UserView, basename="user")

# user_detail = UserView.as_view()


urlpatterns = [
        # path("", include(router.urls)),
        # path("<int:pk>", views.UserView.as_view(), name="user-detail"),
        path("", include("dj_rest_auth.urls")),  # debug 숫자 빼기
        path("", include("dj_rest_auth.registration.urls")),
        path("", include("allauth.urls")),  # debug 왜 필요한지 잘 모르겠음
        path("user/", views.DeleteUserView.as_view(), name="user-detail"),
        # path("<int:pk>", user_detail, name="user_detail"),
        # path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
        # path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
        # path("signup/", views.SignupView.as_view(), name="signup"),
        # path("login/", views.LoginView.as_view(), name="login"),
        # path("logout/", views.LogoutView.as_view(), name="logout"),
        # path("google/login/", google_login, name="google-login"),
        # path("google/callback/", google_callback, name="google-callback"),
        # path('google/login/finish', GoogleLogin.as_view(), name="google-login-todjango")
        # path("google/", views.GoogleLogin.as_view(), name="google")
        # path("sign-up/", UserRegisterAPIView.as_view(), name="sign-up"),
        # path("sign-in/", UserLoginAPIView.as_view(), name="sign-in"),
        # path("refresh/", TokenRefreshView.as_view(), name="refresh"),
        # path("", UserView.as_view(), name="user"),
        # path("login/", auth_views.LoginView.as_view(), name="login"),
        # path("logout/", auth_views.LogoutView.as_view(), name="logout"),
]
