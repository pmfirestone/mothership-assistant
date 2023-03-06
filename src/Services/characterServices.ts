import { uuidv4 } from "./services";
import { Character } from "../Rules/types";

export function initCharacter(): Character {
    return {
        id: uuidv4(),
        characterClass: "android",
        name: "",
        pronouns: "",
        thumbnailPath: "",
        strength: 0,
        speed: 0,
        intellect: 0,
        combat: 0,
        sanity: 0,
        fear: 0,
        body: 0,
        stress: 2,
        minStress: 2,
        maxWounds: 0,
        wounds: 0,
        maxHealth: 0,
        health: 0,
        credits: 0,
        trinket: "",
        patch: "",
        traumaResponse: "",
        highScore: 0,
        bonusStat: "speed",
        skillInProgress: null,
        skillTrainingYearsRemaining: 0,
        skillTrainingMonthsRemaining: 0,
        skills: [],
        equipment: [],
        armor: [],
        weapons: [],
        items: [],
        conditions: [],
        creationComplete: false,
        woundEffects: [],
        contractors: [],
      };
}
