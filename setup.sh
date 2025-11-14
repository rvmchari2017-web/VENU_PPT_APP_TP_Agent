#!/bin/bash
set -e

echo "🚀 Starting SlideForgeAi Setup with TypeScript..."
echo ""

# Frontend setup
echo "📦 Installing frontend dependencies (TypeScript)..."
cd /root/.vscode-remote-containers/dist/App/frontend
npm config set strict-ssl false
npm install --legacy-peer-deps

echo "✅ Frontend setup complete!"
echo ""
echo "🎉 All done! Now you can run:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd /root/.vscode-remote-containers/dist/App/backend"
echo "  source venv/bin/activate"
echo "  export FLASK_APP=app.py"
echo "  export FLASK_ENV=development"
echo "  python app.py"
echo ""
echo "Terminal 2 (Frontend with TypeScript):"
echo "  cd /root/.vscode-remote-containers/dist/App/frontend"
echo "  export REACT_APP_API='http://localhost:5000'"
echo "  npm start"
echo ""
echo "Then open:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"

