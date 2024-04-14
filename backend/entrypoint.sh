#!/bin/sh

#exec python manage.py migrate
#exec python manage.py runserver 0.0.0.0:8000
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 0.0.0.0:80
#python manage.py runserver
#gunicorn --bind 0:8000 mysite.wsgi:application
