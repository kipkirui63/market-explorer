#!/usr/bin/env python
"""
Django server runner script
"""
import os
import sys
import subprocess
from pathlib import Path

# Add the backend directory to Python path
backend_dir = Path(__file__).parent / 'backend'
sys.path.insert(0, str(backend_dir))

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crispai.settings')

def main():
    """Run Django development server"""
    try:
        # Change to backend directory
        os.chdir(backend_dir)
        
        # Run migrations first
        print("Running Django migrations...")
        subprocess.run([sys.executable, 'manage.py', 'migrate'], check=True)
        
        # Create superuser if it doesn't exist
        print("Creating superuser if needed...")
        subprocess.run([
            sys.executable, 'manage.py', 'shell', '-c',
            "from accounts.models import User; User.objects.filter(is_superuser=True).exists() or User.objects.create_superuser('admin', 'admin@example.com', 'admin123')"
        ], check=False)
        
        # Start the development server
        print("Starting Django development server on port 8000...")
        subprocess.run([
            sys.executable, 'manage.py', 'runserver', '0.0.0.0:8000'
        ], check=True)
        
    except KeyboardInterrupt:
        print("\nShutting down Django server...")
    except subprocess.CalledProcessError as e:
        print(f"Error running Django command: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()