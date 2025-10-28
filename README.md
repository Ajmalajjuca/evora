# conekt-lab

![React](https://img.shields.io/badge/React-18.x-blue?logo=react) ![Express](https://img.shields.io/badge/Express-4.x-green?logo=express) ![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green?logo=mongodb) ![License](https://img.shields.io/badge/license-MIT-blue.svg)

A modern full-stack application built with React frontend, Express.js backend, mongodb database. This project provides JWT authentication, tailwind-css styling, and a robust architecture for building scalable web applications.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Docker](#docker)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🎨 Modern React UI
- ⚡ Fast and scalable Express API
- 🔐 JWT-based authentication & authorization
- 💾 MongoDB database integration
- 🎭 tailwind-css for styling
- 🔄 zustand for state management
- 🐳 Docker support for containerization
- 🔍 ESLint & Prettier for code quality
- 🚀 CI/CD with GitHub Actions
- 📱 Responsive design
- ⚙️  Environment-based configuration
- 🛡️  Security best practices

## 🛠️ Tech Stack

### Frontend

- **Framework:** React 18
- **Language:** JavaScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **HTTP Client:** Axios

### Backend

- **Framework:** Express.js
- **Language:** JavaScript
- **Architecture:** Repository Pattern
- **Authentication:** JWT
- **Validation:** Zod / express-validator
- **Logging:** Winston / Morgan

### Database

- **MongoDB** with Mongoose ODM

### DevOps & Tools

- **ESLint** & Prettier
- **Husky** & Commitlint
- **Docker** & Docker Compose
- **GitHub Actions** for CI/CD


## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (>= 16.0.0)
- npm (>= 8.0.0) or yarn
- MongoDB (>= 6.0)
- Docker & Docker Compose (optional)

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/conekt-lab.git
cd conekt-lab

# Install dependencies for both frontend and backend
cd client && npm install
cd ../server && npm install

# Or use a helper script if configured
npm run install:all

```

### Configuration

1. **Environment Variables**

   ```bash
   cd server
   cp .env.example .env
   ```
   
   Update the variables in `.env` with your configuration.

2. **Database Setup**

**MongoDB:**

```bash
# Start MongoDB locally
mongod

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:7
```


### Running the Application

```bash
# Terminal 1: Start backend
cd server
npm run dev

# Terminal 2: Start frontend
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000


## 📁 Project Structure

```
conekt-lab/
├── client/             # Frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── server/             # Backend application
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   ├── .env
│   └── package.json
├── docker-compose.yml  # Docker configuration
├── .gitignore
└── README.md
```


## 🔐 Environment Variables

### Backend

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/conekt-lab` |
| `JWT_SECRET` | Secret key for JWT | `your-secret-key` |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3000` |

### Frontend

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000` |


## 📜 Available Scripts

### Frontend Scripts

```bash
npm start            # Start development server
npm run build        # Create production build
npm test             # Run tests
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Backend Scripts

```bash
npm run dev          # Start development server with auto-reload
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm test             # Run tests
```

**Seed Scripts:**

```bash
npm run seed         # Seed database with example data
```



## 🐳 Docker

### Using Docker Compose

Start all services with a single command:

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild containers
docker-compose up --build
```

### Individual Services

```bash
# Start only the database
docker-compose up mongo -d

# Start backend
docker-compose up server -d

# Start frontend
docker-compose up client -d
```

### Docker Commands

```bash
# View running containers
docker ps

# View all containers
docker ps -a

# Remove all stopped containers
docker-compose rm

# View logs for specific service
docker-compose logs -f server
```


## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

### User Endpoints

#### Get All Users

```http
GET /api/users
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  ]
}
```

#### Get User by ID

```http
GET /api/users/:id
Authorization: Bearer <token>
```

#### Update User

```http
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

#### Delete User (Admin Only)

```http
DELETE /api/users/:id
Authorization: Bearer <token>
```

### Error Responses

All endpoints may return the following error format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `204` - No Content
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

### Authentication

Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Tokens expire after 7 days by default (configurable via `JWT_EXPIRE` environment variable).


## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Created with [create-mern-app](https://www.npmjs.com/package/create-mern-app)
- Built with ❤️ using the MERN stack

## 📧 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/conekt-lab](https://github.com/yourusername/conekt-lab)

---

⭐️ If you find this project useful, please consider giving it a star!
