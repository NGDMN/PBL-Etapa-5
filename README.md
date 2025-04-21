# Portal de Apoio à Agricultura Familiar

Este projeto é uma aplicação web moderna que visa apoiar a agricultura familiar e promover a segurança alimentar, desenvolvida com React + Vite no frontend e Django + DRF no backend.

## 🚀 Tecnologias Utilizadas

### Frontend
- React 18
- Vite 6
- React Router DOM v7
- Bootstrap 5
- React Icons
- React Bootstrap
- Axios para requisições HTTP
- Context API para gerenciamento de estado
- Estratégia de fallback para dados offline

### Backend
- Django 5.0
- Django REST Framework
- SQLite (desenvolvimento local e banco em memória para Vercel)
- Django CORS Headers
- Python-dotenv
- Autenticação customizada

## 📁 Estrutura do Projeto

```
projeto/
├── backend/
│   ├── portal_api/        # Configurações principais do Django
│   ├── users/            # App de usuários
│   ├── products/         # App de produtos
│   ├── reviews/          # App de avaliações
│   ├── contact/          # App de contato
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
    │   ├── context/    # Contextos React
    │   ├── data/       # Dados mockados para desenvolvimento
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
VERCEL_ENV=production
DJANGO_SECRET_KEY=sua_chave_secreta
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

Frontend (.env):
```
VITE_API_URL=http://localhost:8000
USE_MOCK_DATA=true
VITE_USE_MOCK_DATA=true
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

## 🔄 Estratégias de Fallback

O projeto implementa várias estratégias de tolerância a falhas:

- **Modo Offline**: Usa dados mockados quando a API está indisponível
- **Tratamento de Imagens**: Fallbacks para imagens não carregadas
- **Banco de Dados**: Utiliza SQLite em memória no ambiente Vercel
- **Autenticação**: Simulação de login quando o backend está indisponível

## 📋 Funcionalidades

- **Autenticação**: Sistema completo de registro e login
- **Marketplace**: Sistema de compra e venda de produtos agrícolas
- **Carrinho de Compras**: Gerenciamento completo de carrinho
- **Avaliações**: Sistema de reviews de produtos
- **Perfil de Usuário**: Gerenciamento de dados do usuário
- **Modo Responsivo**: Design adaptável para dispositivos móveis e desktop

## 🔄 Deploy

O projeto está configurado para deploy no Vercel:

1. Frontend: Configurado com build estático
2. Backend: Configurado com SQLite em memória por conta das limitações do filesystem
3. Configurações CORS adequadas para permitir comunicação entre serviços

### URLs de Deploy
1. Frontend: https://front-sable-five.vercel.app
2. API: https://pbl-etapa-5.vercel.app/api

## 🗂️ Sobre o node_modules

A pasta `node_modules` contém todas as dependências JavaScript do projeto e:

- **Não é necessária para versionamento**: Está incluída no .gitignore
- **É gerada automaticamente**: Com o comando `npm install`
- **Não precisa ser enviada para deploy**: O Vercel instala as dependências durante o build

Como prática recomendada:
- Nunca commit a pasta node_modules no Git
- Sempre mantenha o package.json e package-lock.json atualizados
- Use `npm install` após clonar o repositório

## 👥 Autor

- Neil Goodman

## 📝 Licença

Este projeto está sob a licença MIT.



