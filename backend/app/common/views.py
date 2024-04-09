from django.shortcuts import render
from requests import Response
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse

# @api_view(["GET"])
# def api_root(request, format=None):
#     return Response({
#         "account": reverse("user-detail", request=request, format=format),
#         "category": reverse("category-list", request=request, format=format),
#         "club": reverse("club-list", request=request, format=format),
#     })
