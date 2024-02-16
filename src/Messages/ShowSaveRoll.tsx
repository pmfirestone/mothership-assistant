import { analyseRoll } from "helpers";
import { RollResult } from "Rules/types";

export function ShowSaveRoll(rollResult: RollResult) {
  const { rollDescription, rollValue, target, isSuccess, result } =
    analyseRoll(rollResult);
  return (
    <div>
      <div>Save roll: {rollDescription}</div>
      {result.map((r, i) => (
        <span
          key={i}
          className={`mx-1 ${r === rollValue ? "" : "text-mother-4"}`}
        >
          {r}
        </span>
      ))}
      vs {target} - <span>{isSuccess ? "Success" : "Failure"}!</span>
    </div>
  );
}
