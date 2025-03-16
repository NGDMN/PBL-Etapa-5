# Portal de Apoio à Agricultura Familiar

Este projeto é uma aplicação web moderna que visa apoiar a agricultura familiar e promover a segurança alimentar, desenvolvida com React + Vite no frontend e Flask no backend.

## 🚀 Tecnologias Utilizadas

### Frontend
- React 18
- Vite
- React Router DOM
- Bootstrap 5
- React Icons
- React Hot Toast
- Context API para gerenciamento de estado

### Backend
- Flask
- Flask-CORS
- Python CSV para armazenamento de dados

## 📁 Estrutura do Projeto

```
portal-apoio-vite/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── context/       # Contextos React (CartContext)
│   ├── pages/         # Páginas da aplicação
│   ├── styles/        # Arquivos CSS
│   └── services/      # Serviços e APIs
```

## 🔧 Instalação

1. Clone o repositório
```bash
git clone https://github.com/NGDMN/PBL-Etapa-5.git
cd PBL-Etapa-5
```

2. Instale as dependências do Frontend
```bash
cd portal-apoio-vite
npm install
```

3. Instale as dependências do Backend
```bash
pip install flask flask-cors
```

## 🚀 Executando o Projeto

1. Inicie o Backend
```bash
python app.py
```

2. Inicie o Frontend
```bash
cd portal-apoio-vite
npm run dev
```

## 📋 Funcionalidades

- **Marketplace**: Sistema de compra e venda de produtos agrícolas
- **Carrinho de Compras**: Gerenciamento completo de carrinho
- **Formulário de Contato**: Sistema de mensagens com validação
- **Treinamentos**: Acesso a cursos e materiais educativos

## 🔄 Melhorias da Etapa 5

- Migração completa para React
- Implementação de Context API
- Sistema de carrinho persistente
- Interface moderna com Bootstrap 5
- Validações em tempo real
- Integração com backend Flask

## 👥 Autores

- [Seu Nome]

## 📝 Licença

Este projeto está sob a licença [MIT](https://choosealicense.com/licenses/mit/)
