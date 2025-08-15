from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "20669"

CORS(app, resources={r"/api/*": {"origins": "*"}})
jwt = JWTManager(app)

# --- Mock Data ---
USERS = [{"email": "test@test.com", "password": "1234", "name": "Test User"}]
PRODUCTS = [
    {"id": 1, "title": "Shoe", "price": 40, "description": "Cool sneakers"},
    {"id": 2, "title": "Bag",  "price": 70, "description": "Leather bag"},
    {"id": 3, "title": "Cap",  "price": 15, "description": "Minimalist cap"},
]

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify(status="ok")

@app.route("/api/products", methods=["GET"])
def get_products():
    return jsonify(PRODUCTS)

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email", "").lower()
    password = data.get("password", "")
    user = next((u for u in USERS if u["email"] == email and u["password"] == password), None)
    if not user:
        return jsonify(error="Invalid credentials"), 401
    token = create_access_token(identity={"email": user["email"], "name": user["name"]})
    return jsonify(access_token=token, user={"email": user["email"], "name": user["name"]})

@app.route("/api/me", methods=["GET"])
@jwt_required()
def me():
    return jsonify(user=get_jwt_identity())

@app.route("/api/checkout", methods=["POST"])
@jwt_required()
def checkout():
    identity = get_jwt_identity()
    data = request.get_json()
    cart = data.get("cart", [])
    if not cart:
        return jsonify(error="Cart is empty"), 400
    total = sum(item.get("price", 0) for item in cart)
    return jsonify(message="Order placed", placed_by=identity, total=total, count=len(cart))

if __name__ == "__main__":
    app.run(debug=True)
