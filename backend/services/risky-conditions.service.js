profitMaximization = (params) => {
  return params.matrix.reduce((optimalRowValue, _, outerIndex) => {
    const rowValue = params.probabilities.reduce(
      (sum, stateProbability, innerIndex) =>
        (sum += params.matrix[outerIndex][innerIndex] * stateProbability),
      0
    );
    return Math.max(optimalRowValue, rowValue);
  }, -1e9);
};

dispersionMinimization = (params) => {
  return params.matrix.reduce((optimalRowValue, _, outerIndex) => {
    const rowValueFirst = params.probabilities.reduce(
      (sum, stateProbability, innerIndex) =>
        (sum +=
          Math.pow(params.matrix[outerIndex][innerIndex], 2) *
          stateProbability),
      0
    );
    const rowValueSecond = Math.pow(profitMaximization(params), 2);

    return Math.max(optimalRowValue, Math.sqrt(rowValueFirst - rowValueSecond));
  }, -1e9);
};

scoreDistributionMaximization = (params, minProfit = 1) => {
  return params.matrix.reduce((optimalRowValue, currentRow, outerIndex) => {
    const rowValue = currentRow.reduce(
      (sum, value, innerIndex) =>
        (sum += value >= minProfit ? params.probabilities[innerIndex] : 0),
      0
    );
    return Math.max(optimalRowValue, rowValue);
  }, -1e9);
};

modalCriterion = (params) => {
  const maxProbability = {
    index: -1,
  };
  params.probabilities.forEach((probability, innerIndex) => {
    if (maxProbability.index !== 1e9) {
      if (
        maxProbability.index === -1 ||
        probability > params.probabilities[maxProbability.index]
      ) {
        maxProbability.index = innerIndex;
      } else if (probability === params.probabilities[maxProbability.index]) {
        maxProbability.index = 1e9;
      }
    }
  });

  if (maxProbability.index == 1e9) return -1e9;
  return Array.from(Array(params.matrix.length)).reduce(
    (optimalValue, _, index) =>
      Math.max(optimalValue, params.matrix[index][maxProbability.index]),
    -1e9
  );
};
