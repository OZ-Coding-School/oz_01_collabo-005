from typing import Any

from rest_framework import permissions
from rest_framework.request import Request
from rest_framework.views import APIView


class IsLeaderOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request: Request, view: APIView, obj: Any) -> bool:
        if request.method in permissions.SAFE_METHODS:
            return True
        # return request.user == obj.leader
        # print(str(request.user) == obj.leader.email)
        return str(request.user) == getattr(obj, "leader.email", None)
