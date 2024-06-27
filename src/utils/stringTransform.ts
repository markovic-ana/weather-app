/**
 *
 * @param str
 * @returns string with first letter of each word capitalized
 */

export const capitilizeFirstLetter = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
