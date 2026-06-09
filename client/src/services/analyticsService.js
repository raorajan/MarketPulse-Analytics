import api from './api';

// Generate 52 weeks of realistic mock data
const generateMockData = () => {
  const data = [];
  let baseSales = 100000;
  for (let i = 1; i <= 52; i++) {
    const variance = Math.floor(Math.random() * 20000) - 10000;
    const sales = baseSales + variance + (i * 1000); // Gradual growth
    
    data.push({
      id: i,
      week: `2025-W${i.toString().padStart(2, '0')}`,
      sales: sales,
      brandedSearchSpend: Math.round(sales * 0.05),
      nonBrandedSearchSpend: Math.round(sales * 0.08),
      facebookSpend: Math.round(sales * 0.1),
      printSpend: Math.round(sales * 0.02),
      oohSpend: Math.round(sales * 0.03),
      tvSpend: Math.round(sales * 0.15),
      radioSpend: Math.round(sales * 0.04),
    });
  }
  return data;
};

export const mockRecords = generateMockData();

const getSummary = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const totalSales = mockRecords.reduce((sum, record) => sum + record.sales, 0);
  const totalMarketingSpend = mockRecords.reduce((sum, record) => {
    return sum + record.brandedSearchSpend + record.nonBrandedSearchSpend + 
           record.facebookSpend + record.printSpend + record.oohSpend + 
           record.tvSpend + record.radioSpend;
  }, 0);
  
  return {
    totalSales,
    averageWeeklySales: totalSales / mockRecords.length,
    numberOfWeeks: mockRecords.length,
    totalMarketingSpend,
  };
};

const getRecords = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRecords;
};

export const analyticsService = {
  getSummary,
  getRecords,
};
