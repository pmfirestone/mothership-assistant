import { expect, test } from "vitest";
import { Character } from "Rules/types";
import { applyDamage, normalizeWoundDescription } from "./damageServices";
import { allArmorDict } from "Rules/data";
/*
  All possible cases:

  Compare damage and armor: DMG >= AP, DMG < AP
  Anti-armor present or absent: AA, ~AA
  Compare damage reduction and damage: DR >= DMG, DR < DMG
  Compare damage dealt and health: max(DMG-AP, 0) >= HP, max(DMG-AP, 0) < HP

  Sixteen combinations of the above cases, not including the cases where AP, DR, or HP are 0.
  Special cases:
  HP == 0: deal a wound if any DMG gets through AP and DR.
  Deal a wound or wounds directly.
*/

const testNPC: Character = {
  id: "",
  name: "",
  pronouns: "",
  wounds: 0,
  maxWounds: 3,
  equipment: [],
  armor: [allArmorDict["vaccsuit"]],
  weapons: [],
  items: [],
};

const testChar: Character = {
  id: "",
  name: "",
  pronouns: "",
  wounds: 0,
  maxWounds: 3,
  health: 10,
  maxHealth: 10,
  equipment: [],
  armor: [allArmorDict["standardBattleDress"]],
  weapons: [],
  items: [],
};

test("applyDamage (less than armor)", () => {
  expect(
    applyDamage(testChar, {
      damageType: "fixedDamage",
      amount: 5,
      antiArmor: false,
      minDamage: 0,
      rollMode: "normal",
      roll: { rolls: [1, 3], result: 4 },
      wound: "Blunt Force",
      inflicted: "health",
    }),
  ).toStrictEqual(testChar);
});

test("applyDamage (less than armor, anti-armor)", () => {
  const exp = structuredClone(testChar);
  exp.armor = [];
  exp.health -= 4;
  expect(
    applyDamage(testChar, {
      damageType: "fixedDamage",
      antiArmor: true,
      amount: 5,
      minDamage: 0,
      rollMode: "normal",
      roll: { rolls: [1, 3], result: 4 },
      wound: "Blunt Force",
      inflicted: "health",
    }),
  ).toStrictEqual(exp);
});

test("applyDamage (more than armor)", () => {
  const exp = structuredClone(testChar);
  exp.armor = [];
  exp.health -= 1;
  expect(
    applyDamage(testChar, {
      damageType: "fixedDamage",
      antiArmor: false,
      amount: 5,
      minDamage: 0,
      rollMode: "normal",
      roll: { rolls: [1, 3], result: 8 },
      wound: "Blunt Force",
      inflicted: "health",
    }),
  ).toStrictEqual(exp);
});

test("applyDamage (more than armor, causes wound)", () => {
  const exp = structuredClone(testChar);
  exp.armor = [];
  exp.health = 7;
  exp.wounds = 1;
  expect(
    applyDamage(testChar, {
      damageType: "fixedDamage",
      antiArmor: false,
      amount: 5,
      minDamage: 0,
      rollMode: "normal",
      roll: { rolls: [], result: 20 },
      wound: "Blunt Force",
      inflicted: "health",
    }),
  ).toStrictEqual(exp);
});

test("applyDamage (damage reduction)", () => {
  testChar.armor = [allArmorDict["advancedBattleDress"]];
  const exp = structuredClone(testChar);
  exp.armor = [];
  expect(
    applyDamage(testChar, {
      damageType: "fixedDamage",
      antiArmor: true,
      minDamage: 0,
      amount: 5,
      rollMode: "normal",
      roll: { rolls: [], result: 3 },
      wound: "Blunt Force",
      inflicted: "health",
    }),
  ).toStrictEqual(exp);
});

test("applyDamage (no health, hit to wound)", () => {
  const exp = structuredClone(testNPC);
  exp.wounds = 1;
  exp.armor = [];
  expect(
    applyDamage(testNPC, {
      damageType: "fixedDamage",
      antiArmor: false,
      amount: 5,
      minDamage: 0,
      rollMode: "normal",
      roll: { rolls: [], result: 4 },
      wound: "Blunt Force",
      inflicted: "health",
    }),
  ).toStrictEqual(exp);
});
