export const calculateGradeFromScore = (score: number) => {
  // @todo findout what the + grades are score wise
  // "D"
  if (score < 499999) return 0;
  // "C"
  if (score < 599999) return 1;
  //   "B"
  if (score < 699999) return 2;
  //   "BB"
  if (score < 799999) return 3;
  //   "BBB"
  if (score < 899999) return 4;
  //   "A"
  if (score < 924999) return 5;
  //   "AA"
  if (score < 949999) return 6;
  //   "AAA"
  if (score < 974999) return 7;
  //   "S"
  if (score < 999999) return 8;
  //   "SS"
  if (score < 1007499) return 10;
  //   "SSS"
  if (score > 1007499) return 12;
};
