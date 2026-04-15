export const generateInsights = (data) => {
  if (!data || data.length === 0) return [];

  const insights = [];

  // Total Sales
  const total = data.reduce(
    (sum, item) => sum + Number(item.sales),
    0
  );

  // Average
  const avg = total / data.length;

  // Top Product
  const top = [...data].sort(
    (a, b) => Number(b.sales) - Number(a.sales)
  )[0];

  // Lowest Product
  const lowest = [...data].sort(
    (a, b) => Number(a.sales) - Number(b.sales)
  )[0];

  insights.push(`Total sales is ${total}`);
  insights.push(`Average sales is ${avg.toFixed(2)}`);
  insights.push(
    `${top.product} is the top performing product with ${top.sales} sales`
  );
  insights.push(
    `${lowest.product} has the lowest sales (${lowest.sales})`
  );

  return insights;
};