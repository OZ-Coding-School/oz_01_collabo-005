from django.urls import include, path

from app.user import views

urlpatterns = [
    path("", include("dj_rest_auth.urls")),
    path("", include("dj_rest_auth.registration.urls")),
    path("", include("allauth.urls")),
    path("user/leave/", views.DeleteUserView.as_view(), name="user-detail"),
]
