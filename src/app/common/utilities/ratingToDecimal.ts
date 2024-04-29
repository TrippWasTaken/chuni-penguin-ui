export const ratingToDecimal = (num: number | null) => {
  if (!num) return 0;
  return (num / 100).toFixed(2);
};
