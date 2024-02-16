import { PlayerCharacter, Updater } from "Rules/types";

export interface StepProps {
  character: PlayerCharacter;
  onConfirm(character: PlayerCharacter): void;
}
