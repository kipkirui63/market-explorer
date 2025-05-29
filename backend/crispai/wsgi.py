"""
WSGI config for crispai project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crispai.settings')

application = get_wsgi_application()