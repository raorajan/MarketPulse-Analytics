/**
 * Calculate total marketing spend from a record object.
 * @param {Object} record - A sales data record
 * @returns {number} Total spend across all channels
 */
export const calculateTotalSpend = (record) => {
  return (
    parseFloat(record.branded_search_spend || 0) +
    parseFloat(record.nonbranded_search_spend || 0) +
    parseFloat(record.facebook_spend || 0) +
    parseFloat(record.print_spend || 0) +
    parseFloat(record.ooh_spend || 0) +
    parseFloat(record.tv_spend || 0) +
    parseFloat(record.radio_spend || 0)
  );
};
