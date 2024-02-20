import { InflictedDamage, PlayerCharacter } from "Rules/types";
import { MessageContext } from "./types";
import { Button } from "UI/Atoms";
import { applyDamage, countWounds, applyWounds } from "Services/damageServices";

export function ShowDamage({
  damageType,
  inflicted,
  amount,
  minDamage,
  antiArmor,
  rollMode,
  roll,
  wound,
  context,
}: InflictedDamage & { context: MessageContext }) {
  const { result: result, rolls: rolls } = roll;
  return (
    <div>
      <div>Damage</div>
      {rolls.map((r, i) => (
        <span key={i} className={`mx-1 ${r === result ? "" : "text-mother-4"}`}>
          {r}
        </span>
      ))}
      <span>
        {} - {wound} - {inflicted}
      </span>
      <div>
        <Button
          dark
          rounded
          onClick={() => {
            const inflictedDamage: InflictedDamage = {
              damageType,
              inflicted,
              amount,
              minDamage,
              antiArmor,
              rollMode,
              roll,
              wound,
            };
            if (context.type === "player") {
              context.setCharacter((c) => {
                return applyDamage(c, inflictedDamage) as PlayerCharacter;
              });
            }
            if (context.type === "warden") {
              context.setMode({ mode: "DealDamage", damage: inflictedDamage });
            }
          }}
        >
          Take damage
        </Button>
      </div>
    </div>
  );
}
