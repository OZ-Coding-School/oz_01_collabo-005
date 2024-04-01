from django.urls import path, include
from django.contrib.auth import views as auth_views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from app.user import views
from app.user.views import UserViewSet

# from app.user.views import UserRegisterAPIView, UserLoginAPIView

# app_name = "user"
router = DefaultRouter()
router.register(r"", UserViewSet, basename='user')

urlpatterns = [
    path("", include(router.urls))
    # path("sign-up/", UserRegisterAPIView.as_view(), name="sign-up"),
    # path("sign-in/", UserLoginAPIView.as_view(), name="sign-in"),
    # path("refresh/", TokenRefreshView.as_view(), name="refresh"),

    # path("", UserView.as_view(), name="user"),
    # path("login/", auth_views.LoginView.as_view(), name="login"),
    # path("logout/", auth_views.LogoutView.as_view(), name="logout"),
    # path("google/login/", views.google_login, name="google_login"),
    # path("google/callback/", views.google_callback, name="google_callback"),
    # path('google/login/finish', views.GoogleLogin.as_view(), name="google_login_godjango")
]
