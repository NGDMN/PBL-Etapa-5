#!/bin/bash

# Instalar dependências Python
pip install -r requirements.txt

# Instalar dependências Node e fazer build do frontend
cd portal-apoio-vite
npm install
npm run build 