"""
Notes project models

Models to manage the record of notes
"""

# Django
from django.db import models


class Note(models.Model):
    """
    Note model
    """
    title = models.CharField(max_length=50)
    note = models.CharField(max_length=500)
