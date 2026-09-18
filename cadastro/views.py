from rest_framework.viewsets import ModelViewSet

from .models import Cadastro
from .serializer import CadastroSerializer


class CadastroView(ModelViewSet):
    queryset = Cadastro.objects.all()
    serializer_class = CadastroSerializer
