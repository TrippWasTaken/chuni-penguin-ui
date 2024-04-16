// Rating calculations based of https://github.com/a127000555/Chunithm-Rating-Calculator
// These could very well be incorrect as all thats online are ratings calcs above S grades

export const calculateScoreRating = (
  scoreGiven: number | null,
  baseRating: number | null
) => {
  if (!scoreGiven || !baseRating) return 0;

  const DIVIDER = 1000000;
  const score = scoreGiven / DIVIDER; // because I like to use decimals

  if (score > 1.0075) return baseRating + 2;
  if (score > 1.005)
    return baseRating + 1.5 + ((score - 1.005) / (1.0075 - 1.005)) * 0.5;
  if (score > 1) return baseRating + 1 + ((score - 1) / (1.005 - 1)) * 0.05;
  if (score > 0.975) return baseRating + ((score - 0.975) / (1 - 0.975)) * 1;
  if (score > 0.925)
    return baseRating - 3 + ((score - 0.925) / (0.975 - 0.925)) * 3;
  if (score > 0.9) return baseRating - 5 + ((score - 0.9) / (0.925 - 0.9)) * 2;
  if (score > 0.8)
    return (
      (baseRating - 5) / 2 +
      ((score - 0.8) / (0.9 - 0.8)) * (baseRating - 5 - (baseRating - 5) / 2)
    );

  if (score > 0.5)
    return (((score - 0.5) / (0.8 - 0.5)) * (baseRating - 5)) / 2;
  return 0;
};
