#!/bin/sh

#exec python manage.py migrate
#exec python manage.py runserver 0.0.0.0:8000
python manage.py migrate
python manage.py runserver 0.0.0.0:8000