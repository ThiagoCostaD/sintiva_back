from django.shortcuts import render
from rest_framework.views import APIView

from .models import Cadastro


class CadastroView(APIView):
    def get(self, request):
        cadastros = Cadastro.objects.all()
        return render(
            request, "cadastro/cadastro_list.html",
            {"cadastros": cadastros}
        )
