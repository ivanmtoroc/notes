"""
WSGI configuration

It exposes the WSGI callable as a module-level variable
named 'application'
"""

# Python
import os

# Django
from django.core.wsgi import get_wsgi_application


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'notes.settings')

application = get_wsgi_application()
