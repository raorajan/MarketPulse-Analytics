const { db } = require("../config/db");
const { salesData } = require("../models/sales.model");
const { sql } = require("drizzle-orm");

const getSummary = async (req, res, next) => {
  try {
    const result = await db
      .select({
        totalSales: sql`SUM(${salesData.sales})`.mapWith(Number),
        averageWeeklySales: sql`AVG(${salesData.sales})`.mapWith(Number),
        numberOfWeeks: sql`COUNT(${salesData.week})`.mapWith(Number),
        totalBranded: sql`SUM(${salesData.branded_search_spend})`.mapWith(Number),
        totalNonbranded: sql`SUM(${salesData.nonbranded_search_spend})`.mapWith(Number),
        totalFacebook: sql`SUM(${salesData.facebook_spend})`.mapWith(Number),
        totalPrint: sql`SUM(${salesData.print_spend})`.mapWith(Number),
        totalOoh: sql`SUM(${salesData.ooh_spend})`.mapWith(Number),
        totalTv: sql`SUM(${salesData.tv_spend})`.mapWith(Number),
        totalRadio: sql`SUM(${salesData.radio_spend})`.mapWith(Number),
      })
      .from(salesData);

    const metrics = result[0];

    const totalMarketingSpend =
      (metrics.totalBranded || 0) +
      (metrics.totalNonbranded || 0) +
      (metrics.totalFacebook || 0) +
      (metrics.totalPrint || 0) +
      (metrics.totalOoh || 0) +
      (metrics.totalTv || 0) +
      (metrics.totalRadio || 0);

    return res.status(200).json({
      success: true,
      data: {
        totalSales: metrics.totalSales || 0,
        averageWeeklySales: parseFloat((metrics.averageWeeklySales || 0).toFixed(2)),
        numberOfWeeks: metrics.numberOfWeeks || 0,
        totalMarketingSpend: parseFloat(totalMarketingSpend.toFixed(2)),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSummary };
