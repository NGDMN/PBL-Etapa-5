from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'price', 'stock', 'image', 'created_at', 'updated_at', 'average_rating')

    def get_average_rating(self, obj):
        return obj.average_rating 