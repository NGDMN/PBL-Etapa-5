#!/bin/bash

# Instalar dependências Python
pip install -r requirements.txt

# Configurar variáveis de ambiente
export DJANGO_SETTINGS_MODULE=portal_api.settings
export PYTHONPATH=/vercel/path/0

# Aplicar migrações do Django
python manage.py migrate --noinput

# Coletar arquivos estáticos
python manage.py collectstatic --noinput 