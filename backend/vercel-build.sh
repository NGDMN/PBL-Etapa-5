#!/bin/bash
set -e

# Debug - mostrar diretório atual e arquivos
echo "Diretório atual: $(pwd)"
ls -la

# Instalar dependências Python
echo "Instalando dependências..."
pip install -r requirements.txt

# Configurar variáveis de ambiente
export DJANGO_SETTINGS_MODULE=portal_api.settings
export PYTHONPATH=/vercel/path/0

# Testar conexão com o banco de dados
echo "Testando conexão com o banco de dados..."
python -c "
import os
from urllib.parse import urlparse
db_url = os.environ.get('DATABASE_URL')
print(f'Trying to connect to: {urlparse(db_url).netloc}')
"

# Aplicar migrações do Django
echo "Aplicando migrações..."
python manage.py migrate --noinput

# Coletar arquivos estáticos
echo "Coletando arquivos estáticos..."
python manage.py collectstatic --noinput

echo "Build concluído com sucesso!" 