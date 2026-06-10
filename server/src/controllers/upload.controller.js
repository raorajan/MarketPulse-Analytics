const fs = require("fs");
const { db } = require("../config/db");
const { salesData } = require("../models/sales.model");
const { parseCSVFile } = require("../utils/csvParser");

const uploadCSV = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "CSV file is required. Use 'file' as the field name.",
      });
    }

    const filePath = req.file.path;

    try {
      const records = await parseCSVFile(filePath);

      if (records.length === 0) {
        return res.status(400).json({
          success: false,
          message: "CSV file is empty or contains no valid data rows",
        });
      }

      await db.insert(salesData).values(records).returning();

      return res.status(201).json({
        success: true,
        message: "Dataset uploaded successfully",
        totalRecords: records.length,
      });
    } finally {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadCSV };