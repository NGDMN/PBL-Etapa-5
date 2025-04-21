#!/bin/bash

# Ativar ambiente virtual Python
python -m venv venv
source venv/bin/activate

# Instalar dependências Python
pip install -r requirements.txt

# Aplicar migrações do Django
python manage.py migrate

# Instalar dependências Node e fazer build do frontend
cd portal-apoio-vite
npm install
npm run build

# Voltar para o diretório raiz
cd ..

# Coletar arquivos estáticos do Django
python manage.py collectstatic --noinput 