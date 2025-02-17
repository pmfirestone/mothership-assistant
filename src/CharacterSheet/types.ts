import {
  Character,
  PlayerCharacter,
  CharacterSkill,
  ConditionType,
  SkillType,
} from "Rules/types";

export interface ReadCharacter {
  character: PlayerCharacter;
}

export interface WriteCharacter {
  setCharacter(setter: (c: PlayerCharacter) => PlayerCharacter): void;
}

export type ReadWriteCharacter = ReadCharacter & WriteCharacter;

export interface ReadBaseChar {
  character: Character;
}

export interface WriteBaseChar {
  setCharacter(setter: (c: Character) => Character): void;
}

export type ReadWriteBaseChar = ReadBaseChar & WriteBaseChar;

export interface Wallet {
  credits: number;
  pay(amount: number): void;
}

export interface Cancel {
  onCancel(): void;
}

interface PlayerSessionMode<T extends string> {
  mode: T;
}

export type Modes =
  | PlayerSessionMode<"CharacterSheet">
  | PlayerSessionMode<"AddCondition">
  | (PlayerSessionMode<"ViewCondition"> & { condition: ConditionType })
  | PlayerSessionMode<"ViewBleeding">
  | PlayerSessionMode<"ViewTrinket">
  | PlayerSessionMode<"ViewPatch">
  | PlayerSessionMode<"SelectSkill">
  | (PlayerSessionMode<"StartTrainingSkill"> & { skill: SkillType })
  | PlayerSessionMode<"TrainSkill">
  | (PlayerSessionMode<"ViewSkill"> & { skill: CharacterSkill })
  | PlayerSessionMode<"AddWeapon">
  | PlayerSessionMode<"AddArmor">
  | PlayerSessionMode<"AddEquipment">
  | PlayerSessionMode<"AddCredits">
  | PlayerSessionMode<"AddCustomItem">
  | PlayerSessionMode<"AddContractor">
  | (PlayerSessionMode<"ViewWeapon"> & { weaponId: string })
  | (PlayerSessionMode<"ViewArmor"> & { armorId: string })
  | (PlayerSessionMode<"ViewEquipment"> & { equipmentId: string })
  | (PlayerSessionMode<"ViewContractor"> & { contractorId: string })
  | PlayerSessionMode<"EditStats">
  | PlayerSessionMode<"RollSave">
  | PlayerSessionMode<"RollRest">
  | PlayerSessionMode<"RollStat">
  | (PlayerSessionMode<"RollAttack"> & { weaponId: string })
  | PlayerSessionMode<"PanicCheck">
  | PlayerSessionMode<"TakeDamage">
  | PlayerSessionMode<"RollWound">;

export interface SetMode {
  setMode(mode: Modes): void;
}
