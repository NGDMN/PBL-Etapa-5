from rest_framework import viewsets, permissions
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]  # Permite que qualquer um envie mensagens
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]  # Apenas admin pode listar/ver/editar/deletar mensagens
        return [permissions.AllowAny()]  # Qualquer um pode criar mensagens 