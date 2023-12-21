module.exports.maxyMax = (params) => {
  return params.matrix.reduce((optimal, currentRow, _) => {
    const rowMaximum = currentRow.reduce(
      (maxVal, currentVal) => Math.max(maxVal, currentVal),
      -1e9
    );
    return Math.max(optimal, rowMaximum);
  }, -1e9);
};

module.exports.minyMax = (params) => {
  return params.matrix.reduce((optimal, currentRow, _) => {
    const rowMaximum = currentRow.reduce(
      (maxVal, currentVal) => Math.max(maxVal, currentVal),
      -1e9
    );
    return Math.min(optimal, rowMaximum);
  }, -1e9);
};

module.exports.maxyMin = (params) => {
  return params.matrix.reduce((optimal, currentRow, _) => {
    const rowMaximum = currentRow.reduce(
      (maxVal, currentVal) => Math.min(maxVal, currentVal),
      1e9
    );
    return Math.max(optimal, rowMaximum);
  }, -1e9);
};

module.exports.gurvitzCriteria = (params, alpha) => {
  return params.matrix.reduce((optimal, currentRow, _) => {
    const rowMaxValue = currentRow.reduce(
      (maxVal, currentVal) => Math.max(maxVal, currentVal),
      -1e9
    );
    const rowMinValue = currentRow.reduce(
      (minVal, currentVal) => Math.min(minVal, currentVal),
      1e9
    );
    return Math.max(optimal, alpha * rowMaxValue + (1 - alpha) * rowMinValue);
  }, -1e9);
};

module.exports.sevigCriteria = (params) => {
  const colsMax = [];
  params.matrix.forEach((currentRow, outerIndex) => {
    const mxColVal = Array.from(Array(params.matrix.length)).reduce(
      (maxValue, _, innerIndex) =>
        Math.max(maxValue, params.matrix[innerIndex][outerIndex]),
      -1e9
    );
    colsMax.push(mxColVal);
  });
  return params.matrix.reduce((optimal, currentRow, outerIndex) => {
    const rowMaxValue = currentRow.reduce(
      (maxValue, currentValue, innerIndex) =>
        Math.max(maxValue, colsMax[innerIndex] - currentValue),
      -1e9
    );
    return Math.min(optimal, rowMaxValue);
  }, 1e9);
};
