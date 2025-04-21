#!/bin/bash

# Instalar dependências Python
pip install -r requirements.txt

# Aplicar migrações do Django
python manage.py migrate --noinput

# Coletar arquivos estáticos
python manage.py collectstatic --noinput 