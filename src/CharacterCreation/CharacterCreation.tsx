import { useState } from "react";
import { initCharacter } from "Services/characterServices";
import { PlayerCharacter } from "Rules/types";
import { GainStress } from "./GainStress";
import { NoteTraumaResponse } from "./NoteTraumaResponse";
import { PersonalDetails } from "./PersonalDetails";
import { RollEquipment } from "./RollEquipment";
import { RollHealth } from "./RollHealth";
import { RollSaves } from "./RollSaves";
import { RollStats } from "./RollStats";
import { SelectClass } from "./SelectClass";
import { SelectSkills } from "./SelectSkills";
import { StepProps } from "./types";

const Steps: ((props: StepProps) => JSX.Element)[] = [
  RollStats,
  RollSaves,
  SelectClass,
  RollHealth,
  GainStress,
  NoteTraumaResponse,
  SelectSkills,
  RollEquipment,
  PersonalDetails,
];

interface Props {
  onComplete(character: PlayerCharacter): void;
}

export function CharacterCreation({ onComplete }: Props) {
  const [character, setCharacter] = useState(initCharacter());
  const [step, setStep] = useState(0);
  function next(character: PlayerCharacter) {
    if (Steps[step + 1] === undefined) {
      onComplete(character);
    } else {
      setCharacter(character);
      setStep((i) => i + 1);
    }
  }
  const Step = Steps[step];
  if (Step === undefined) {
    return <div>error</div>;
  }
  return (
    <div className="max-w-xl mx-auto w-full">
      <Step character={character} onConfirm={next} />
    </div>
  );
}
