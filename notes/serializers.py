"""
Notes project serializers

Serializers to notes project models
"""

# Django Rest Framework
from rest_framework import serializers

# Notes models
from notes.models import Note


class NoteSerializer(serializers.ModelSerializer):
    """
    Note serializer

    Execute CRUD actions in the Note model
    """
    class Meta:
        model = Note
        fields = '__all__'
