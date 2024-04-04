from rest_framework import serializers

from app.category.models import Category


# class CategorySerializer(serializers.HyperlinkedModelSerializer):
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'picture']
