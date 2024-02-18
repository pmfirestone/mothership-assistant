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
              // not using setter function because it is run twice and we are emitting messages
              const newChar = applyDamage(
                context.character,
                inflictedDamage,
              ) as PlayerCharacter;
              const wounds = countWounds(
                context.character,
                newChar,
                inflictedDamage.wound,
              );
              context.setCharacter(
                () =>
                  applyWounds(newChar, wounds, context.log) as PlayerCharacter,
              );
              return;
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
