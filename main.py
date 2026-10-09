from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
app = FastAPI(
    title="Automated FastAPI CI/CD",
    description="FastAPI application deployed using Jenkins and Docker",
    version="1.0.0"
)
# Serve dashboard CSS and JavaScript
app.mount("/static", StaticFiles(directory="static"), name="static")


# Web dashboard
@app.get("/dashboard", include_in_schema=False)
def dashboard():
    return FileResponse("static/index.html")

class Item(BaseModel):
    name: str
    price: float

items = []

@app.get("/")
def home():
    return {
        "message": "FastAPI automatically deployed by Jenkins CI/CD!",
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
