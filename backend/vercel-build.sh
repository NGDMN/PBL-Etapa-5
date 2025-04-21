#!/bin/bash
set -e

# Debug - mostrar diretório atual e arquivos
echo "Diretório atual: $(pwd)"
ls -la

# Definir variável de ambiente para indicar que estamos no Vercel
export VERCEL_ENV=production

# Mostrar variáveis de ambiente disponíveis (exceto senhas)
echo "Variáveis de ambiente disponíveis:"
printenv | grep -v -E "PASSWORD|SECRET|KEY"

# Instalar dependências Python
echo "Instalando dependências..."
pip install -r requirements.txt

# Verificando se DATABASE_URL está configurada
if [ -n "$DATABASE_URL" ]; then
  echo "DATABASE_URL está configurada. Usando PostgreSQL no Neon."
else
  echo "ATENÇÃO: DATABASE_URL não está configurada. Usando SQLite em memória."
fi

# Configurar variáveis de ambiente
export DJANGO_SETTINGS_MODULE=portal_api.settings
export PYTHONPATH=/vercel/path/0

# Verificar conexão com o banco de dados
python -c "
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portal_api.settings')
import django
django.setup()
from django.db import connections
try:
    connections['default'].ensure_connection()
    print('Conexão com o banco de dados foi estabelecida com sucesso!')
except Exception as e:
    print('Erro ao conectar ao banco de dados:', e)
    exit(1)
"

# Aplicar migrações do Django
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