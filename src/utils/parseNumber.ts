const parseNumber = (value:string) => {
  if (value.includes('.')) {
    return Number(value).toFixed(6);
  }
  return Number(value).toFixed(0);
};

export default parseNumber;
