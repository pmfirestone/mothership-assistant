import { useState } from "react";
import { Block, Button, Title } from "UI/Atoms";
import { allStats } from "Rules/data";
import { Rating } from "UI/Molecules";
import { roll } from "Services/diceServices";
import { StepProps } from "./types";

export function RollStats({ character, onConfirm }: StepProps) {
  const [newCharacter, setCharacter] = useState({ ...character });
  const done = newCharacter.strength > 0;

  function rollStats(): void {
    let newChar = character;
    allStats.forEach((save) => {
      newChar = { ...newChar, [save]: roll(2, 10) + 25 };
    });
    setCharacter(newChar);
  }

  return (
    <div className="flex flex-col gap-2">
      <Block variant="light">
        <Title>1. Roll 2d10 + 25 for each stat</Title>
        <div className="flex flex-wrap justify-center gap-8">
          <Rating title="Strength" value={newCharacter.strength} />
          <Rating title="Speed" value={newCharacter.speed} />
          <Rating title="Intellect" value={newCharacter.intellect} />
          <Rating title="Combat" value={newCharacter.combat} />
        </div>
      </Block>
      <div className="self-center flex gap-2">
        <Button rounded dark disabled={done} onClick={rollStats}>
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
