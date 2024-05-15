export const getCompanyNameFromText = (text: string) => {
  return text
    .split(" ")
    .find((word) => word.includes("#"))!
    .substring(1);
};
