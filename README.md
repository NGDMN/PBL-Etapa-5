# Portal de Apoio à Agricultura Familiar

Este projeto é uma aplicação web moderna que visa apoiar a agricultura familiar e promover a segurança alimentar, desenvolvida com React + Vite no frontend e Django + DRF no backend.

## 🚀 Tecnologias Utilizadas

### Frontend
- React 18
- Vite
- React Router DOM v7
- Bootstrap 5
- React Icons
- Axios para requisições HTTP
- Context API para gerenciamento de estado

### Backend
- Django 5.0
- Django REST Framework
- PostgreSQL
- Django CORS Headers
- Python-dotenv

## 📁 Estrutura do Projeto

```
projeto/
├── backend/
│   ├── portal_api/        # Configurações principais do Django
│   ├── users/            # App de usuários
│   ├── products/         # App de produtos
│   ├── reviews/          # App de avaliações
│   ├── media/           # Arquivos de mídia
│   ├── manage.py        # Script de gerenciamento Django
│   ├── requirements.txt # Dependências Python
│   └── vercel.json      # Configuração do Vercel para o backend
│
└── portal-apoio-vite/
    ├── src/
    │   ├── components/  # Componentes React
    │   ├── pages/      # Páginas da aplicação
    │   ├── services/   # Serviços e configuração da API
    │   └── styles/     # Arquivos CSS
    ├── public/         # Arquivos públicos
    ├── package.json    # Dependências Node.js
    └── vite.config.js  # Configuração do Vite
```

## 🔧 Instalação

1. Clone o repositório
```bash
git clone https://github.com/NGDMN/PBL-Etapa-5.git
cd PBL-Etapa-5
```

2. Configure o Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
```

3. Configure o Frontend
```bash
cd portal-apoio-vite
npm install
```

4. Configure as variáveis de ambiente:

Backend (.env):
```
DEBUG=False
ALLOWED_HOSTS=.vercel.app
DATABASE_URL=sua_url_do_banco_de_dados
DJANGO_SECRET_KEY=sua_chave_secreta
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

Frontend (.env):
```
VITE_API_URL=http://localhost:8000
```

## 🚀 Executando o Projeto

1. Inicie o Backend
```bash
cd backend
python manage.py runserver
```

2. Inicie o Frontend
```bash
cd portal-apoio-vite
npm run dev
```

## 📋 Funcionalidades

- **Autenticação**: Sistema completo de registro e login
- **Marketplace**: Sistema de compra e venda de produtos agrícolas
- **Carrinho de Compras**: Gerenciamento completo de carrinho
- **Avaliações**: Sistema de reviews de produtos
- **Perfil de Usuário**: Gerenciamento de dados do usuário

## 🔄 Deploy

O projeto está configurado para deploy no Vercel:

1. Backend: https://pbl-omega-backend.vercel.app
2. Frontend: https://frontend-nu-nine-45.vercel.app

## 👥 Autor

- Neil Goodman

## 📝 Licença

Este projeto está sob a licença MIT.



