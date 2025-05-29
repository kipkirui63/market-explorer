#!/bin/bash

# Kill any existing Django processes
pkill -f "python.*runserver" || true
pkill -f "manage.py" || true

# Wait a moment for processes to stop
sleep 2

# Change to backend directory
cd backend

# Run migrations
echo "Running Django migrations..."
python manage.py migrate

# Create superuser if needed
echo "Creating superuser if needed..."
python manage.py shell -c "from accounts.models import User; User.objects.filter(is_superuser=True).exists() or User.objects.create_superuser('admin', 'admin@example.com', 'admin123')" 2>/dev/null || true

# Start Django server
echo "Starting Django development server on port 8000..."
python manage.py runserver 0.0.0.0:8000