const express = require("express");
const router = express.Router();
const recordsController = require("../controllers/records.controller");

router.get("/", recordsController.getRecords);

module.exports = router;
