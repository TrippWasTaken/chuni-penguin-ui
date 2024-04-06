export const correctPath = (path: string | any) => {
  return `/static/${path.replace(/\.[^/.]+$/, ".png")}`;
};
