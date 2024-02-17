import { Log } from "Messages/types";
import { SetMode, WriteCharacter } from "./types";
import { useState } from "react";
import { Block, Button, Divider, Title } from "UI/Atoms";
import { InflictedDamage, PlayerCharacter } from "Rules/types";
import { allWoundTables } from "Rules/Data/wounds";
import {
  normalizedWoundToDescription,
  applyDamage,
  normalizeWoundDescription,
} from "Services/damageServices";

export function TakeDamage({
  setCharacter,
  setMode,
  log,
}: WriteCharacter & SetMode & Log) {
  const [damage, setDamage] = useState<InflictedDamage>({
    damageType: "xd10",
    inflicted: "health",
    amount: 1,
    minDamage: 0,
    antiArmor: false,
    rollMode: "normal",
    wound: normalizeWoundDescription("Gunshot"),
    roll: { rolls: [], result: 0 },
  });
  return (
    <Block variant="light">
      <Title>Take damage</Title>
      <div className="flex flex-col gap-2">
        <input
          className="input"
          type="number"
          value={damage?.roll.result.toString()}
          onChange={(e) => {
            setDamage((d) => {
              const value = parseInt(e.target.value);
              return { ...d, roll: { result: value, rolls: [value] } };
            });
          }}
        />
        <Divider />
        <div className="flex justify-center gap-2">
          <Button
            light={damage?.inflicted !== "health"}
            rounded
            onClick={() => {
              setDamage((d) => ({ ...d!, inflicted: "health" }));
            }}
          >
            health
          </Button>
          <Button
            light={damage?.inflicted !== "wounds"}
            rounded
            onClick={() => {
              setDamage((d) => ({ ...d!, inflicted: "wounds" }));
            }}
          >
            wounds
          </Button>
        </div>
        <Divider />
        <div className="flex justify-center gap-2">
          <Button
            dark
            rounded
            onClick={() => {
              setCharacter((c) => applyDamage(c, damage) as PlayerCharacter);
              log({ type: "DamageMessage", props: damage });
              setMode({ mode: "CharacterSheet" });
            }}
          >
            take damage
          </Button>
          <Button
            rounded
            onClick={() => {
              setMode({ mode: "CharacterSheet" });
            }}
          >
            back
          </Button>
        </div>
      </div>
    </Block>
  );
}
