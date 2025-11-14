# Backend for SlideForgeAi (minimal)

Requirements:

- Python 3.8+
- Install requirements: `pip install -r requirements.txt`

Run:

```
export FLASK_APP=app.py
export FLASK_ENV=development
python app.py
```

API Endpoints (minimal):

- POST /signup {username, password}
- POST /login {username, password} -> returns {token}
- GET /presentations (Authorization: Bearer <token>)
- POST /presentations {title, slide_count}
- POST /upload-image (file multipart)
- POST /generate {mode, text, title, slide_count, ...}

Note: This is a scaffold. Replace the placeholder generation with a real LLM and real image APIs.
