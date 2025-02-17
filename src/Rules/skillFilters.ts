import { toDict } from "Services/storageServices";
import { allSkillsDict } from "./Data/skills";
import {
  SkillDefinition,
  SkillType,
  SkillLevel,
  CharacterSkill,
} from "./types";

export type SkillFilter = (s: SkillDefinition) => boolean;

export function isPrerequisiteOk(
  selectedSkills: CharacterSkill[],
): SkillFilter {
  const selectedDict = toDict(selectedSkills, (s) => s.type);
  return (s: SkillDefinition) => {
    const { prerequisites } = allSkillsDict[s.key];
    if (prerequisites.length === 0) {
      return true;
    }
    return prerequisites.some((p) => !!selectedDict[p]);
  };
}

export function isNotSelected(selectedSkills: CharacterSkill[]): SkillFilter {
  const selectedDict = toDict(selectedSkills, (s) => s.type);
  return (s: SkillDefinition) => {
    return !selectedDict[s.key];
  };
}

export function isSkillLevel(level: SkillLevel): SkillFilter {
  return (s: SkillDefinition) => s.level === level;
}

export function and(cb1: SkillFilter, cb2: SkillFilter): SkillFilter {
  return (s: SkillDefinition) => cb1(s) && cb2(s);
}

export function or(cb1: SkillFilter, cb2: SkillFilter): SkillFilter {
  return (s: SkillDefinition) => cb1(s) || cb2(s);
}

export function never(s: SkillDefinition) {
  return false;
}

export function always(s: SkillDefinition) {
  return true;
}
