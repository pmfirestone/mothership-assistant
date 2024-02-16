import { analyseRoll } from "helpers";
import { RollResult } from "Rules/types";

export function ShowStatRoll(rollResult: RollResult) {
  const { rollDescription, rollValue, target, isSuccess, result, isCritical } =
    analyseRoll(rollResult);
  return (
    <div>
      <div>Stat roll: {rollDescription}</div>
      {result.map((r, i) => (
        <span
          key={i}
          className={`mx-1 ${r === rollValue ? "" : "text-mother-4"}`}
        >
          {r}
        </span>
      ))}
      vs {target} -{" "}
      <span>
        {isCritical ? "Critical " : ""}
        {isSuccess ? "Success" : "Failure"}!
      </span>
    </div>
  );
}
