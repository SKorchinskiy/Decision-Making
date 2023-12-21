export type RiskResultModalProps = {
  onModalHideHandler: (value: boolean) => void;
  data: { tag: string; value: number; z: Array<number> }[];
};

export default function RiskResultModal({
  data,
  onModalHideHandler,
}: RiskResultModalProps) {
  return (
    <div
      className="risk-result-modal-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <div
        className="risk-result-modal"
        style={{
          position: "relative",
          width: "700px",
          height: "750px",
          backgroundColor: "#7895CB",
          borderRadius: "20px",
          boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.8)",
          overflow: "scroll",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: "50px",
            backgroundColor: "#4A55A2",
            borderRadius: "20px 20px 0px 0px",
          }}
        >
          <div
            style={{
              padding: "10px",
              width: "50px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "0px 20px 0px 0px",
              textAlign: "center",
              userSelect: "none",
              cursor: "pointer",
              color: "white",
            }}
            onClick={() => onModalHideHandler(true)}
          >
            &#215;
          </div>
        </div>
        <div
          style={{
            top: 120,
            left: 10,
            position: "absolute",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {data.map(({ tag, value, z }) => (
            <div
              style={{
                fontSize: "20px",
              }}
            >
              {tag}: {Math.floor(value * 100) / 100}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, auto)",
                }}
              >
                {z.map((value, index) => (
                  <div
                    style={{
                      margin: "5px",
                    }}
                  >
                    Z{index}: {Math.floor(value * 100) / 100}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
