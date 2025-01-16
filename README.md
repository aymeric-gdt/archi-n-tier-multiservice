# Full Stack Product Management Application

A microservices-based application for product management with user authentication.

## Architecture

- Frontend: React.js
- Backend Services:
  - Gateway Service (Port 8082)
  - User Service (Port 8080)
  - Product Service (Port 8081)
- Database: MongoDB
- Cache: Redis

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- MongoDB
- Redis

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd <repository-name>
```

## Frontend
```bash
cd frontend
npm install
```
## User Service
```bash
cd ../backend/user-backend
npm install
```

## Product Service
```bash
cd ../backend/product-backend
npm install
```

## Gateway Service
```bash
cd ../gateway-service
npm install
```

## Running the Application

1. Start the Docker Compose stack:
```bash
docker compose up -d
```

## Services

- Frontend: http://localhost:3000
- Gateway API: http://localhost:8082
- User Service: http://localhost:8080
- Product Service: http://localhost:8081

## Features

- User Authentication (Register/Login)
- Product Management (CRUD operations)
- Redis Caching for Products
- API Gateway for Service Orchestration
- Containerized Deployment

## Environment Variables

Create `.env` files in each service directory with the following variables:

## User and Product Services
```bash
MONGO_URI=mongodb://root:example@db:27017
JWT_SECRET=your_jwt_secret_key_here
```
