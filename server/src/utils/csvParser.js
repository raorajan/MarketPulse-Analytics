const fs = require("fs");
const csv = require("csv-parser");

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

module.exports = { parseCSVFile };
