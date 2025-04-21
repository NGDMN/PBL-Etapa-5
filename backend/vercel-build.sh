#!/bin/bash
set -e

# Debug - mostrar diretório atual e arquivos
echo "Diretório atual: $(pwd)"
ls -la

# Definir variável de ambiente para indicar que estamos no Vercel
export VERCEL_ENV=production

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

# Aplicar migrações do Django - usando SQLite para ambiente Vercel
echo "Aplicando migrações..."
python manage.py migrate --noinput

# Coletar arquivos estáticos
echo "Coletando arquivos estáticos..."
python manage.py collectstatic --noinput

# Criar um superusuário padrão para fins de teste
echo "Criando superusuário padrão se não existir..."
python -c "
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portal_api.settings')
import django
django.setup()
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@exemplo.com', 'admin123')
    print('Superusuário criado com sucesso')
else:
    print('Superusuário já existe')
"

echo "Build concluído com sucesso!" 