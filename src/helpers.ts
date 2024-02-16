import { GameMessage, StampedMessage } from "Messages/types";
import { useMemo } from "react";
import { stressTable } from "Rules/data";
import { allSkillsDict, allSkillLevelDefinitionDict } from "Rules/Data/skills";
import {
  BaseCharacter,
  Character,
  CustomEntry,
  Game,
  PanicRollAnalysis,
  PanicRollResult,
  RevealedElement,
  RollMode,
  RollAnalysis,
  RollResult,
  WithId,
} from "Rules/types";
import { uuidv4 } from "Services/storageServices";

export function formatCredits(c: number): string {
  if (Math.abs(c) >= 1000) {
    return `${c / 1000}kcr`;
  }
  return `${c}cr`;
}

export function clone<T extends WithId>(e: T): T {
  return { ...e, id: uuidv4() };
}

const rollModeDescr: Record<RollMode, string> = {
  advantage: " [+]",
  disadvantage: " [-]",
  normal: "",
};


/**
 * Determine the outcome of a roll.
 *
 * @param rollResult A roll to which RNG has been applied.
 * @return The roll with the analysis fields filled.
 */
export function analyseRoll(rollResult: RollResult): RollAnalysis {
  const { stat, skill, rollMode, result } = rollResult;
  let rollValue = result[0];
  const skillDefinition = skill !== null ? allSkillsDict[skill.type] : null;
  const skillLevel =
    skillDefinition !== null
      ? allSkillLevelDefinitionDict[skillDefinition.level]
      : null;
  const skillBonus =
    skill?.lossOfConfidence || skillLevel == null ? 0 : skillLevel.bonus;
  const target = stat.value + skillBonus;

  // The logic here is absurdly convoluted, actually: it's easy to say in
  // English, but shockingly difficult to implement concisely. I'll just use
  // a devilish hack mapping pairs of booleans to a ranking, thus:
  // T,T > T,F > F,F > F,T => 3 > 2 > 1 > 0.
  // Unfortunately this doesn't actually map to binary or anything useful.
  function analysePair(success: boolean, critical: boolean): number {
    return success && critical
      ? 3
      : success && !critical
        ? 2
        : !success && !critical
          ? 1
          : !success && critical
            ? 0
            : -1; // Should never reach this.
  }

  // Use min and max to catch the case where there's only one result.
  const [firstSuccess, firstCrit] = [
    Math.min(...result) < target,
    Math.min(...result) % 11 == 0,
  ];

  const [secondSuccess, secondCrit] = [
    Math.max(...result) < target,
    Math.max(...result) % 11 == 0,
  ];

  const firstResult = analysePair(firstSuccess, firstCrit);
  const secondResult = analysePair(secondSuccess, secondCrit);

  let isSuccess: boolean;
  let isCritical: boolean;

  if (rollMode === "advantage") {
    // Take better result i.e. higher value.
    if (firstResult > secondResult) {
      isSuccess = firstSuccess;
      isCritical = firstCrit;
    } else {
      isSuccess = secondSuccess;
      isCritical = secondCrit;
    }
  } else if (rollMode === "disadvantage") {
    // Take worse result i.e. lower value.
    if (firstResult < secondResult) {
      isSuccess = firstSuccess;
      isCritical = firstCrit;
    } else {
      isSuccess = secondSuccess;
      isCritical = secondCrit;
    }
  } else {
    isSuccess = firstSuccess; // === highResult
    isCritical = firstCrit; // === highCrit
  }

  const skillDescription =
    skillDefinition !== null ? ` + ${skillDefinition?.name}` : "";
  const rollDescription = `${stat.name}${skillDescription}${rollModeDescr[rollMode]}`;
  return {
    ...rollResult,
    skillDefinition,
    skillLevel,
    target,
    rollValue,
    isSuccess,
    isCritical,
    rollDescription
  };
}

export function analysePanicRoll(
  rollResult: PanicRollResult,
): PanicRollAnalysis {
  const { stress, rollMode, result } = rollResult;
  let rollValue = result[0];
  const maxVal = Math.max(...result);
  const minVal = Math.min(...result);
  if (rollMode === "advantage") {
    rollValue = maxVal > stress ? maxVal : minVal;
  }
  if (rollMode === "disadvantage") {
    rollValue = maxVal <= stress ? maxVal : minVal;
  }
  const target = stress;
  const isSuccess = rollValue > target;
  const rollDescritpion = `panic${rollModeDescr[rollMode]}`;
  return {
    ...rollResult,
    target,
    rollValue,
    isSuccess,
    rollDescritpion,
  };
}

export function updateInList<T extends WithId>(
  list: T[],
  id: string,
  setter: (e: T) => T,
): T[] {
  return list.map((e) => {
    if (e.id !== id) {
      return e;
    } else {
      return setter(e);
    }
  });
}

export function deleteInList<T extends WithId>(list: T[], id: string): T[] {
  return list.filter((e) => {
    return e.id !== id;
  });
}

export function useBrowserId(): string {
  return useMemo(() => {
    const key = "browser_id";
    const cached = localStorage.getItem(key);
    if (cached) {
      return cached;
    }
    const newId = uuidv4();
    localStorage.setItem(key, newId);
    return newId;
  }, []);
}

export function applyPanic(
  character: Character,
  log: (m: GameMessage) => void,
  result: number,
): Character {
  log({ type: "PanicEffectMessage", props: { result } });
  const entry = stressTable[result];
  return entry.effect(character, log);
}

export function getDebouncer(delay: number): (cb: () => void) => void {
  let debounceTimer: number;
  return (callback: () => void) => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callback, delay);
  };
}
