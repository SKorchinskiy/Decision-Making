import "./main-board.styles.css";
import ProblemOption from "../problem-option/problem-option.component";
import { useState } from "react";
import RiskConditionInput from "../risk-conditional-input/risk-conditional-input.component";
import UncertaintyConditionInput from "../uncertainty-conditional-input/uncertainty-conditional-input.component";

export type ProblemSettings = {
  alternatives: number;
  states: number;
  probabilities?: Array<number>;
  matrix: Array<Array<number>>;
  minProfit?: number;
  alpha?: number;
};

const initialProblemSettings: ProblemSettings = {
  alternatives: 1,
  states: 1,
  probabilities: [0],
  matrix: [[0]],
};

export type MainBoardProps = {
  onModalHideHandler: (_: boolean) => void;
  riskResultsHandler: (
    results: { tag: string; value: number; z: Array<number> }[]
  ) => void;
};

export default function MainBoard({
  onModalHideHandler,
  riskResultsHandler,
}: MainBoardProps) {
  const [problemType, setProblemType] = useState("");
  const [problemSettings, setProblemSettings] = useState<ProblemSettings>(
    initialProblemSettings
  );

  const problemSelectionHandler = (type: string) => setProblemType(type);
  const handleProblemSettingsChange = (
    updatedSettings: Partial<ProblemSettings>
  ) =>
    setProblemSettings((prev) => ({
      ...prev,
      ...updatedSettings,
    }));

  return (
    <div className="main-board-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "absolute",
          width: "100%",
          height: "40px",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          left: 0,
          top: 0,
        }}
      >
        <div
          style={{
            backgroundColor: "#C5DFF8",
            width: "50%",
            borderRight: "1px solid black",
            padding: "5px",
            userSelect: "none",
            cursor: "pointer",
            textAlign: "center",
            color: "black",
          }}
          onClick={() => {
            setProblemSettings(initialProblemSettings);
          }}
        >
          Стерти
        </div>
        <div
          style={{
            backgroundColor: "#C5DFF8",
            width: "50%",
            borderLeft: "1px solid black",
            padding: "5px",
            userSelect: "none",
            cursor: "pointer",
            textAlign: "center",
            color: "black",
          }}
          onClick={async () => {
            if (problemType === "risk") {
              const probabilitySum = problemSettings.probabilities?.reduce(
                (sum, currentValue) => (sum += currentValue),
                0
              );
              if (probabilitySum && Math.abs(1.0 - probabilitySum) > 1e-6) {
                alert(
                  `Expected probability sum to be 1. Instead received ${probabilitySum}`
                );
              } else {
                const response = await fetch(`http://localhost:8000/risk`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    params: { ...problemSettings },
                    minProfit: problemSettings.minProfit,
                  }),
                });
                const { data } = (await response.json()) as {
                  data: {
                    tag: string;
                    value: number;
                    z: Array<number>;
                  }[];
                };
                riskResultsHandler(data);
                onModalHideHandler(false);
              }
            } else {
              const response = await fetch(
                `http://localhost:8000/uncertainty`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    params: { ...problemSettings },
                    alpha: problemSettings.alpha,
                  }),
                }
              );
              const { data } = await response.json();
              riskResultsHandler(data);
              onModalHideHandler(false);
            }
          }}
        >
          Обчислити
        </div>
      </div>
      <h2>Оберіть тип задачі:</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ProblemOption
          isSelected={"risk" === problemType}
          option_name="Критерії прийняття рішення в умовах ризику"
          option_tag="risk"
          problemSelectionHandler={problemSelectionHandler}
        />
        <ProblemOption
          isSelected={"uncertainty" === problemType}
          option_name="Критерій прийняття рішень в умовах невизначеності"
          option_tag="uncertainty"
          problemSelectionHandler={problemSelectionHandler}
        />
      </div>
      <h2>Введіть вхідні дані для обраного типу задачі:</h2>
      {problemType ? (
        problemType === "risk" ? (
          <RiskConditionInput
            problemSettings={problemSettings}
            handleProblemSettingsChange={handleProblemSettingsChange}
          />
        ) : (
          <UncertaintyConditionInput
            problemSettings={problemSettings}
            handleProblemSettingsChange={handleProblemSettingsChange}
          />
        )
      ) : null}
    </div>
  );
}
