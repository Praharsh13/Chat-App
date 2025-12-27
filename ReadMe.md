# 🚀 ChatCord — Real-Time Chat Application

![Docker](https://img.shields.io/badge/Docker-Containerised-blue?logo=docker)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green?logo=node.js)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-black?logo=socket.io)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-darkgreen?logo=mongodb)
![Redis](https://img.shields.io/badge/Redis-Pub%2FSub-red?logo=redis)

🔗 **Live Application**  
👉 https://flying-rheba-student13-75d1d153.koyeb.app/

📦 **Docker Image**  
👉 https://hub.docker.com/r/praharsh13/chatapp

---

## 🧠 What is ChatCord?

**ChatCord** is a real-time chat application built to demonstrate **production-style backend architecture** using WebSockets, persistence, caching, and container orchestration.

It supports:
- Multiple chat rooms  
- Live user presence  
- Persistent message history  
- Scalable real-time communication  

The entire system is **fully containerised** and deployed publicly using Docker images.


![Home Page](image.png)
![Chat Room](image-1.png)

---

## ✨ Features

- Real-time messaging with Socket.IO  
- Multiple chat rooms  
- Live user join and leave updates  
- Message history stored in MongoDB  
- Redis for fast in-memory operations and pub/sub  
- Fully Dockerised (app, MongoDB, Redis)  
- Clear separation between development and deployment  

---

## 🧰 Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-black?logo=express)
![Socket.IO](https://img.shields.io/badge/Socket.IO-black?logo=socket.io)
![MongoDB](https://img.shields.io/badge/MongoDB-darkgreen?logo=mongodb)
![Redis](https://img.shields.io/badge/Redis-red?logo=redis)
![Docker](https://img.shields.io/badge/Docker-blue?logo=docker)
![Docker Compose](https://img.shields.io/badge/Docker%20Compose-blue?logo=docker)
![Koyeb](https://img.shields.io/badge/Koyeb-purple)
---

## 🏗 Architecture Overview

### High-Level System Architecture

![Alt text](image-3.png)


### Why this architecture matters

- **Socket.IO** enables real-time, bi-directional communication  
- **MongoDB** provides persistent message storage  
- **Redis** supports fast state updates and pub/sub patterns  
- **Docker** ensures consistency across environments  

![Communication](image-2.png)



---

## 📂 Project Structure

.
├── index.js
├── package.json
├── Dockerfile
├── docker-compose.yml
├── public/
│ ├── css/
│ ├── js/
│ └── html/
└── README.md



---

## ⚙️ Environment Variables

| Variable | Description |
|--------|-------------|
| PORT | Port the app listens on |
| MONGO_URL | MongoDB connection string |
| REDIS_URL | Redis connection string |

Injected via Docker or the hosting platform.

---

## ▶️ Local Development

### Prerequisites
- Docker  
- Docker Compose  

### Run locally

```bash
docker compose up -d --build
Open:

arduino
Copy code
http://localhost:3000
🌍 Deployment (Docker + Koyeb)
This project is deployed using Docker images and Docker Compose on Koyeb.

Deployment workflow
Build and push the app image

bash
Copy code
docker build -t praharsh13/chatapp:latest .
docker push praharsh13/chatapp:latest
Compose-based deployment

App container

MongoDB container

Redis container

Internal Docker networking

Koyeb configuration

Dockerfile builder

Dockerfile.koyeb

Privileged mode enabled

Port 3000 exposed

Live access


https://flying-rheba-student13-75d1d153.koyeb.app/
🚀 What This Project Demonstrates
Real-time systems using WebSockets

Backend scalability patterns

Docker-based deployments

Production-style service separation

Practical use of Redis and MongoDB

Debugging real cloud deployment issues

This project mirrors how real-world backend systems are built and deployed.

🔮 Future Improvements
Authentication and private rooms

Message delivery acknowledgements

Rate limiting and moderation tools

Reverse proxy and HTTPS termination

Horizontal scaling with Redis adapters

📜 License
MIT License

© 2025 Praharsh Pranjal


