var express = require("express");
var router = express.Router();

const profitMaximization = (params) => {
  return params.matrix.reduce((optimalRowValue, _, outerIndex) => {
    const rowValue = params.probabilities.reduce(
      (sum, stateProbability, innerIndex) =>
        (sum += params.matrix[outerIndex][innerIndex] * stateProbability),
      0
    );
    return Math.max(optimalRowValue, rowValue);
  }, -1e9);
};

const profitMaximizationZ = (params) => {
  return params.matrix.reduce((result, _, outerIndex) => {
    const rowValue = params.probabilities.reduce(
      (sum, stateProbability, innerIndex) =>
        (sum += params.matrix[outerIndex][innerIndex] * stateProbability),
      0
    );
    result.push(rowValue);
    return result;
  }, []);
};

const dispersionMinimization = (params) => {
  return params.matrix.reduce((optimalRowValue, _, outerIndex) => {
    const rowValueFirst = params.probabilities.reduce(
      (sum, stateProbability, innerIndex) =>
        (sum +=
          Math.pow(params.matrix[outerIndex][innerIndex], 2) *
          stateProbability),
      0
    );
    const rowValueSecond = Math.pow(
      params.probabilities.reduce(
        (sum, stateProbability, innerIndex) =>
          (sum += params.matrix[outerIndex][innerIndex] * stateProbability),
        0
      ),
      2
    );
    if (Math.abs(rowValueFirst - rowValueSecond) === 0) {
      return optimalRowValue;
    } else {
      if (optimalRowValue === 0)
        return Math.sqrt(Math.abs(rowValueFirst - rowValueSecond));
      return Math.min(
        optimalRowValue,
        Math.sqrt(Math.abs(rowValueFirst - rowValueSecond))
      );
    }
  }, 0);
};

const dispersionMinimizationZ = (params) => {
  return params.matrix.reduce((result, _, outerIndex) => {
    const rowValueFirst = params.probabilities.reduce(
      (sum, stateProbability, innerIndex) =>
        (sum +=
          Math.pow(params.matrix[outerIndex][innerIndex], 2) *
          stateProbability),
      0
    );
    const rowValueSecond = Math.pow(
      params.probabilities.reduce(
        (sum, stateProbability, innerIndex) =>
          (sum += params.matrix[outerIndex][innerIndex] * stateProbability),
        0
      ),
      2
    );
    result.push(Math.sqrt(Math.abs(rowValueFirst - rowValueSecond)));
    return result;
  }, []);
};

const scoreDistributionMaximization = (params, minProfit = 0) => {
  return params.matrix.reduce((optimalRowValue, currentRow, outerIndex) => {
    const rowValue = currentRow.reduce(
      (sum, value, innerIndex) =>
        (sum += value >= minProfit ? params.probabilities[innerIndex] : 0),
      0
    );
    return Math.max(optimalRowValue, rowValue);
  }, -1e9);
};

const scoreDistributionMaximizationZ = (params, minProfit = 0) => {
  return params.matrix.reduce((result, currentRow, outerIndex) => {
    const rowValue = currentRow.reduce(
      (sum, value, innerIndex) =>
        (sum += value >= minProfit ? params.probabilities[innerIndex] : 0),
      0
    );
    result.push(rowValue);
    return result;
  }, []);
};

const modalCriterion = (params) => {
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

  if (maxProbability.index == 1e9) return -1;
  return Array.from(Array(params.matrix.length)).reduce(
    (optimalValue, _, index) =>
      Math.max(optimalValue, params.matrix[index][maxProbability.index]),
    -1e9
  );
};

const modalCriterionZ = (params) => {
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

  return Array.from(Array(params.matrix.length)).reduce((result, _, index) => {
    result.push(params.matrix[index][maxProbability.index]);
    return result;
  }, []);
};

const maxyMax = (params) => {
  return params.matrix.reduce((optimal, currentRow, _) => {
    const rowMaximum = currentRow.reduce(
      (maxVal, currentVal) => Math.max(maxVal, currentVal),
      -1e9
    );
    return Math.max(optimal, rowMaximum);
  }, -1e9);
};

const maxyMaxZ = (params) => {
  return params.matrix.reduce((result, currentRow, _) => {
    const rowMaximum = currentRow.reduce(
      (maxVal, currentVal) => Math.max(maxVal, currentVal),
      -1e9
    );
    result.push(rowMaximum);
    return result;
  }, []);
};

