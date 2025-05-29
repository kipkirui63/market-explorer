#!/bin/bash

# Start Django backend in background
cd backend
python manage.py runserver 0.0.0.0:8000 &
DJANGO_PID=$!
cd ..

# Wait for Django to start
sleep 3

# Check if Django is running
if curl -s http://localhost:8000/api/user/ > /dev/null 2>&1; then
    echo "Django backend running on port 8000"
else
    echo "Django backend failed to start"
fi

# Keep script running
wait $DJANGO_PID