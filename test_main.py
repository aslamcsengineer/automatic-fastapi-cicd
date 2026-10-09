from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_home():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "success"


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_get_items():
    response = client.get("/items")
    assert response.status_code == 200
    assert "items" in response.json()


def test_create_item():
    response = client.post(
        "/items",
        json={"name": "Laptop", "price": 50000}
    )
    assert response.status_code == 200
    assert response.json()["message"] == "Item created successfully"
    assert response.json()["item"]["name"] == "Laptop"