const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
const { sql } = require('drizzle-orm');
const dotenv = require('dotenv');
const schema = require('../models/index.js');

dotenv.config();

const client = postgres(process.env.DATABASE_URL, { prepare: false });
const db = drizzle(client, { schema });

const connectDB = async () => {
  try {
    await db.execute(sql`SELECT 1`);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

module.exports = { db, connectDB };
