from pytest import mark


class TestCadastroView:
    @mark.django_db
    def test_cadastro_view(self, client):
        response = client.get('/cadastro/')
        assert response.status_code == 200
