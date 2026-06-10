const { defineConfig } = require("drizzle-kit");
const dotenv = require("dotenv");

dotenv.config();

module.exports = defineConfig({
  dialect: "postgresql",
  schema: "./src/models/index.js",
  out: "./src/database",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
