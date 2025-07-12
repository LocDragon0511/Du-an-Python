from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Cho phép frontend gọi tới API

# 👉 Thay bằng API KEY của bạn
GEMINI_API_KEY = "AIzaSyAdxi5LVD49DQ4BvyP9ARo4PNYZHSRa9nM"

# ✅ Sử dụng model mới nhất
GEMINI_MODEL = "gemini-2.5-pro"  # hoặc "gemini-1.5-pro-002"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1/models/{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}"
print("✅ Đang dùng Gemini model:", GEMINI_MODEL)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    try:
        headers = {"Content-Type": "application/json"}
        payload = {
            "contents": [
                {
                    "role": "user",  # Có thể thêm để rõ vai trò
                    "parts": [{"text": user_message}]
                }
            ]
        }

        response = requests.post(GEMINI_URL, headers=headers, json=payload)
        response.raise_for_status()
        gemini_data = response.json()

        # Đọc phản hồi
        reply = gemini_data["candidates"][0]["content"]["parts"][0]["text"]

    except Exception as e:
        reply = f"❌ Lỗi từ Gemini: {e}"

    return jsonify({"answer": reply})

if __name__ == "__main__":
    app.run(debug=True)
