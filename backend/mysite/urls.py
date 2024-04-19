"""
URL configuration for mysite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from app.common import views

# from app.common.views import api_root

urlpatterns = [
    path("admin/", admin.site.urls),
    path("__debug__/", include("debug_toolbar.urls")),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/schema/swagger-ui/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/schema/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    # path("", api_root),
    path("api/accounts/", include("dj_rest_auth.urls")),  # debug 숫자 빼기
    path("api/accounts/", include("dj_rest_auth.registration.urls")),
    path("api/accounts/", include("allauth.urls")),  # debug 왜 필요한지 잘 모르겠음
    path("api/users/", include("app.user.urls")),
    path("api/categories/", include("app.category.urls")),
    path("api/clubs/", include("app.club.urls")),
    path("api/clubs/<int:club_id>/", include("app.board.urls")),
    path("api/clubs/<int:club_id>/posts/<int:post_id>/", include("app.comment.urls")),
    # path("api/users/(?P<int:pk>)\d+/", include("app.activity.urls")),
    path("api/", include("app.activity.urls")),
]
