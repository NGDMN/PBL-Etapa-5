from rest_framework import serializers
from .models import ContactMessage

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']
        read_only_fields = ['created_at']

    def validate_message(self, value):
        if len(value) < 30:
            raise serializers.ValidationError("A mensagem deve ter pelo menos 30 caracteres.")
        if len(value) > 500:
            raise serializers.ValidationError("A mensagem não pode ter mais de 500 caracteres.")
        if ';' in value:
            raise serializers.ValidationError("A mensagem não pode conter o caractere ponto e vírgula (;).")
        return value

    def validate_name(self, value):
        if ' ' not in value:
            raise serializers.ValidationError("Por favor, insira seu nome completo (incluindo sobrenome).")
        return value 