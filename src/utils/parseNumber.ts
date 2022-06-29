const parseNumber = (value:string) => {
  if (value.includes('.')) {
    return Number(value).toFixed(5);
  }
  return Number(value).toFixed(0);
};

export default parseNumber;
