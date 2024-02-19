import { GameMessage } from "Messages/types";
import { allWoundTablesDict } from "Rules/Data/wounds";
import {
  NormalizedWound,
  WoundDescription,
  Character,
  Armor,
  InflictedDamage,
  Damage,
  WoundType,
  RollMode,
  PlayerCharacter,
} from "Rules/types";
import { applyRollMode, roll } from "./diceServices";

/**
 * Roll wounds and apply effects to a character.
 *
 * @param target The target (player, NPC, monster) to attack.
 * @param woundRolls The inflicted wounds to roll up.
 * @param log A function to publish the effects.
 */
export function applyWounds(
  target: PlayerCharacter,
  woundRolls: NormalizedWound[],
  log: null | ((m: GameMessage) => void),
): PlayerCharacter {
  let newTarget = { ...target };
  woundRolls.forEach((wr) => {
    const woundTable = allWoundTablesDict[wr.woundType];
    const woundRoll = applyRollMode(wr.rollMode, () => roll(1, 10));
    const woundEffect = woundTable.effects[woundRoll.result - 1];
    log &&
      log({
        type: "WoundEffectMessage",
        props: { type: wr.woundType, woundRoll },
      });
    newTarget = woundEffect.effect(newTarget);
  });
  return newTarget;
}

/**
 * Create a list of wounds to roll to apply to a character.
 */
export function countWounds({
  oldTarget,
  newTarget,
  wound,
}: {
  oldTarget: Character;
  newTarget: Character;
  wound: WoundDescription;
}): NormalizedWound[] {
  const normWound = normalizeWoundDescription(wound);
  let woundsToInflict = [];
  for (let i = 0; i < newTarget.wounds - oldTarget.wounds; i++) {
    woundsToInflict.push(normWound);
  }

  return woundsToInflict.flat();
}
/**
 * Apply rolled damage to character.
 *
 * @param target The character to attack.
 * @param damage The damage to inflict.
 * @return A new character with wound counts, damage, and armor updated as appropriate.
 */
export function applyDamage(
  target: Character,
  damage: InflictedDamage,
): Character {
  let newTarget = { ...target };
  // "Some attacks deal Wounds directly (bypassing any Armor or Damage Reduction)." PSG pg. 29.1
  if (damage.inflicted === "wounds") {
    newTarget.wounds += damage.amount;
    return newTarget;
  }

  // "Damage Reduction occurs first." PSG pg. 28.3
  const damageReduction: number = target.armor
    .filter((a: Armor) => a.damageReduction > 0)
    .map((a: Armor) => a.damageReduction)
    .reduce((acc, cur) => acc + cur, 0);
  let passedThroughDamage =
    damage.roll.result + damage.minDamage - damageReduction;

  // "Weapons with Anti-Armor ignore and destroy armor whenever they hit." PSG pg. 28.3
  if (damage?.antiArmor) {
    newTarget.armor = [];
  }

  // "Characters ignore all damage less than their armor's Armor Points (AP)." PSG pg. 28.3
  const armorPoints: number = newTarget.armor
    .filter((a: Armor) => a.armorPoints > 0)
    .map((a: Armor) => a.armorPoints)
    .reduce((acc, cur) => acc + cur, 0);

  if (passedThroughDamage < armorPoints) {
    return newTarget;
  }

  // "If [Characters] ever take Damage grater than or equal to their AP in
  // one hit, their armor is destroyed and they suffer any remaining Damage." PSG pg. 28.3
  if (passedThroughDamage >= armorPoints) {
    newTarget.armor = [];
    passedThroughDamage -= armorPoints;
  }

  if (newTarget.health && damage.inflicted === "health") {
    // "When taking Damage, subtract it from Health." PSG 28.2
    while (passedThroughDamage > 0) {
      // Ugly hack to calm the compiler: by the time this line is reached we know we have a health attribute.
      newTarget?.health && newTarget.health--;
      passedThroughDamage--;
      if (newTarget.health == 0) {
        // "If your health reaches zero, gain a Wound." PSG pg. 28.2
        newTarget.wounds++;
        // "Then, reset the character's Health to Maximum and subtract any carryover damage." PSG pg. 28.2
        newTarget.health = newTarget.maxHealth;
      }
    }
  } else {
    // "If there is no Health listed, any damage causes a Wound." UCR pg. 2.6
    newTarget.wounds += 1;
  }

  return newTarget;
}

