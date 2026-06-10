const app = require("./app");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");

dotenv.config();

const port = process.env.PORT || 8000;
connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});