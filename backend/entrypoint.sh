#!/bin/sh

#exec python manage.py migrate
#exec python manage.py runserver 0.0.0.0:8000
#python manage.py collectstatic

python manage.py makemigration --settings=mysite.settings.base
python manage.py migrat --settings=mysite.settings.base
python manage.py runserver 0.0.0.0:80 --settings=mysite.settings.base
#python manage.py runserver
#gunicorn --bind 0:8000 mysite.wsgi:application
