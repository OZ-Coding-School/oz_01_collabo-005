from django.urls import path
from django.contrib.auth import views as auth_views
from app.users import views

app_name = "users"
urlpatterns = [
    path("login/", auth_views.LoginView.as_view(), name="login"),
    path("logout/", auth_views.LogoutView.as_view(), name="logout"),
    # path("google/login/", views.google_login, name="google_login"),
    # path("google/callback/", views.google_callback, name="google_callback"),
    # path('google/login/finish', views.GoogleLogin.as_view(), name="google_login_godjango")
]
