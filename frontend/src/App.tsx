import { useState } from "react";
import "./App.css";
import MainBoard from "./components/main-board/main-board.component";
import RiskResultModal from "./components/risk-result-modal/risk-result-modal.component";

function App() {
  const [isRiskModalHidden, setIsRiskModalHidden] = useState(true);
  const [riskResults, setRiskResults] =
    useState<{ tag: string; value: number; z: Array<number> }[]>();

  const onModalHideHandler = (value: boolean) => setIsRiskModalHidden(value);
  const riskResultsHandler = (
    results: { tag: string; value: number; z: Array<number> }[]
  ) => setRiskResults(results);

  return (
    <div className="app-container">
      <div className="app-container-right">
        <MainBoard
          onModalHideHandler={onModalHideHandler}
          riskResultsHandler={riskResultsHandler}
        />
      </div>
      {isRiskModalHidden ? null : (
        <>
          <div
            className="overlay"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
          />
          <RiskResultModal
            onModalHideHandler={onModalHideHandler}
            data={riskResults!}
          />
        </>
      )}
    </div>
  );
}

export default App;
