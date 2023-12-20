import "./problem-option.styles.css";

export type ProblemOptionProps = {
  isSelected: boolean;
  option_name: string;
  option_tag: string;
  problemSelectionHandler: (type: string) => void;
};

export default function ProblemOption({
  isSelected,
  option_name,
  option_tag,
  problemSelectionHandler,
}: ProblemOptionProps) {
  return (
    <div
      className={`problem-option-container ${
        isSelected ? "problem-selected" : ""
      }`}
      style={{
        display: "flex",
        alignItems: "center",
      }}
      onClick={() => problemSelectionHandler(option_tag)}
    >
      <div
        className="bullet"
        style={{
          marginRight: "50px",
          borderRadius: "40px",
        }}
      />
      <h3>{option_name}</h3>
    </div>
  );
}
