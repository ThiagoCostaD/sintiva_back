from django.urls import path
from views import CadastroView

urlpatterns = [
    path('', CadastroView.as_view(), name='cadastro'),
]
