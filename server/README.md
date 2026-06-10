# MarketPulse Analytics API

This is the backend service for the MarketPulse Analytics dashboard, built with Node.js, Express, PostgreSQL, and Drizzle ORM.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the `server` directory with the following contents:
```env
PORT=8000
DATABASE_URL=postgresql://username:password@host:port/database
```

### 3. Database Migrations
Generate the SQL migrations based on the schema:
```bash
npm run db:generate
```

Apply the migrations to your PostgreSQL database:
```bash
npm run db:migrate
```

### 4. Start the Server
For development (auto-restarts with Nodemon):
```bash
npm run dev
```

For production:
```bash
npm start
```

## API Endpoints

### 1. Upload Dataset
`POST /api/upload`
Upload a CSV dataset. The field name must be `file`.
- **Response**: `{ "success": true, "message": "...", "totalRecords": 100 }`

### 2. Get Records
`GET /api/records`
Fetch all data rows. Supports pagination and searching.
- **Query Params**: `?page=1&limit=10&search=2023`
- **Response**: `{ "success": true, "count": 10, "data": [...] }`

### 3. Summary Metrics
`GET /api/summary`
Get aggregated dashboard KPIs (Total Sales, Average Weekly, etc).
- **Response**: `{ "success": true, "data": { "totalSales": 1000, ... } }`
