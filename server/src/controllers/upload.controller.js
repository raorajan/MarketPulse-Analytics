const fs = require("fs");
const csv = require("csv-parser");
const { db } = require("../config/db");
const { salesData } = require("../models/sales.model");

const REQUIRED_COLUMNS = [
  "week",
  "sales",
  "branded_search_spend",
  "nonbranded_search_spend",
  "facebook_spend",
  "print_spend",
  "ooh_spend",
  "tv_spend",
  "radio_spend",
];

const NUMERIC_FIELDS = [
  "sales",
  "branded_search_spend",
  "nonbranded_search_spend",
  "facebook_spend",
  "print_spend",
  "ooh_spend",
  "tv_spend",
  "radio_spend",
];

const parseNumber = (value) => {
  if (value === null || value === undefined || value === "") return 0;
  const parsed = parseFloat(String(value).replace(/,/g, ""));
  if (isNaN(parsed)) {
    throw new Error(`Invalid numeric value: "${value}"`);
  }
  return parsed;
};

const parseCSVFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const rows = [];
    let headersValidated = false;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("headers", (headers) => {
        const normalizedHeaders = headers.map((h) => h.trim().toLowerCase());
        const missing = REQUIRED_COLUMNS.filter(
          (col) => !normalizedHeaders.includes(col)
        );
        if (missing.length > 0) {
          reject(new Error(`Missing required columns: ${missing.join(", ")}`));
        }
        headersValidated = true;
      })
      .on("data", (row) => {
        if (!headersValidated) return;

        const normalizedRow = {};
        for (const key of Object.keys(row)) {
          normalizedRow[key.trim().toLowerCase()] = row[key];
        }

        const record = {
          week: String(normalizedRow.week || "").trim(),
        };

        for (const field of NUMERIC_FIELDS) {
          record[field] = String(parseNumber(normalizedRow[field]));
        }

        rows.push(record);
      })
      .on("end", () => resolve(rows))
      .on("error", (err) => reject(err));
  });
};

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