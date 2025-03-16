from flask import Flask, request, jsonify, send_from_directory
from datetime import datetime
import csv
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/submit_form', methods=['POST'])
def submit_form():
    data = request.get_json()
    nome = data.get('nome')
    email = data.get('email')
    mensagem = data.get('mensagem')

    # Validações básicas
    if not nome or ' ' not in nome:
        return jsonify({"success": False, "message": "Por favor, insira seu nome completo (incluindo sobrenome)."})
    if not email or not validate_email(email):
        return jsonify({"success": False, "message": "Por favor, insira um e-mail válido."})
    if len(mensagem) < 30 or len(mensagem) > 500:
        return jsonify({"success": False, "message": "A descrição da mensagem deve ter entre 30 e 500 caracteres."})

    # Verificação de caracteres proibidos
    if ';' in mensagem:
        return jsonify({"success": False, "message": "A mensagem não pode conter o caractere ponto e vírgula (;)."})

    # Obter a data e hora atuais
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Verificar se o arquivo CSV já existe
    file_exists = os.path.isfile('mensagens.csv')

    # Salvar a mensagem em um arquivo CSV
    with open('mensagens.csv', 'a', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['Timestamp', 'Nome', 'Email', 'Mensagem']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames, quotechar='"', quoting=csv.QUOTE_ALL)

        # Escrever o cabeçalho apenas se o arquivo CSV for novo
        if not file_exists:
            writer.writeheader()

        # Escrever os dados
        writer.writerow({'Timestamp': timestamp, 'Nome': nome, 'Email': email, 'Mensagem': mensagem})

    return jsonify({"success": True, "message": "Mensagem enviada com sucesso!"})

def validate_email(email):
    import re
    email_regex = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    return re.match(email_regex, email) is not None

if __name__ == '__main__':
    app.run(debug=True)
