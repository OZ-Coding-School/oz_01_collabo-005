from django.urls import path, include
from django.contrib.auth import views as auth_views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from app.user.views import UserViewSet, google_login, google_callback, GoogleLogin

# from app.user.views import UserRegisterAPIView, UserLoginAPIView

# app_name = "user"
router = DefaultRouter()
router.register(r"", UserViewSet, basename='user')

urlpatterns = [
    path("", include(router.urls)),
    path("google/login/", google_login, name="google-login"),
    path("google/callback/", google_callback, name="google-callback"),
    path('google/login/finish', GoogleLogin.as_view(), name="google-login-todjango")
    # path("google/", views.GoogleLogin.as_view(), name="google")
    # path("sign-up/", UserRegisterAPIView.as_view(), name="sign-up"),
    # path("sign-in/", UserLoginAPIView.as_view(), name="sign-in"),
    # path("refresh/", TokenRefreshView.as_view(), name="refresh"),

    # path("", UserView.as_view(), name="user"),
    # path("login/", auth_views.LoginView.as_view(), name="login"),
    # path("logout/", auth_views.LogoutView.as_view(), name="logout"),
]
