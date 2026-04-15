export const getTopProducts = (data, limit = 10) => {
  return [...data]
    .map(item => ({
      ...item,
      sales: Number(item.sales) || 0
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, limit);
};

export const getTotalSales = (data) => {
  return data.reduce((sum, item) => {
    return sum + (Number(item.sales) || 0);
  }, 0);
};

export const getAverageSales = (data) => {
  if (!data.length) return 0;
  return getTotalSales(data) / data.length;
};