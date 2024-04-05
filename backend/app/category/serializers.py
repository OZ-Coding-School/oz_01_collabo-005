from rest_framework import serializers

from app.category.models import Category


# class CategorySerializer(serializers.ModelSerializer):
class CategorySerializer(serializers.HyperlinkedModelSerializer):
    clubs = serializers.HyperlinkedRelatedField(many=True, view_name='clubs included in category', read_only=True)

    class Meta:
        model = Category
        fields = ["name", "picture", "clubs"]
