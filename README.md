# MarketPulse Analytics

MarketPulse Analytics is a full-stack marketing performance dashboard that allows users to upload marketing and sales data via CSV, visualize key performance indicators (KPIs), view sales trends over time, and explore detailed channel spend records.

## Features

- **CSV Data Ingestion**: Upload marketing data easily through a drag-and-drop interface.
- **KPI Dashboard**: View high-level metrics including Total Sales, Average Weekly Sales, Total Marketing Spend, and Number of Weeks.
- **Interactive Sales Trend Chart**: Visualize sales performance over time using a sleek, interactive area chart with gradient fills and tooltips.
- **Data Table Explorer**: Search, sort, and paginate through detailed weekly records of sales and marketing spend across various channels (Branded Search, Non-Branded Search, Facebook, Print, OOH, TV, Radio).
- **Premium UI/UX**: Built with a modern, responsive, dark-themed, glassmorphic design system.

## Tech Stack

### Frontend
- **React.js**: UI Library
- **Vite**: Build Tool & Dev Server
- **Recharts**: Data Visualization
- **Axios**: API Client
- **React Icons**: Iconography
- **Vanilla CSS**: Custom styling with CSS Variables

### Backend
- **Node.js & Express.js**: API Framework
- **PostgreSQL**: Relational Database
- **Drizzle ORM**: Type-safe Object Relational Mapper
- **Multer**: File Upload Handling
- **csv-parser**: CSV Processing

## Project Structure

```
MarketPulse Analytics/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (Upload, Chart, KPIs, Table)
│   │   ├── hooks/          # Custom React Hooks for API data
│   │   ├── pages/          # Page layouts (Dashboard)
│   │   ├── services/       # API integration layer
│   │   └── utils/          # Formatting & calculation helpers
│   └── vite.config.js      # Vite configuration (includes API proxy)
│
└── server/                 # Node/Express Backend
    ├── src/
    │   ├── config/         # Database and Swagger configs
    │   ├── controllers/    # Request handlers
    │   ├── middlewares/    # Error handling & Upload middlewares
    │   ├── models/         # Drizzle ORM schema
    │   ├── routes/         # API endpoints definitions
    │   └── utils/          # CSV parser utility
    └── .env                # Environment variables
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL database

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables. Ensure you have a `.env` file in the `server` directory with your database connection details (e.g., `DATABASE_URL`).
4. Start the backend server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:8000`.

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173` (or `5174` if `5173` is in use). The Vite dev server is configured to proxy `/api` requests to the backend automatically.

## API Endpoints

- `POST /api/upload`: Uploads a CSV file containing sales and marketing data.
- `GET /api/summary`: Retrieves aggregated KPI metrics.
- `GET /api/records`: Retrieves detailed weekly records with pagination and search support.