const minyMax = (params) => {
  return params.matrix.reduce((optimal, currentRow, _) => {
    const rowMaximum = currentRow.reduce(
      (maxVal, currentVal) => Math.min(maxVal, currentVal),
      1e9
    );
    return Math.max(optimal, rowMaximum);
  }, -1e9);
};

const minyMaxZ = (params) => {
  return params.matrix.reduce((result, currentRow, _) => {
    const rowMaximum = currentRow.reduce(
      (maxVal, currentVal) => Math.min(maxVal, currentVal),
      1e9
    );
    result.push(rowMaximum);
    return result;
  }, []);
};

const maxyMin = (params) => {
  return params.matrix.reduce((optimal, currentRow, _) => {
    const rowMaximum = currentRow.reduce(
      (maxVal, currentVal) => Math.max(maxVal, currentVal),
      -1e9
    );
    return Math.min(optimal, rowMaximum);
  }, 1e9);
};

const maxyMinZ = (params) => {
  return params.matrix.reduce((result, currentRow, _) => {
    const rowMaximum = currentRow.reduce(
      (maxVal, currentVal) => Math.max(maxVal, currentVal),
      -1e9
    );
    result.push(rowMaximum);
    return result;
  }, []);
};

const gurvitzCriteria = (params, alpha = 1) => {
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

const gurvitzCriteriaZ = (params, alpha = 1) => {
  return params.matrix.reduce((result, currentRow, _) => {
    const rowMaxValue = currentRow.reduce(
      (maxVal, currentVal) => Math.max(maxVal, currentVal),
      -1e9
    );
    const rowMinValue = currentRow.reduce(
      (minVal, currentVal) => Math.min(minVal, currentVal),
      1e9
    );
    result.push(alpha * rowMaxValue + (1 - alpha) * rowMinValue);
    return result;
  }, []);
};

const sevigCriteria = (params) => {
  const colsMax = [];
  params.matrix[0].forEach((currentRow, outerIndex) => {
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

const sevigCriteriaZ = (params) => {
  const colsMax = [];
  params.matrix[0].forEach((currentRow, outerIndex) => {
    const mxColVal = Array.from(Array(params.matrix.length)).reduce(
      (maxValue, _, innerIndex) =>
        Math.max(maxValue, params.matrix[innerIndex][outerIndex]),
      -1e9
    );
    colsMax.push(mxColVal);
  });
  return params.matrix.reduce((result, currentRow, outerIndex) => {
    const rowMaxValue = currentRow.reduce(
      (maxValue, currentValue, innerIndex) =>
        Math.max(maxValue, colsMax[innerIndex] - currentValue),
      -1e9
    );
    result.push(rowMaxValue);
    return result;
  }, []);
};

router.post("/risk", (req, res) => {
  const { params, minProfit } = req.body;
  console.log(params);
  const result = [];
  result.push({
    tag: "Максимізація прибутку",
    value: profitMaximization(params),
    z: profitMaximizationZ(params),
  });
  result.push({
    tag: "Критерій мінімізації дисперсії",
    value: dispersionMinimization(params),
    z: dispersionMinimizationZ(params),
  });
  result.push({
    tag: "Критерій максимізації ймовірності розподілу оцінок",
    value: scoreDistributionMaximization(params, minProfit),
    z: scoreDistributionMaximizationZ(params, minProfit),
  });
  result.push({
    tag: "Критерій модальний",
    value: modalCriterion(params),
    z: modalCriterionZ(params),
  });
  console.log({ result });
  return res.status(200).json({ data: result });
});

router.post("/uncertainty", (req, res) => {
  const { params, alpha } = req.body;
  const result = [];
  result.push({
    tag: "Критерій максимакса",
    value: maxyMax(params),
    z: maxyMaxZ(params),
  });
  result.push({
    tag: "Мінімаксний критерій",
    value: minyMax(params),
    z: minyMaxZ(params),
  });
  result.push({
    tag: "Критерій максимін",
    value: maxyMin(params),
    z: maxyMinZ(params),
  });
  result.push({
    tag: "Критерій Гурвіца",
    value: gurvitzCriteria(params, alpha),
    z: gurvitzCriteriaZ(params),
  });
  result.push({
    tag: "Критерій Севіджа",
    value: sevigCriteria(params),
    z: sevigCriteriaZ(params),
  });
  return res.status(200).json({ data: result });
});

module.exports = router;
