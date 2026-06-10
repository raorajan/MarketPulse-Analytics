const { db } = require("../config/db");
const { salesData } = require("../models/sales.model");
const { asc, ilike } = require("drizzle-orm");

const getRecords = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || null;
    const limit = parseInt(req.query.limit) || null;
    const search = req.query.search || null;

    let query = db.select().from(salesData);

    if (search) {
      query = query.where(ilike(salesData.week, `%${search}%`));
    }

    query = query.orderBy(asc(salesData.week));

    if (page && limit) {
      const offset = (page - 1) * limit;
      query = query.limit(limit).offset(offset);
    }

    const records = await query;

    return res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getRecords };