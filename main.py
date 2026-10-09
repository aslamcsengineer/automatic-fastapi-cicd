from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="Automated FastAPI CI/CD",
    description="FastAPI application deployed using Jenkins and Docker",
    version="1.0.0"
)

class Item(BaseModel):
    name: str
    price: float

items = []

@app.get("/")
def home():
    return {
        "message": "FastAPI CI/CD application is running",
        "status": "success"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/items")
def get_items():
    return {"items": items}

@app.post("/items")
def create_item(item: Item):
    items.append(item.model_dump())
    return {
        "message": "Item created successfully",
        "item": item
    }