/**
 * Roll for damage.
 * @param damage The damage set up to apply RNG to, from a {@link Weapon} or {@link Attack}.
 * @param rollMode Whether rolling normally, or with advantage or disadvantage.
 * @return The damage with random numbers in it. The caller should interpret these.
 */
// FIXME: This can be done much better, but as it is depends on the structure of
// the Damage type: this effectively parses, manually, each of the individual
// types of damage.
export function rollDamage(
  damage: Damage,
  wound: WoundDescription = "Blunt Force", // Silly default.
): InflictedDamage {
  if (damage.damageType === "d100") {
    return {
      ...damage,
      roll: applyRollMode(damage.rollMode, () => roll(1, 100)),
      wound,
    };
  }
  if (damage.damageType === "d10x10") {
    return {
      ...damage,
      roll: applyRollMode(damage.rollMode, () => roll(1, 10) * 10),
      wound,
    };
  }
  if (damage.damageType === "d5MinusOneWounds") {
    return {
      ...damage,
      roll: applyRollMode(damage.rollMode, () => roll(1, 5) - 1),
      wound,
    };
  }
  if (damage.damageType === "fixedDamage") {
    return {
      ...damage,
      roll: { result: damage.amount, rolls: [damage.amount] },
      wound,
    };
  }
  if (damage.damageType === "fixedWounds") {
    return {
      ...damage,
      roll: { result: damage.amount, rolls: [damage.amount] },
      wound,
    };
  }
  if (damage.damageType === "xd10") {
    return {
      ...damage,
      roll: applyRollMode(damage.rollMode, () => roll(damage.amount, 10)),
      wound,
    };
  }
  if (damage.damageType === "xd20") {
    return {
      ...damage,
      roll: applyRollMode(damage.rollMode, () => roll(damage.amount, 10)),
      wound,
    };
  }
  if (damage.damageType === "xd5") {
    return {
      ...damage,
      roll: applyRollMode(damage.rollMode, () => roll(damage.amount, 5)),
      wound,
    };
  }

  throw new Error("unknown damage type");
}

export function getRollModeSuffix(rollMode: RollMode): string {
  if (rollMode === "normal") {
    return "";
  }
  if (rollMode === "advantage") {
    return " [+]";
  }
  if (rollMode === "disadvantage") {
    return " [-]";
  }
  throw new Error("unknown roll mode");
}

export function getDamageDescription(damages: Damage): string {
  if (damages.damageType === "d100") {
    return "d100 DMG";
  }
  if (damages.damageType === "d10x10") {
    return "d10x10 DMG";
  }
  if (damages.damageType === "d5MinusOneWounds") {
    return "d5 - 1 Wounds";
  }
  if (damages.damageType === "fixedDamage") {
    return `${damages.amount} DMG`;
  }
  if (damages.damageType === "fixedWounds") {
    return `${damages.amount} Wounds`;
  }
  if (damages.damageType === "xd10") {
    return `${damages.amount}d10 DMG`;
  }
  if (damages.damageType === "xd20") {
    return `${damages.amount}d20 DMG`;
  }
  if (damages.damageType === "xd5") {
    return `${damages.amount}d5 DMG`;
  }

  throw new Error("unknown damage type");
}

export function normalizedWoundToDescription(wt: WoundType): WoundDescription {
  if (wt === "bleeding") {
    return "Bleeding";
  }
  if (wt === "blunt") {
    return "Blunt Force";
  }
  if (wt === "fire") {
    return "Fire/Explosives";
  }
  if (wt === "gore") {
    return "Gore";
  }
  if (wt === "gunshot") {
    return "Gunshot";
  }
  throw new Error("Unknown wound type");
}

