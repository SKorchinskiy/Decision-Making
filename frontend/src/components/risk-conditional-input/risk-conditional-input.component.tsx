import { ChangeEvent } from "react";
import { ProblemSettings } from "../main-board/main-board.component";

export type RiskConditionInputProps = {
  problemSettings: ProblemSettings;
  handleProblemSettingsChange: (_: Partial<ProblemSettings>) => void;
};

export default function RiskConditionInput({
  problemSettings,
  handleProblemSettingsChange,
}: RiskConditionInputProps) {
  return (
    <div>
      <div
        style={{
          display: "grid",
          rowGap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <div>&#8226; Кількість альтернативних рішень:</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "50px",
              marginLeft: "20px",
            }}
          >
            <span
              style={{
                cursor: "pointer",
                userSelect: "none",
                fontSize: "20px",
              }}
              onClick={() => {
                const newMatrix = [...problemSettings.matrix];
                if (newMatrix.length > 1) {
                  newMatrix.pop();
                  handleProblemSettingsChange({
                    alternatives: Math.max(problemSettings.alternatives - 1, 1),
                    matrix: newMatrix,
                  });
                }
              }}
            >
              ❬
            </span>
            <span
              style={{
                fontSize: "20px",
              }}
            >
              {problemSettings.alternatives}
            </span>
            <span
              style={{
                cursor: "pointer",
                userSelect: "none",
                fontSize: "20px",
              }}
              onClick={() => {
                const newMatrix = [...problemSettings.matrix];
                const newArray = Array.from(Array(problemSettings.states)).map(
                  () => 0
                );
                newMatrix.push(newArray);
                handleProblemSettingsChange({
                  alternatives: problemSettings.alternatives + 1,
                  matrix: newMatrix,
                });
              }}
            >
              ❭
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div>&#8226; Кількість станів середовища:</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "50px",
              marginLeft: "20px",
            }}
          >
            <span
              style={{
                cursor: "pointer",
                userSelect: "none",
                fontSize: "20px",
              }}
              onClick={() => {
                if (problemSettings.probabilities) {
                  const newProbabilities = [...problemSettings.probabilities];
                  if (newProbabilities.length > 1) {
                    newProbabilities.pop();
                    const newMatrix = problemSettings.matrix.map((rows) => {
                      const newRow = [...rows];
                      newRow.pop();
                      return newRow;
                    });
                    handleProblemSettingsChange({
                      states: Math.max(problemSettings.states - 1, 1),
                      probabilities: newProbabilities,
                      matrix: newMatrix,
                    });
                  }
                }
              }}
            >
              ❬
            </span>
            <span
              style={{
                fontSize: "20px",
              }}
            >
              {problemSettings.states}
            </span>
            <span
              style={{
                cursor: "pointer",
                userSelect: "none",
                fontSize: "20px",
              }}
              onClick={() => {
                if (problemSettings.probabilities) {
                  const newProbabilities = [...problemSettings.probabilities];
                  newProbabilities.push(0);
                  const newMatrix = problemSettings.matrix.map((rows) => {
                    const newRow = [...rows];
                    newRow.push(0);
                    return newRow;
                  });
                  handleProblemSettingsChange({
                    states: problemSettings.states + 1,
                    probabilities: newProbabilities,
                    matrix: newMatrix,
                  });
                }
              }}
            >
              ❭
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            &#8226; Кортеж ймовірностей, з якими можливі відповідні стани
            середовища:
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${problemSettings.states}, auto)`,
                columnGap: "10px",
              }}
            >
              {Array.from(Array(problemSettings.states)).map((_, index) => (
                <input
                  key={index}
                  type="number"
                  min={0}
                  max={1}
                  step={0.1}
                  defaultValue={0}
                  style={{
                    width: "50px",
                    height: "30px",
                    border: "0",
                    textAlign: "center",
                    borderRadius: "5px",
                  }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = +e.currentTarget.value;
                    console.log({ value });
                    if (problemSettings.probabilities) {
                      const newProbabilities = [
                        ...problemSettings.probabilities,
                      ];
                      newProbabilities[index] = value;
                      console.log({ newProbabilities });
                      handleProblemSettingsChange({
                        probabilities: newProbabilities,
                      });
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          &#8226; Матриця розмірності n x m з оцінками наслідків для кожного
          рішення у кожному стані середовища
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${problemSettings.states}, auto)`,
              columnGap: "10px",
              rowGap: "10px",
            }}
          >
            {Array.from(
              Array(problemSettings.states * problemSettings.alternatives)
            ).map((_, index) => (
              <input
                key={index}
                type="number"
                step={100}
                defaultValue={0}
                style={{
                  width: "50px",
                  height: "30px",
                  border: "0",
                  textAlign: "center",
                  borderRadius: "5px",
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const value = +e.currentTarget.value;
                  const newMatrix = [...problemSettings.matrix];
                  const pos = index;
                  const row = Math.floor(pos / problemSettings.states);
                  const col = Math.floor(pos % problemSettings.states);
                  console.log({ row, col });
                  newMatrix[row][col] = value;
                  handleProblemSettingsChange({
                    matrix: newMatrix,
                  });
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
