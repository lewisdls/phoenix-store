export const getColorsHex = (color: string) => {
  switch (color) {
    case "Black":
      return "#000000";
    case "Blue":
      return "#00008B";
    case "Brown":
      return "#964B00";
    case "Green":
      return "#006A4E";
    case "Gray":
      return "#808080";
    case "Peach":
      return "#BE9A81";
    case "Red":
      return "#800020";
    case "White":
      return "#eeeeee";
    default:
      break;
  }
};
