# House Price Prediction Frontend

React frontend for the House Price Prediction API.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the frontend directory (optional):
```
REACT_APP_API_URL=http://localhost:8000
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Backend Setup

Make sure the FastAPI backend is running on `http://localhost:8000` (or update the API_URL in `.env`).

To start the backend:
```bash
cd ../backend
uvicorn app:app --reload
```

