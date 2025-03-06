Project Overview
This backend is built using Node.js with Express and utilizes Prisma as the ORM to interact with a PostgreSQL database. It serves as the API layer for the application, handling data management.

Tech Stack
Runtime: Node.js
Framework: Express.js
Database: PostgreSQL
ORM: Prisma
Other Dependencies: dotenv, cors, axios

Setup Instructions
Clone the repository:
git clone https://github.com/nrmd-naveen/search-tool-be
cd backend

Install dependencies:
npm install

Set up environment variables in a .env file:
DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
PORT=5000

Initialize Prisma:
Generate Prisma client:
npx prisma generate
Run database migrations:
npx prisma migrate deploy

Start the server:
npm start

API Endpoints
Search Route
GET /api/search?query=your_query - Fetch search results based on the query parameter.


Deployment
The backend server is deployed on Render.
Used Neon cloud DB for postgress DB
