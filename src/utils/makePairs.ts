const makePairs = (tokens: string[]) => {
  const allPairs = [];

  for (let i = 0; i < tokens.length - 1; i += 1) {
    for (let j = i + 1; j < tokens.length; j += 1) {
      allPairs.push({ token0: tokens[i], token1: tokens[j] });
    }
  }
  return allPairs;
};

export default makePairs;
