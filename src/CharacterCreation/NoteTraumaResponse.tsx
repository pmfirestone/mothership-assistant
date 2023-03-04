import { Block, Button2, Title } from "../Atoms";
import { classDefinitionsDict } from "../Data/data";
import { BlockWithTitle } from "../Molecules";
import { StepProps } from "./types";

export function NoteTraumaResponse({ character, onConfirm }: StepProps) {
  const done = true;
  const { characterClass } = character;
  return (
    <div className="flex flex-col">
      <Block variant="light">
        <Title>6. Take note of your class's trauma response</Title>
        <BlockWithTitle title={characterClass}>
          {classDefinitionsDict[characterClass].traumaResponse}
        </BlockWithTitle>
      </Block>
      <div className="self-center">
        <Button2 disabled={!done} onClick={() => onConfirm(character)}>
          Confirm
        </Button2>
      </div>
    </div>
  );
}
