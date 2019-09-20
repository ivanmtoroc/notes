"""
Notes views

Views to notes project
"""

# Django
from django.shortcuts import render


def vue(request):
    """
    vue return the Vue project build
    """
    return render(request, template_name='index.html')
