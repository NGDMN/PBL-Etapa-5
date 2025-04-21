from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login
from .serializers import UserSerializer, LoginSerializer
import logging

logger = logging.getLogger(__name__)

# Create your views here.

class RegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        try:
            logger.info(f"Iniciando registro de usuário: {request.data.get('username')}")
            serializer = self.get_serializer(data=request.data)
            
            if serializer.is_valid():
                user = serializer.save()
                logger.info(f"Usuário registrado com sucesso: {user.username}")
                return Response({
                    'user': UserSerializer(user).data,
                    'message': 'User created successfully'
                }, status=status.HTTP_201_CREATED)
            else:
                logger.error(f"Erro na validação do formulário: {serializer.errors}")
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.exception(f"Erro crítico no registro: {str(e)}")
            return Response({
                'message': 'Um erro ocorreu durante o registro',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        try:
            logger.info(f"Tentativa de login: {request.data.get('username')}")
            serializer = self.get_serializer(data=request.data)
            
            if serializer.is_valid():
                username = serializer.validated_data['username']
                password = serializer.validated_data['password']
                user = authenticate(request, username=username, password=password)
                
                if user:
                    login(request, user)
                    logger.info(f"Login bem-sucedido: {username}")
                    return Response({
                        'user': UserSerializer(user).data,
                        'message': 'Login successful'
                    })
                
                logger.warning(f"Falha na autenticação: {username}")
                return Response({
                    'message': 'Credenciais inválidas'
                }, status=status.HTTP_401_UNAUTHORIZED)
            
            logger.error(f"Erro na validação do formulário de login: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.exception(f"Erro crítico no login: {str(e)}")
            return Response({
                'message': 'Um erro ocorreu durante o login',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
