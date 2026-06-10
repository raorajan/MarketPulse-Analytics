const express = require("express");
const router = express.Router();

const uploadRoutes = require("./upload.routes");
const recordsRoutes = require("./records.routes");
const summaryRoutes = require("./summary.routes");

router.use("/upload", uploadRoutes);
router.use("/records", recordsRoutes);
router.use("/summary", summaryRoutes);

module.exports = router;
