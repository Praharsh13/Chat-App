# ChatCord – Real-Time Chat Application

ChatCord is a real-time chat application built with **Node.js**, **Socket.IO**, **MongoDB**, and **Redis**.  
It supports multiple chat rooms, live user presence, and message history, and is fully containerised using Docker.

The project is designed to demonstrate **real-world backend architecture**, including local development with Docker Compose and public deployment using container images.

---

## Features

- Real-time messaging with Socket.IO
- Multiple chat rooms
- Live user join/leave updates
- Message history stored in MongoDB
- Redis used for fast in-memory operations
- Fully Dockerised setup
- Clean separation between local development and public deployment

---

## Tech Stack

- **Backend:** Node.js, Express
- **Real-time:** Socket.IO
- **Database:** MongoDB
- **Cache / Pub-Sub:** Redis
- **Containerisation:** Docker, Docker Compose
- **Frontend:** Vanilla HTML, CSS, JavaScript

---

## Architecture Overview

### Local Development
- Docker Compose runs:
  - Node.js app
  - MongoDB
  - Redis
- All services communicate over Docker’s internal network

### Public Deployment
- App is deployed as a Docker container
- MongoDB and Redis run as separate containers
- All images are pulled from Docker Hub
- Services communicate using internal container hostnames

This mirrors common production setups while remaining simple and portable.

---

## Getting Started (Local Development)

### Prerequisites
- Docker
- Docker Compose

### Run locally
```bash
docker compose up -d --build

---

## Environment Variables
Variable	Description
PORT	Port the app listens on
MONGO_URL	MongoDB connection string
REDIS_URL	Redis connection string

These are injected via Docker or the hosting platform.

Project Structure
.
├── index.js
├── package.json
├── Dockerfile
├── docker-compose.yml
├── public/
│   ├── css/
│   ├── js/
│   └── html/
└── README.md


## Future Improvements

- Authentication and private rooms
- Message delivery acknowledgements
- Rate limiting and moderation tools
- HTTPS and reverse proxy setup
- Horizontal scaling with Redis adapters

## License

Copyright (c) 2025 Praharsh Pranjal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.