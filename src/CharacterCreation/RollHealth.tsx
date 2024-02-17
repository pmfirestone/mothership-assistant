import { useState } from "react";
import { Block, Button, Title } from "UI/Atoms";
import { Gauge } from "UI/Molecules";
import { roll } from "Services/diceServices";
import { PlayerCharacter } from "Rules/types";
import { StepProps } from "./types";

export function RollHealth({ character, onConfirm }: StepProps) {
  const [newCharacter, setCharacter] = useState({ ...character });
  const done = (newCharacter?.maxHealth ?? 0) > 0;

  function rollHealth(): void {
    const maxHealth = roll(1, 10) + 10;
    const newChar: PlayerCharacter = {
      ...newCharacter,
      maxHealth,
      health: maxHealth,
    };
    setCharacter(newChar);
  }

  return (
    <div className="flex flex-col gap-2">
      <Block variant="light">
        <Title>4. Roll 1d10 + 10 for your health</Title>
        <div className="flex flex-wrap justify-center gap-x-8">
          <Gauge
            title="Health"
            limitName="Maximum"
            current={newCharacter.health ?? 0}
            limit={newCharacter.maxHealth ?? 0}
          />
          <Gauge
            title="Wounds"
            limitName="Maximum"
            current={newCharacter.wounds}
            limit={newCharacter.maxWounds}
          />
        </div>
      </Block>
      <div className="self-center flex gap-2">
        <Button rounded dark disabled={done} onClick={rollHealth}>
          Roll
        </Button>
        <Button
          rounded
          dark
          disabled={!done}
          onClick={() => onConfirm(newCharacter)}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
