# LetsTalk

LetsTalk is a real-time chat application that lets users sign up, log in, view other users, and send messages instantly. The app combines a React frontend with an Express backend, Socket.IO for live communication, and MongoDB for persistent storage.

## Project overview

The application is divided into two main parts:

- `frontend/` – React + Vite client application
- `Backend/` – Express + Socket.IO server and API endpoints

This architecture separates the UI from the API layer while enabling instant messaging updates and online user tracking in real time.

## How it works

### Authentication
- Users sign up or log in through the frontend.
- The backend verifies credentials, hashes passwords with `bcryptjs`, and issues a JWT token.
- The token is stored in an HTTP-only cookie for secure session handling.
- Protected routes use `isAuthenticated` middleware to verify the user before allowing access.

### Messaging flow
- A user selects another user from the app.
- The frontend requests messages from the backend via REST endpoints.
- The backend stores conversations and messages in MongoDB.
- When a message is sent, the server also emits a Socket.IO event to the receiver if they are online.
- The frontend listens for real-time updates and refreshes the chat UI without reloading the page.

### Online presence
- The backend tracks connected Socket.IO clients using a map keyed by user ID.
- When a user connects, the server emits the latest online user list.
- The client updates presence indicators and online status in the UI.

## Tech stack

### Frontend
- React 19
- Vite
- React Router
- Redux Toolkit
- Tailwind CSS
- Axios
- Socket.IO Client
- React Hot Toast

### Backend
- Node.js
- Express 5
- Socket.IO
- MongoDB with Mongoose
- JWT authentication
- bcryptjs
- cookie-parser
- CORS
- dotenv

## Project structure

```text
LetsTalk/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── app.js
│   ├── package.json
│   ├── .env
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── .env
│   ├── vite.config.js
│   └── ...
├── render.yaml
├── README.md
└── .gitignore
```

## Prerequisites

Before running the project locally, make sure you have:

- Node.js 18+ installed
- npm installed
- MongoDB Atlas connection string or a local MongoDB instance

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/jayagr0023/letstalk.git
cd letstalk
```

### 2. Install backend dependencies

```bash
cd Backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Environment variables

### Backend (`Backend/.env`)

Create a `.env` file inside the `Backend` folder with the following values:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
PORT=8080
```

### Frontend (`frontend/.env`)

Create a `.env` file inside the `frontend` folder:

```env
VITE_BACKEND_URL=http://localhost:8080
```

## Running the project locally

Open two terminals:

### Terminal 1: Start the backend

```bash
cd Backend
npm run dev
```

### Terminal 2: Start the frontend

```bash
cd frontend
npm run dev
```

The frontend usually runs on:

- http://localhost:5173

The backend server usually runs on:

- http://localhost:8080

## Available scripts

### Backend

```bash
npm run dev
npm start
```

- `npm run dev` starts the server with nodemon for live reloading.
- `npm start` starts the production server.

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

- `npm run dev` runs the Vite development server.
- `npm run build` creates a production build.
- `npm run preview` serves the production build locally.
- `npm run lint` checks the frontend code for lint issues.

## Deployment

The project is configured for deployment to Render and Vercel:

- Backend is deployed via `render.yaml` on Render
- Frontend is deployed via Vercel
- MongoDB is hosted on MongoDB Atlas

For deployment details, see the existing frontend README and `render.yaml` configuration.

## Features

- User signup and login
- JWT-based authentication with cookies
- Secure password hashing with bcrypt
- Real-time messaging using Socket.IO
- Online presence tracking
- Responsive chat interface
- Conversation history stored in MongoDB

## Notes

- In production, cookie settings use `SameSite=None; Secure` when deployed across different domains.
- HTTPS is required for production deployments when cookies are shared across frontend and backend domains.
- The app currently expects the frontend and backend origins to be configured properly in environment variables.

## License

This project is currently set up without a custom license file. If you plan to distribute or publish it publicly, add an appropriate license based on your usage requirements.