export function deNormalizeCriticalType(
  normalizedCriticalType: NormalizedWound,
): WoundDescription {
  const { rollMode, woundType } = normalizedCriticalType;
  if (woundType === "bleeding") {
    if (rollMode === "normal") {
      return "Bleeding";
    }
    if (rollMode === "advantage") {
      return "Bleeding [+]";
    }
    if (rollMode === "disadvantage") {
      return "Bleeding [-]";
    }
  }
  if (woundType === "blunt") {
    if (rollMode === "normal") {
      return "Blunt Force";
    }
    if (rollMode === "advantage") {
      return "Blunt Force [+]";
    }
    if (rollMode === "disadvantage") {
      return "Blunt Force [-]";
    }
  }
  if (woundType === "fire") {
    if (rollMode === "normal") {
      return "Fire/Explosives";
    }
    if (rollMode === "advantage") {
      return "Fire/Explosives [+]";
    }
    if (rollMode === "disadvantage") {
      return "Fire/Explosives [-]";
    }
  }
  if (woundType === "gore") {
    if (rollMode === "normal") {
      return "Gore";
    }
    if (rollMode === "advantage") {
      return "Gore [+]";
    }
    if (rollMode === "disadvantage") {
      return "Gore [-]";
    }
  }
  if (woundType === "gunshot") {
    if (rollMode === "normal") {
      return "Gunshot";
    }
    if (rollMode === "advantage") {
      return "Gunshot [+]";
    }
    if (rollMode === "disadvantage") {
      return "Gunshot [-]";
    }
  }

  throw new Error("unknown critical type");
}

export function normalizeWoundDescription(
  criticalType: WoundDescription,
): NormalizedWound[] {
  if (criticalType === "Bleeding") {
    return [{ woundType: "bleeding", rollMode: "normal" }];
  }
  if (criticalType === "Bleeding [-]") {
    return [{ woundType: "bleeding", rollMode: "disadvantage" }];
  }
  if (criticalType === "Bleeding [+]") {
    return [{ woundType: "bleeding", rollMode: "advantage" }];
  }
  if (criticalType === "Blunt Force") {
    return [{ woundType: "blunt", rollMode: "normal" }];
  }
  if (criticalType === "Blunt Force [-]") {
    return [{ woundType: "blunt", rollMode: "disadvantage" }];
  }
  if (criticalType === "Blunt Force [+]") {
    return [{ woundType: "blunt", rollMode: "advantage" }];
  }
  if (criticalType === "Fire/Explosives") {
    return [{ woundType: "fire", rollMode: "normal" }];
  }
  if (criticalType === "Fire/Explosives [-]") {
    return [{ woundType: "fire", rollMode: "disadvantage" }];
  }
  if (criticalType === "Fire/Explosives [+]") {
    return [{ woundType: "fire", rollMode: "advantage" }];
  }
  if (criticalType === "Gore") {
    return [{ woundType: "gore", rollMode: "advantage" }];
  }
  if (criticalType === "Gore [-]") {
    return [{ woundType: "gore", rollMode: "disadvantage" }];
  }
  if (criticalType === "Gore [+]") {
    return [{ woundType: "gore", rollMode: "advantage" }];
  }
  if (criticalType === "Gunshot") {
    return [{ woundType: "gunshot", rollMode: "normal" }];
  }
  if (criticalType === "Gunshot [-]") {
    return [{ woundType: "gunshot", rollMode: "disadvantage" }];
  }
  if (criticalType === "Gunshot [+]") {
    return [{ woundType: "gunshot", rollMode: "advantage" }];
  }
  if (criticalType === "Bleeding + Gore") {
    return [
      { woundType: "bleeding", rollMode: "normal" },
      { woundType: "gore", rollMode: "normal" },
    ];
  }
  if (criticalType === "Bleeding [+] or Gore [+]") {
    return [
      { woundType: "gore", rollMode: "advantage" },
      { woundType: "bleeding", rollMode: "advantage" },
    ];
  }

  throw new Error("unknown critical type");
}
