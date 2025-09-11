from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}  # Password is accepted, but never returned
        }

    def create(self, validated_data):
        # Create user securely with hashed password
        user = User.objects.create_user(**validated_data)
        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at', 'author']
        
        # We don't want the frontend to set the author manually
        # Backend will set it automatically based on the logged-in user
        extra_kwargs = {
            'author': {'read_only': True}
        }