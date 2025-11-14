# SlideForgeAi - Frontend (TypeScript + React)

This is a React 18 frontend for SlideForgeAi written entirely in **TypeScript (.tsx)**.

## Tech Stack
- React 18.2
- TypeScript 5.2
- React Router v6
- Axios for API calls
- React Scripts (Create React App)

## Setup & Run (WSL Ubuntu)

### 1. Install dependencies:
```bash
cd /root/.vscode-remote-containers/dist/App/frontend
npm install --legacy-peer-deps
```

### 2. Start the dev server:
```bash
export REACT_APP_API="http://localhost:5000"
npm start
```

The app will open at `http://localhost:3000`.

### 3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── App.tsx                 # Main app with routing
├── index.tsx               # React root
├── index.css               # Global styles
├── services/
│   └── api.ts             # Axios API client with auth interceptor
└── components/
    ├── Header.tsx          # App header with user & logout
    ├── Login.tsx           # Login form
    ├── Signup.tsx          # Signup form
    ├── Gallery.tsx         # Presentations gallery
    ├── Create.tsx          # Create new presentation
    └── Editor.tsx          # Slide editor
```

## TypeScript Features
- Strict type checking enabled
- Full type safety across all components
- Proper interface/type definitions for props
- Async/await typing with proper error handling
- React Hooks with typed state and effects

## Notes
- All components are `.tsx` files with proper TypeScript types
- Used `--legacy-peer-deps` flag due to peer dependency conflicts with `react-scripts` and TypeScript
- API endpoints expect the backend running at `http://localhost:5000` (configurable via `REACT_APP_API` env var)
