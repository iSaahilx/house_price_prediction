# Docker Setup for House Price Prediction
A comparison done between XGBoost and RandomForest to identify which tree based model works best.
Build using Microservices, Docker and MLOPS, CI/CD pipelines.
This project uses Docker Compose to run both the backend and frontend in separate containers.

## Prerequisites

- Docker installed on your system
- Docker Compose installed (usually comes with Docker Desktop)

## Quick Start

1. **Build and start all containers:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Commands

### Start containers in detached mode:
```bash
docker-compose up -d
```

### Stop containers:
```bash
docker-compose down
```

### View logs:
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Rebuild containers:
```bash
docker-compose up --build
```

### Stop and remove containers, volumes:
```bash
docker-compose down -v
```

## Container Details

### Backend Container
- **Port:** 8000
- **Base Image:** Python 3.10-slim
- **Framework:** FastAPI with Uvicorn
- **Health Check:** Enabled

### Frontend Container
- **Port:** 3000 (mapped to nginx port 80)
- **Base Image:** Node 18-alpine (build) + Nginx Alpine (production)
- **Server:** Nginx
- **Build:** Multi-stage build for optimized production image

## Environment Variables

### Frontend Build Args
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:8000)

To change the API URL, edit the `docker-compose.yml` file:
```yaml
frontend:
  build:
    args:
      REACT_APP_API_URL: http://your-backend-url:8000
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose logs

# Rebuild from scratch
docker-compose down -v
docker-compose up --build
```

### Port already in use
If ports 3000 or 8000 are already in use, modify the port mappings in `docker-compose.yml`:
```yaml
ports:
  - "3001:80"  # Change 3000 to 3001
```

### Frontend can't connect to backend
- Ensure both containers are running: `docker-compose ps`
- Check backend health: `curl http://localhost:8000/docs`
- Verify API URL in frontend build args matches your backend URL

## Development vs Production

### Development
For development, you may want to run services separately:
- Backend: `cd backend && uvicorn app:app --reload`
- Frontend: `cd frontend && npm start`

### Production
Use Docker Compose for production deployment:
```bash
docker-compose up -d
```

## Network

All containers are on the same Docker network (`house_price_network`) and can communicate using service names:
- Backend service name: `backend`
- Frontend service name: `frontend`

