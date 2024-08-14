# Todo List Fullstack App

A full-stack application with a NestJS backend, a React frontend, and a PostgreSQL database.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

## Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/husseymarcos/toro-todo
   cd toro-todo

### 2. Set Up Environment Variables

Create a `.env` file in the root directory with the following content:

JWT_SECRET_KEY=mySuperSecretKey

Where mySuperSecreyKey must be generated

For example: https://jwtsecret.com/


### **Step 3: Build and Start the Application**


Use Docker Compose to build and start the application:


```bash
docker-compose up --build