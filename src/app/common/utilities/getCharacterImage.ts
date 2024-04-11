export const getCharacterImagePath = (
  characterImgId: number | null = null,
  type: "small" | "medium" | "full" = "full"
) => {
  // Format the id given from the db to this format CHU_UI_Character_1402_01_02
  // the first is the 4 digits in the ID
  // the second part is the variant of the character IE different clothes, this is the 5th digit in the ID
  // last part is the image size/crop

  const getSize = () => {
    switch (type) {
      case "small":
        return "02";
      case "medium":
        return "01";
      case "full":
        return "00";
    }
  };
  if (characterImgId) {
    const idStr = characterImgId.toString();
    const variant = idStr[idStr.length - 1].padStart(2, "0");
    const staticId = idStr.slice(0, -1).padStart(4, "0");
    const size = getSize();
    const basePath = "/static/";

    const imgPath = `${basePath}CHU_UI_Character_${staticId}_${variant}_${size}.png`;
    return imgPath;
  }
};
