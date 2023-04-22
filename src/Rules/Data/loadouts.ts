import {
  Armor,
  ArmorType,
  CharacterClass,
  Equipment,
  Loadout,
  Weapon,
} from "Rules/types";

interface DataRef<T> {
  ref: string;
  custom?: Partial<T>;
}

export interface LoadoutRef {
  armors: DataRef<Armor>[];
  weapons: DataRef<Weapon>[];
  equipments: DataRef<Equipment>[];
}

const baseEquipment: Equipment = {
  id: "",
  name: "",
  description: "",
  equipped: true,
  quantity: 1,
  cost: 0,
  baseType: "",
};

function simpleEquipment(name: string, custom: Partial<Equipment>) {
  return {
    ref: "",
    custom: { ...baseEquipment, ...custom, name, baseType: name.toLowerCase() },
  };
}

const fatigues: DataRef<Armor> = {
  ref: "standardCrewAttire",
  custom: {
    armorType: "fatigues",
    name: "Fatigues",
    armorPoints: 2,
    cost: 50,
  },
};

const labCoat: DataRef<Armor> = {
  ref: "standardCrewAttire",
  custom: {
    armorType: "labCoat" as ArmorType,
    name: "Lab Coat",
  },
};

const scrubs: DataRef<Armor> = {
  ref: "standardCrewAttire",
  custom: {
    armorType: "scrubs" as ArmorType,
    name: "Scrubs",
  },
};

const workClothes: DataRef<Armor> = {
  ref: "standardCrewAttire",
  custom: {
    armorType: "workClothes" as ArmorType,
    name: "Heavy Duty Work Clothes",
    armorPoints: 2,
    cost: 50,
  },
};

export const loadoutRefs: Record<CharacterClass, LoadoutRef[]> = {
  marine: [
    {
      armors: [{ ref: "standardCrewAttire" }],
      weapons: [
        {
          ref: "scalpel",
          custom: { weaponType: "Combat Knife", baseType: "knife" },
        },
      ],
      equipments: [{ ref: "stimpak" }],
    },
    {
      armors: [{ ref: "advancedBattleDress" }],
      weapons: [{ ref: "flamethrower" }, { ref: "boardingAxe" }],
      equipments: [],
    },
    {
      armors: [{ ref: "standardBattleDress" }],
      weapons: [{ ref: "combatShotgun" }],
      equipments: [{ ref: "rucksack" }, { ref: "campingGear" }],
    },
    {
      armors: [{ ref: "standardBattleDress" }],
      weapons: [{ ref: "pulseRifle" }],
      equipments: [{ ref: "infraredGoggles" }],
    },
    {
      armors: [{ ref: "standardBattleDress" }],
      weapons: [{ ref: "smartRifle" }],
      equipments: [{ ref: "binoculars" }, { ref: "personalLocator" }],
    },
    {
      armors: [{ ref: "standardBattleDress" }],
      weapons: [{ ref: "smg" }],
      equipments: [{ ref: "mre" }],
    },
    {
      armors: [fatigues],
      weapons: [{ ref: "combatShotgun" }],
      equipments: [
        simpleEquipment("Dog", { cost: 120 }),
        simpleEquipment("Leash", { cost: 10 }),
        simpleEquipment("Tennis ball", { cost: 10 }),
      ],
    },
    {
      armors: [fatigues],
      weapons: [{ ref: "revolver" }, { ref: "fragGrenade" }],
      equipments: [],
    },
    {
      armors: [{ ref: "standardCrewAttire" }],
      weapons: [{ ref: "revolver" }],
      equipments: [simpleEquipment("Challenge Coin", { cost: 10 })],
    },
    { armors: [{ ref: "advancedBattleDress" }], weapons: [], equipments: [] },
  ],
  android: [
    {
      armors: [{ ref: "vaccsuit" }],
      weapons: [{ ref: "smartRifle" }],
      equipments: [{ ref: "infraredGoggles" }, { ref: "mylarBlanket" }],
    },
    {
      armors: [{ ref: "vaccsuit" }],
      weapons: [{ ref: "revolver" }],
      equipments: [{ ref: "longrangecomms" }, { ref: "satchel" }],
    },
    {
      armors: [{ ref: "hazardSuit" }],
      weapons: [{ ref: "revolver" }],
      equipments: [{ ref: "firstAidKit" }],
    },
    {
      armors: [{ ref: "hazardSuit" }],
      weapons: [{ ref: "foamGun" }],
      equipments: [{ ref: "sampleKit" }, { ref: "assortedTools" }],
    },
    {
      armors: [{ ref: "standardBattleDress" }],
      weapons: [{ ref: "tranqPistol" }],
      equipments: [{ ref: "paracord" }],
    },
    {
      armors: [{ ref: "standardCrewAttire" }],
      weapons: [{ ref: "stunBaton" }],
      equipments: [{ ref: "petSynthetic" }],
    },
    {
      armors: [{ ref: "standardCrewAttire" }],
      weapons: [{ ref: "scalpel" }],
      equipments: [{ ref: "bioscanner" }],
    },
    {
      armors: [{ ref: "standardCrewAttire" }],
      weapons: [
        { ref: "fragGrenade" },
        {
          ref: "scalpel",
          custom: { weaponType: "Pen knife", baseType: "penKnife" },
        },
      ],
      equipments: [],
    },
    {
      armors: [
        {
          ref: "standardCrewAttire",
          custom: {
            name: "Manufacturer Supplied Attire",
            armorType: "manufacturerSuppliedAttire" as ArmorType,
          },
        },
      ],
      weapons: [],
      equipments: [
        simpleEquipment("Jump-9 ticket (destination blank)", { cost: 5000 }),
      ],
    },
    {
      armors: [{ ref: "standardCrewAttire" }],
      weapons: [],
      equipments: [simpleEquipment("VIP Corporate key card", { cost: 10000 })],
    },
  ],
  scientist: [
    {
      armors: [{ ref: "hazardSuit" }],
      weapons: [{ ref: "tranqPistol" }],
      equipments: [{ ref: "bioscanner" }, { ref: "sampleKit" }],
    },
    {
      armors: [{ ref: "hazardSuit" }],
      weapons: [{ ref: "flamethrower" }],
      equipments: [{ ref: "painPills" }, { ref: "electronicToolSet" }],
    },
    {
      armors: [{ ref: "vaccsuit" }],
      weapons: [{ ref: "riggingGun" }],
      equipments: [{ ref: "sampleKit" }, { ref: "flashlight" }],
    },
    {
      armors: [{ ref: "vaccsuit" }],
      weapons: [{ ref: "foamGun" }],
      equipments: [{ ref: "foldableStretcher" }, { ref: "firstAidKit" }],
    },
    {
      armors: [labCoat],
      weapons: [],
      equipments: [
        { ref: "medscanner" },
        simpleEquipment("Screwdriver", {}),
        simpleEquipment("Vaccine", {}),
      ],
    },
    {
      armors: [labCoat],
      weapons: [],
      equipments: [
        { ref: "cyberneticDiagnostic" },
        { ref: "portableComputerTerminal" },
      ],
    },
    {
      armors: [scrubs],
      weapons: [{ ref: "scalpel" }],
      equipments: [
        { ref: "automed" },
        { ref: "oxygenTank" },
        { ref: "filterMask" },
      ],
    },
    {
      armors: [scrubs],
      weapons: [],
      equipments: [
        { ref: "vialOfAcid" },
        { ref: "mylarBlanket" },
        { ref: "firstAidKit" },
      ],
    },
    {
      armors: [{ ref: "standardCrewAttire" }],
      weapons: [{ ref: "scalpel" }],
      equipments: [
        { ref: "cyberneticDiagnostic" },
        simpleEquipment("ductTape", {}),
      ],
    },
    {
      armors: [
        {
          ref: "standardCrewAttire",
          custom: {
            name: "Civilian clothes",
            armorType: "civilianClothes" as ArmorType,
          },
        },
      ],
      weapons: [],
      equipments: [
        simpleEquipment("Briefcase", { cost: 50 }),
        simpleEquipment("Prescription pad", {}),
        simpleEquipment("Fountain pen (Poison injector)", { cost: 100 }),
      ],
    },
  ],
  teamster: [
    {
      armors: [{ ref: "vaccsuit" }],
      weapons: [{ ref: "laserCutter" }],
      equipments: [{ ref: "patchKit" }, { ref: "assortedTools" }],
    },
    {
      armors: [{ ref: "vaccsuit" }],
      weapons: [{ ref: "revolver" }, { ref: "crowbar" }],
      equipments: [{ ref: "flashlight" }],
    },
    {
      armors: [{ ref: "vaccsuit" }],
      weapons: [{ ref: "riggingGun" }],
      equipments: [simpleEquipment("Shovel", {}), { ref: "droneSalvage" }],
    },
    {
      armors: [{ ref: "hazardSuit" }],
      weapons: [{ ref: "vibechete" }],
      equipments: [
        simpleEquipment("Spanner", {}),
        simpleEquipment("Campign gear", {}),
        { ref: "waterFiltrationDevice" },
      ],
    },
    {
      armors: [workClothes],
      weapons: [],
      equipments: [
        { ref: "explosivesDetonator" },
        simpleEquipment("Cigarettes", {}),
      ],
    },
    {
      armors: [workClothes],
      weapons: [],
      equipments: [
        simpleEquipment("Drill", { cost: 20 }),
        { ref: "paracord" },
        { ref: "droneRecon" },
      ],
    },
    {
      armors: [{ ref: "standardCrewAttire" }],
      weapons: [{ ref: "combatShotgun" }],
      equipments: [
        { ref: "petOrganic", custom: { name: "Cat", baseType: "cat" } },
        { ref: "extensionCord" },
      ],
    },
    {
      armors: [{ ref: "standardCrewAttire" }],
      weapons: [{ ref: "nailGun" }],
      equipments: [
        simpleEquipment("Head Lamp", {}),
        { ref: "assortedTools" },
        simpleEquipment("Lunch Box", {}),
      ],
    },
    {
      armors: [{ ref: "standardCrewAttire" }],
      weapons: [{ ref: "flareGun" }],
      equipments: [
        { ref: "waterFiltrationDevice" },
        { ref: "personalLocator" },
        { ref: "subsurfaceScanner" },
      ],
    },
    {
      armors: [
        {
          ref: "standardCrewAttire",
          custom: {
            name: "Lounge Wear",
            armorType: "loungeWear" as ArmorType,
          },
        },
      ],
      weapons: [{ ref: "crowbar" }],
      equipments: [
        { ref: "painPills" },
        simpleEquipment("Six pack of beer", {}),
      ],
    },
  ],
};

export const loadouts: Record<CharacterClass, Loadout[]> = {
  marine: [
    {
      armors: [
        {
          armorType: "standardCrewAttire",
          id: "",
          name: "Standard Crew Attire",
          equipped: true,
          armorPoints: 1,
          cost: 20,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "",
          equipped: true,
          cost: 50,
          weaponRange: "adjacent",
          damageString: "1d5 DMG",
          shots: null,
          magazineSize: null,
          critical: "Bleeding [+]",
          special: "",
          weaponType: "Combat Knife",
          magazines: null,
          damage: [{ damageType: "xd5", amount: 1, rollMode: "advantage" }],
          baseType: "knife",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Stimpak",
          description:
            "Cures cryosickness. Restores 1d10 Health and grants Advantage to Strength and Combat for 2d10 minutes. There is a danger of addiction and/or overdose if used frequently. ",
          equipped: true,
          quantity: 1,
          cost: 120,
          baseType: "stimpak",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "advancedBattleDress",
          id: "",
          name: "Advanced Battle Dress",
          equipped: true,
          armorPoints: 10,
          cost: 1500,
          oxygenSupply: 1,
          notes:
            "Includes short-range comms, body cam, headlamp, HUD, exoskeleton weave ([+] on Strength Checks), and radiation shielding. Ignores the first Wound you suffer.",
          armorSpeed: "disadvantage",
        },
      ],
      weapons: [
        {
          id: "",
          name: "Ramhorn",
          equipped: true,
          cost: 2000,
          weaponRange: "close",
          damageString: "1 Wound",
          shots: 4,
          magazineSize: 4,
          critical: "Fire/Explosives [+]",
          special: "If liquid fuel tank is destroyed, 1 Wound to all Close.",
          weaponType: "Flamethrower",
          magazines: 1,
          damage: [
            { damageType: "fixedWounds", amount: 1, rollMode: "normal" },
          ],
          baseType: "flamethrower",
        },
        {
          id: "",
          name: "",
          equipped: true,
          cost: 150,
          weaponRange: "adjacent",
          damageString: "2d10 DMG [+]",
          shots: null,
          magazineSize: null,
          critical: "Gore [+]",
          special: "",
          weaponType: "Boarding Axe",
          magazines: null,
          damage: [{ damageType: "xd10", amount: 2, rollMode: "advantage" }],
          baseType: "boardingAxe",
        },
      ],
      equipments: [],
    },
    {
      armors: [
        {
          armorType: "standardBattleDress",
          id: "",
          name: "Standard Battle Dress",
          equipped: true,
          armorPoints: 7,
          cost: 750,
          oxygenSupply: 0,
          notes: "Includes short-range comms.",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "KANO X9",
          equipped: true,
          cost: 1400,
          weaponRange: "close",
          damageString: "1 Wound",
          shots: 4,
          magazineSize: 4,
          critical: "Gunshot",
          special: "1d10 DMG at Long Range.",
          weaponType: "Combat Shotgun",
          magazines: 1,
          damage: [
            { damageType: "fixedWounds", amount: 1, rollMode: "normal" },
            { damageType: "xd10", amount: 1, rollMode: "normal" },
          ],
          baseType: "combatShotgun",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Rucksack",
          description: "Large, durable, waterproof backpack.",
          equipped: true,
          quantity: 1,
          cost: 50,
          baseType: "rucksack",
        },
        {
          id: "",
          name: "Campign gear",
          description: "",
          equipped: true,
          quantity: 1,
          cost: 100,
          baseType: "campingGear",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardBattleDress",
          id: "",
          name: "Standard Battle Dress",
          equipped: true,
          armorPoints: 7,
          cost: 750,
          oxygenSupply: 0,
          notes: "Includes short-range comms.",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "F20 “Arbiter”",
          equipped: true,
          cost: 2000,
          weaponRange: "long",
          damageString: "3d10 DMG",
          shots: 5,
          magazineSize: 5,
          critical: "Gunshot",
          special: "Pump-action grenade launcher holds x3 frag grenades.",
          weaponType: "Pulse Rifle",
          magazines: 1,
          damage: [{ damageType: "xd10", amount: 3, rollMode: "normal" }],
          baseType: "pulseRifle",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Infrared Goggles",
          description:
            "Allows the wearer to see heat signatures, sometimes up to several hours old. Add night vision for (+1kcr).",
          equipped: true,
          quantity: 1,
          cost: 100,
          baseType: "infraredGoggles",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardBattleDress",
          id: "",
          name: "Standard Battle Dress",
          equipped: true,
          armorPoints: 7,
          cost: 750,
          oxygenSupply: 0,
          notes: "Includes short-range comms.",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "SK 109 Seeker",
          equipped: true,
          cost: 12000,
          weaponRange: "long",
          damageString: "1d10x10 DMG",
          shots: 3,
          magazineSize: 3,
          critical: "Gunshot [+]",
          special:
            "If not braced/prone when firing, Body Save or be knocked down.",
          weaponType: "Smart Rifle",
          magazines: 1,
          damage: [{ damageType: "d10x10", amount: 1, rollMode: "normal" }],
          baseType: "smartRifle",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Binoculars",
          description:
            "20x magnification. Add thermal vision (+300cr) or night vision (+1kcr).",
          equipped: true,
          quantity: 1,
          cost: 300,
          baseType: "binoculars",
        },
        {
          id: "",
          name: "Personal Locator",
          description:
            "Allows crewmembers at a control center (or on the bridge of a ship) to track the location of the wearer.",
          equipped: true,
          quantity: 1,
          cost: 45,
          baseType: "personalLocator",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardBattleDress",
          id: "",
          name: "Standard Battle Dress",
          equipped: true,
          armorPoints: 7,
          cost: 750,
          oxygenSupply: 0,
          notes: "Includes short-range comms.",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "ARMA 29",
          equipped: true,
          cost: 1200,
          weaponRange: "long",
          damageString: "2d10 DMG",
          shots: 4,
          magazineSize: 4,
          critical: "Gunshot",
          special: "Can be held one-handed.",
          weaponType: "SMG",
          magazines: 3,
          damage: [{ damageType: "xd10", amount: 2, rollMode: "normal" }],
          baseType: "smg",
        },
      ],
      equipments: [
        {
          id: "",
          name: "MRE",
          description:
            "“Meals, Ready-to-Eat.” Self-contained, individual field rations in lightweight packaging. Each one has sufficient sustenance for a single person for one day (does not include water).",
          equipped: true,
          quantity: 7,
          cost: 70,
          baseType: "mre",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "fatigues",
          id: "",
          name: "Fatigues",
          equipped: true,
          armorPoints: 2,
          cost: 50,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "KANO X9",
          equipped: true,
          cost: 1400,
          weaponRange: "close",
          damageString: "1 Wound",
          shots: 2,
          magazineSize: 4,
          critical: "Gunshot",
          special: "1d10 DMG at Long Range.",
          weaponType: "Combat Shotgun",
          magazines: 0,
          damage: [
            { damageType: "fixedWounds", amount: 1, rollMode: "normal" },
            { damageType: "xd10", amount: 1, rollMode: "normal" },
          ],
          baseType: "combatShotgun",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Dog",
          description: "",
          equipped: true,
          quantity: 1,
          cost: 120,
          baseType: "dog",
        },
        {
          id: "",
          name: "Leash",
          description: "",
          equipped: true,
          quantity: 1,
          cost: 10,
          baseType: "leash",
        },
        {
          id: "",
          name: "Tennis ball",
          description: "",
          equipped: true,
          quantity: 1,
          cost: 10,
          baseType: "tennisBall",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "fatigues",
          id: "",
          name: "Fatigues",
          equipped: true,
          armorPoints: 2,
          cost: 50,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "FN Slug",
          equipped: true,
          cost: 750,
          weaponRange: "close",
          damageString: "1d10 DMG [+]",
          shots: 6,
          magazineSize: 6,
          critical: "Gunshot",
          special: "",
          weaponType: "Revolver",
          magazines: 1,
          damage: [{ damageType: "xd10", amount: 1, rollMode: "advantage" }],
          baseType: "revolver",
        },
        {
          id: "",
          name: "",
          equipped: true,
          cost: 70,
          weaponRange: "long",
          damageString: "1d5-1 Wounds",
          shots: 1,
          magazineSize: 1,
          critical: "Fire/Explosives",
          special: "All Close must Body Save to avoid.",
          weaponType: "Frag Grenade",
          magazines: 1,
          damage: [
            { damageType: "d5MinusOneWounds", amount: 1, rollMode: "normal" },
          ],
          baseType: "fragGrenade",
        },
      ],
      equipments: [],
    },
    {
      armors: [
        {
          armorType: "standardCrewAttire",
          id: "",
          name: "Dress Uniform",
          equipped: true,
          armorPoints: 1,
          cost: 70,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "FN Slug",
          equipped: true,
          cost: 750,
          weaponRange: "close",
          damageString: "1d10 DMG [+]",
          shots: 1,
          magazineSize: 6,
          critical: "Gunshot",
          special: "",
          weaponType: "Revolver",
          magazines: 0,
          damage: [{ damageType: "xd10", amount: 1, rollMode: "advantage" }],
          baseType: "revolver",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Challenge Coin",
          description: "",
          equipped: true,
          quantity: 1,
          cost: 10,
          baseType: "challengeCoin",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "advancedBattleDress",
          id: "",
          name: "Advanced Battle Dress",
          equipped: true,
          armorPoints: 10,
          cost: 1500,
          oxygenSupply: 1,
          notes:
            "Includes short-range comms, body cam, headlamp, HUD, exoskeleton weave ([+] on Strength Checks), and radiation shielding. Ignores the first Wound you suffer.",
          armorSpeed: "disadvantage",
        },
      ],
      weapons: [
        {
          id: "",
          name: "Overmatch Arms SW-512",
          equipped: true,
          cost: 1800,
          weaponRange: "long",
          damageString: "4d10[+] DMG",
          shots: 5,
          magazineSize: 5,
          critical: "Gunshot [+]",
          special:
            "Two-handed. Heavy. Barrel can be maneuvered to fire around corners.",
          weaponType: "Heavy Machine Gun",
          magazines: 1,
          damage: [{ damageType: "xd10", amount: 4, rollMode: "advantage" }],
          baseType: "heavyMachineGun",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Heads-Up Display (HUD)",
          description:
            "Often worn by marines, the HUD allows the wearer to see through the body cams of others in their unit, and can connect to any smart-link upgaded weapon.",
          equipped: true,
          quantity: 1,
          cost: 75,
          baseType: "headsUpDisplayHUD",
        },
      ],
    },
  ],
  android: [
    {
      armors: [
        {
          armorType: "vaccsuit",
          id: "",
          name: "Vaccsuit",
          equipped: true,
          armorPoints: 3,
          cost: 1000,
          oxygenSupply: 12,
          notes:
            "Includes short-range comms, headlamp, and radiation shielding. Decompression within 1d5 rounds if punctured.",
          armorSpeed: "disadvantage",
        },
      ],
      weapons: [
        {
          id: "",
          name: "SK 109 Seeker",
          equipped: true,
          cost: 12000,
          weaponRange: "long",
          damageString: "1d10x10 DMG",
          shots: 3,
          magazineSize: 3,
          critical: "Gunshot [+]",
          special:
            "If not braced/prone when firing, Body Save or be knocked down.",
          weaponType: "Smart Rifle",
          magazines: 1,
          damage: [{ damageType: "d10x10", amount: 1, rollMode: "normal" }],
          baseType: "smartRifle",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Infrared Goggles",
          description:
            "Allows the wearer to see heat signatures, sometimes up to several hours old. Add night vision for (+1kcr).",
          equipped: true,
          quantity: 1,
          cost: 100,
          baseType: "infraredGoggles",
        },
        {
          id: "",
          name: "Mylar Blanket",
          description:
            "Lightweight blanket made of heat-reflective material. Often used for thermal control of patients suffering from extreme cold or other trauma.",
          equipped: true,
          quantity: 1,
          cost: 10,
          baseType: "mylarBlanket",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "vaccsuit",
          id: "",
          name: "Vaccsuit",
          equipped: true,
          armorPoints: 3,
          cost: 1000,
          oxygenSupply: 12,
          notes:
            "Includes short-range comms, headlamp, and radiation shielding. Decompression within 1d5 rounds if punctured.",
          armorSpeed: "disadvantage",
        },
      ],
      weapons: [
        {
          id: "",
          name: "FN Slug",
          equipped: true,
          cost: 750,
          weaponRange: "close",
          damageString: "1d10 DMG [+]",
          shots: 6,
          magazineSize: 6,
          critical: "Gunshot",
          special: "",
          weaponType: "Revolver",
          magazines: 1,
          damage: [{ damageType: "xd10", amount: 1, rollMode: "advantage" }],
          baseType: "revolver",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Long-range comms",
          description:
            "Rucksack-sized communication device for use in surface-to-ship comunication.",
          equipped: true,
          quantity: 1,
          cost: 65,
          baseType: "longrangecomms",
        },
        {
          id: "",
          name: "Satchel",
          description: "",
          equipped: true,
          quantity: 1,
          cost: 10,
          baseType: "satchel",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "hazardSuit",
          id: "",
          name: "Hazard Suit",
          equipped: true,
          armorPoints: 5,
          cost: 750,
          oxygenSupply: 1,
          notes:
            "Includes air filter, extreme heat/cold protection, hydration reclamation (1L of water lasts 4 days), short-range comms, headlamp, and radiation shielding.",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "FN Slug",
          equipped: true,
          cost: 750,
          weaponRange: "close",
          damageString: "1d10 DMG [+]",
          shots: 6,
          magazineSize: 6,
          critical: "Gunshot",
          special: "",
          weaponType: "Revolver",
          magazines: 0,
          damage: [{ damageType: "xd10", amount: 1, rollMode: "advantage" }],
          baseType: "revolver",
        },
      ],
      equipments: [
        {
          id: "",
          name: "First Aid Kit",
          description:
            "An assortment of bandages and treatments to help stop bleeding, bandage cuts, and treat other minor injuries.",
          equipped: true,
          quantity: 1,
          cost: 75,
          baseType: "firstAidKit",
        },
        {
          id: "",
          name: "Flashlight",
          description:
            "Handheld or shoulder mounted. Illuminates 10m ahead of the user.",
          equipped: true,
          quantity: 1,
          cost: 10,
          baseType: "flashlight",
        },
        {
          id: "",
          name: "Defibrillator",
          description: "",
          equipped: true,
          quantity: 1,
          cost: 10,
          baseType: "defibrillator",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "hazardSuit",
          id: "",
          name: "Hazard Suit",
          equipped: true,
          armorPoints: 5,
          cost: 750,
          oxygenSupply: 1,
          notes:
            "Includes air filter, extreme heat/cold protection, hydration reclamation (1L of water lasts 4 days), short-range comms, headlamp, and radiation shielding.",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "Halls B Series",
          equipped: true,
          cost: 275,
          weaponRange: "close",
          damageString: "1 DMG",
          shots: 2,
          magazineSize: 3,
          critical: "Blunt Force",
          special:
            "Body Save or become stuck. Strength [-] Check to escape. Quick-hardening foam covers 1sqm.",
          weaponType: "Foam Gun",
          magazines: 0,
          damage: [
            { damageType: "fixedDamage", amount: 1, rollMode: "normal" },
          ],
          baseType: "foamGun",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Sample Collection Kit",
          description:
            "Used to research xenoflora and xenofauna in the field. Can take vital signs, DNA samples ,and collect other data on foreign material. Results may not be instaneous and may require a lab for complete analysis.",
          equipped: true,
          quantity: 1,
          cost: 250,
          baseType: "sampleKit",
        },
        {
          id: "",
          name: "Screwdriver",
          description:
            "Wrenches, spanners, screwdrivers, etc. Can be used as weapons (doing the same Damage as a Crowbar).",
          equipped: true,
          quantity: 0,
          cost: 20,
          baseType: "assortedTools",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardBattleDress",
          id: "",
          name: "Standard Battle Dress",
          equipped: true,
          armorPoints: 7,
          cost: 750,
          oxygenSupply: 0,
          notes: "Includes short-range comms.",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "D&C 7",
          equipped: true,
          cost: 850,
          weaponRange: "close",
          damageString: "1 DMG",
          shots: 3,
          magazineSize: 6,
          critical: "Blunt Force",
          special:
            "If DMG dealt: target must Body Save or be unconscious 1d10 rounds.",
          weaponType: "Tranq Pistol",
          magazines: 0,
          damage: [
            { damageType: "fixedDamage", amount: 1, rollMode: "normal" },
          ],
          baseType: "tranqPistol",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Paracord (100m)",
          description: "General purpose lightweight nylon rope.",
          equipped: true,
          quantity: 1,
          cost: 20,
          baseType: "paracord",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardCrewAttire",
          id: "",
          name: "Standard Crew Attire",
          equipped: true,
          armorPoints: 1,
          cost: 20,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "",
          equipped: true,
          cost: 115,
          weaponRange: "adjacent",
          damageString: "1d5 DMG",
          shots: null,
          magazineSize: null,
          critical: "Blunt Force",
          special: "Body Save or stunned 1 round.",
          weaponType: "Stun Baton",
          magazines: null,
          damage: [{ damageType: "xd5", amount: 1, rollMode: "normal" }],
          baseType: "stunBaton",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Pet (Synthetic)",
          description:
            "Small to medium-sized synthetic pet animal. Larger or rare pets cost 2d10x.",
          equipped: true,
          quantity: 1,
          cost: 15000,
          baseType: "petSynthetic",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardCrewAttire",
          id: "",
          name: "Standard Crew Attire",
          equipped: true,
          armorPoints: 1,
          cost: 20,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "",
          equipped: true,
          cost: 50,
          weaponRange: "adjacent",
          damageString: "1d5 DMG",
          shots: null,
          magazineSize: null,
          critical: "Bleeding [+]",
          special: "",
          weaponType: "Scalpel",
          magazines: null,
          damage: [{ damageType: "xd5", amount: 1, rollMode: "normal" }],
          baseType: "scalpel",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Bioscanner",
          description:
            "Allows the user to scan the immediate area for signs of life. Generally can scan for 100m in all directions, without being blocked by most known metals. Can tell the location of signs of life, but not what that life is.",
          equipped: true,
          quantity: 1,
          cost: 150,
          baseType: "bioscanner",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardCrewAttire",
          id: "",
          name: "Standard Crew Attire",
          equipped: true,
          armorPoints: 1,
          cost: 20,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "",
          equipped: true,
          cost: 70,
          weaponRange: "long",
          damageString: "1d5-1 Wounds",
          shots: 1,
          magazineSize: 1,
          critical: "Fire/Explosives",
          special: "All Close must Body Save to avoid.",
          weaponType: "Frag Grenade",
          magazines: 1,
          damage: [
            { damageType: "d5MinusOneWounds", amount: 1, rollMode: "normal" },
          ],
          baseType: "fragGrenade",
        },
        {
          id: "",
          name: "",
          equipped: true,
          cost: 50,
          weaponRange: "adjacent",
          damageString: "1d5 DMG",
          shots: null,
          magazineSize: null,
          critical: "Bleeding [+]",
          special: "",
          weaponType: "Pen knife",
          magazines: null,
          damage: [{ damageType: "xd5", amount: 1, rollMode: "normal" }],
          baseType: "scalpel",
        },
      ],
      equipments: [],
    },
    {
      armors: [
        {
          armorType: "standardCrewAttire",
          id: "",
          name: "Manufacturer Supplied Attire",
          equipped: true,
          armorPoints: 1,
          cost: 20,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [],
      equipments: [
        {
          id: "",
          name: "Jump-9 ticket (destination blank)",
          description: "Jump-9 ticket (destination blank)",
          equipped: true,
          quantity: 1,
          cost: 5000,
          baseType: "jump9ticket",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardCrewAttire",
          id: "",
          name: "Corporate Attire",
          equipped: true,
          armorPoints: 1,
          cost: 20,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [],
      equipments: [
        {
          id: "",
          name: "VIP Corporate key card",
          description: "Jump-9 ticket (destination blank)",
          equipped: true,
          quantity: 1,
          cost: 10000,
          baseType: "corporateKeyCard",
        },
      ],
    },
  ],
  scientist: [
    {
      armors: [
        {
          armorType: "hazardSuit",
          id: "",
          name: "Hazard Suit",
          equipped: true,
          armorPoints: 5,
          cost: 750,
          oxygenSupply: 1,
          notes:
            "Includes air filter, extreme heat/cold protection, hydration reclamation (1L of water lasts 4 days), short-range comms, headlamp, and radiation shielding.",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "D&C 7",
          equipped: true,
          cost: 850,
          weaponRange: "close",
          damageString: "1 DMG",
          shots: 3,
          magazineSize: 6,
          critical: "Blunt Force",
          special:
            "If DMG dealt: target must Body Save or be unconscious 1d10 rounds.",
          weaponType: "Tranq Pistol",
          magazines: 0,
          damage: [
            { damageType: "fixedDamage", amount: 1, rollMode: "normal" },
          ],
          baseType: "tranqPistol",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Bioscanner",
          description:
            "Allows the user to scan the immediate area for signs of life. Generally can scan for 100m in all directions, without being blocked by most known metals. Can tell the location of signs of life, but not what that life is.",
          equipped: true,
          quantity: 1,
          cost: 150,
          baseType: "bioscanner",
        },
        {
          id: "",
          name: "Sample Collection Kit",
          description:
            "Used to research xenoflora and xenofauna in the field. Can take vital signs, DNA samples ,and collect other data on foreign material. Results may not be instaneous and may require a lab for complete analysis.",
          equipped: true,
          quantity: 1,
          cost: 250,
          baseType: "sampleKit",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "hazardSuit",
          id: "",
          name: "Hazard Suit",
          equipped: true,
          armorPoints: 5,
          cost: 750,
          oxygenSupply: 1,
          notes:
            "Includes air filter, extreme heat/cold protection, hydration reclamation (1L of water lasts 4 days), short-range comms, headlamp, and radiation shielding.",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "Ramhorn",
          equipped: true,
          cost: 2000,
          weaponRange: "close",
          damageString: "1 Wound",
          shots: 1,
          magazineSize: 4,
          critical: "Fire/Explosives [+]",
          special: "If liquid fuel tank is destroyed, 1 Wound to all Close.",
          weaponType: "Flamethrower",
          magazines: 1,
          damage: [
            { damageType: "fixedWounds", amount: 1, rollMode: "normal" },
          ],
          baseType: "flamethrower",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Pain Pills",
          description:
            "When ingested, immediately restores 1d10 health and lowers Stress by 1. There is a danger of addiction and/or overdose if used frequently.",
          equipped: true,
          quantity: 5,
          cost: 450,
          baseType: "painPills",
        },
        {
          id: "",
          name: "Electronic Tool Set",
          description:
            "A full set of tools for doing detailed repair or construction work on electronics.",
          equipped: true,
          quantity: 1,
          cost: 650,
          baseType: "electronicToolSet",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "vaccsuit",
          id: "",
          name: "Vaccsuit",
          equipped: true,
          armorPoints: 3,
          cost: 1000,
          oxygenSupply: 12,
          notes:
            "Includes short-range comms, headlamp, and radiation shielding. Decompression within 1d5 rounds if punctured.",
          armorSpeed: "disadvantage",
        },
      ],
      weapons: [
        {
          id: "",
          name: "HAN-290",
          equipped: true,
          cost: 350,
          weaponRange: "close",
          damageString: "1d10 DMG + 2d10 DMG when removed.",
          shots: 1,
          magazineSize: 1,
          critical: "Bleeding [+]",
          special: "100m micro-filament. Body Save or become entangled.",
          weaponType: "Rigging Gun",
          magazines: 0,
          damage: [
            { damageType: "xd10", amount: 1, rollMode: "normal" },
            { damageType: "xd10", amount: 2, rollMode: "normal" },
          ],
          baseType: "riggingGun",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Sample Collection Kit",
          description:
            "Used to research xenoflora and xenofauna in the field. Can take vital signs, DNA samples ,and collect other data on foreign material. Results may not be instaneous and may require a lab for complete analysis.",
          equipped: true,
          quantity: 1,
          cost: 250,
          baseType: "sampleKit",
        },
        {
          id: "",
          name: "Flashlight",
          description:
            "Handheld or shoulder mounted. Illuminates 10m ahead of the user.",
          equipped: true,
          quantity: 1,
          cost: 10,
          baseType: "flashlight",
        },
        {
          id: "",
          name: "Lab rat (small pet)",
          description:
            "Small to medium-sized organic pet animal. Larger or rare pets cost 2d10x.",
          equipped: true,
          quantity: 1,
          cost: 200000,
          baseType: "petOrganic",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "vaccsuit",
          id: "",
          name: "Vaccsuit",
          equipped: true,
          armorPoints: 3,
          cost: 1000,
          oxygenSupply: 12,
          notes:
            "Includes short-range comms, headlamp, and radiation shielding. Decompression within 1d5 rounds if punctured.",
          armorSpeed: "disadvantage",
        },
      ],
      weapons: [
        {
          id: "",
          name: "Halls B Series",
          equipped: true,
          cost: 275,
          weaponRange: "close",
          damageString: "1 DMG",
          shots: 3,
          magazineSize: 3,
          critical: "Blunt Force",
          special:
            "Body Save or become stuck. Strength [-] Check to escape. Quick-hardening foam covers 1sqm.",
          weaponType: "Foam Gun",
          magazines: 1,
          damage: [
            { damageType: "fixedDamage", amount: 1, rollMode: "normal" },
          ],
          baseType: "foamGun",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Foldable Stretcher",
          description:
            "Portable stretcher that can fit within a rucksack. Allows the user to safely strap down the patient and carry them to a location where their wounds can be better treated. Unfolds to roughly 2m.",
          equipped: true,
          quantity: 1,
          cost: 100,
          baseType: "foldableStretcher",
        },
        {
          id: "",
          name: "First Aid Kit",
          description:
            "An assortment of bandages and treatments to help stop bleeding, bandage cuts, and treat other minor injuries.",
          equipped: true,
          quantity: 1,
          cost: 75,
          baseType: "firstAidKit",
        },
        {
          id: "",
          name: "Radiation Pills",
          description:
            "Reduces Radiation Damage (see pg. xx.x) by 2d10 for 2d10 minutes.",
          equipped: true,
          quantity: 5,
          cost: 200,
          baseType: "radiationPills",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardCrewAttire",
          id: "",
          name: "Lab Coat",
          equipped: true,
          armorPoints: 1,
          cost: 20,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [],
      equipments: [
        {
          id: "",
          name: "Screwdriver",
          description:
            "Wrenches, spanners, screwdrivers, etc. Can be used as weapons (doing the same Damage as a Crowbar).",
          equipped: true,
          quantity: 0,
          cost: 20,
          baseType: "assortedTools",
        },
        {
          id: "",
          name: "Medscanner",
          description:
            "Allows the user to scan a living or dead body to analyze it for disease or abnormalities, without having to do a biopsy (or autopsy). Results are often non-instantaneous and may require a lab for analysis.",
          equipped: true,
          quantity: 1,
          cost: 150,
          baseType: "medscanner",
        },
        {
          id: "",
          name: "Vaccine",
          description: "",
          equipped: true,
          quantity: 1,
          cost: 150,
          baseType: "vaccine",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardCrewAttire",
          id: "",
          name: "Lab Coat",
          equipped: true,
          armorPoints: 1,
          cost: 20,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [],
      equipments: [
        {
          id: "",
          name: "Cybernetic Diagnostic Scanner",
          description:
            "Allows the user to scan androids and other cybernetic organisms in order to diagnose any physical or mental issues they may be having. Often distrusted by androids.",
          equipped: true,
          quantity: 1,
          cost: 500,
          baseType: "cyberneticDiagnostic",
        },
        {
          id: "",
          name: "Portable Computer Terminal",
          description:
            "Flat computer monitor, keyboard and interface which allows the user to hack into pre-existing computers and networks, as well as perform standard computer tasks.",
          equipped: true,
          quantity: 1,
          cost: 1500,
          baseType: "portableComputerTerminal",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardCrewAttire",
          id: "",
          name: "Scrubs",
          equipped: true,
          armorPoints: 1,
          cost: 20,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "Scalpel",
          equipped: true,
          cost: 50,
          weaponRange: "adjacent",
          damageString: "1d5 DMG",
          shots: null,
          magazineSize: null,
          critical: "Bleeding [+]",
          special: "",
          weaponType: "Scalpel",
          magazines: null,
          damage: [{ damageType: "xd5", amount: 1, rollMode: "normal" }],
          baseType: "scalpel",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Automed",
          description:
            "Nanotech pills that assist your body in repairing Damage by granting Advantage to Body Saves meant to repel disease and poison, as well as attempts to heal from rest.",
          equipped: true,
          quantity: 6,
          cost: 1500,
          baseType: "automed",
        },
        {
          id: "",
          name: "Oxygen Tank",
          description:
            "When attached to a vaccsuit provides up to 12 hours of oxygen under normal circumstances, 4 hours under stressful circumstances. Explosive.",
          equipped: true,
          quantity: 1,
          cost: 50,
          baseType: "oxygenTank",
        },
        {
          id: "",
          name: "Filter mask",
          description: "",
          equipped: true,
          quantity: 1,
          cost: 50,
          baseType: "filterMask",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardCrewAttire",
          id: "",
          name: "Scrubs",
          equipped: true,
          armorPoints: 1,
          cost: 20,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [],
      equipments: [
        {
          id: "",
          name: "Vial of acid",
          description: "",
          equipped: true,
          quantity: 1,
          cost: 50,
          baseType: "vialOfAcid",
        },
        {
          id: "",
          name: "Mylar Blanket",
          description:
            "Lightweight blanket made of heat-reflective material. Often used for thermal control of patients suffering from extreme cold or other trauma.",
          equipped: true,
          quantity: 1,
          cost: 10,
          baseType: "mylarBlanket",
        },
        {
          id: "",
          name: "First Aid Kit",
          description:
            "An assortment of bandages and treatments to help stop bleeding, bandage cuts, and treat other minor injuries.",
          equipped: true,
          quantity: 1,
          cost: 75,
          baseType: "firstAidKit",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardCrewAttire",
          id: "",
          name: "Standard Crew Attire",
          equipped: true,
          armorPoints: 1,
          cost: 20,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "Utility knife",
          equipped: true,
          cost: 50,
          weaponRange: "adjacent",
          damageString: "1d5 DMG",
          shots: null,
          magazineSize: null,
          critical: "Bleeding [+]",
          special: "",
          weaponType: "Scalpel",
          magazines: null,
          damage: [{ damageType: "xd5", amount: 1, rollMode: "normal" }],
          baseType: "scalpel",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Cybernetic Diagnostic Scanner",
          description:
            "Allows the user to scan androids and other cybernetic organisms in order to diagnose any physical or mental issues they may be having. Often distrusted by androids.",
          equipped: true,
          quantity: 1,
          cost: 500,
          baseType: "cyberneticDiagnostic",
        },
        {
          id: "",
          name: "Duct Tape",
          description: "",
          equipped: true,
          quantity: 1,
          cost: 5,
          baseType: "ductTape",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardCrewAttire",
          id: "",
          name: "Civilian clothes",
          equipped: true,
          armorPoints: 1,
          cost: 20,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [],
      equipments: [
        {
          id: "",
          name: "Briefcase",
          description: "",
          equipped: true,
          quantity: 1,
          cost: 50,
          baseType: "briefcase",
        },
        {
          id: "",
          name: "Prescription pad",
          description: "",
          equipped: true,
          quantity: 1,
          cost: 5,
          baseType: "prescriptionPad",
        },
        {
          id: "",
          name: "Fountain pen (Poison injector)",
          description: "",
          equipped: true,
          quantity: 1,
          cost: 100,
          baseType: "penPoison",
        },
      ],
    },
  ],
  teamster: [
    {
      armors: [
        {
          armorType: "vaccsuit",
          id: "",
          name: "Vaccsuit",
          equipped: true,
          armorPoints: 3,
          cost: 1000,
          oxygenSupply: 12,
          notes:
            "Includes short-range comms, headlamp, and radiation shielding. Decompression within 1d5 rounds if punctured.",
          armorSpeed: "disadvantage",
        },
      ],
      weapons: [
        {
          id: "",
          name: "MNC Mode",
          equipped: true,
          cost: 1200,
          weaponRange: "long",
          damageString: "1d100 DMG",
          shots: 6,
          magazineSize: 6,
          critical: "Bleeding [+] or Gore [+]",
          special:
            "Two-handed. Heavy. Must recharge between shots. Reload: 1hr (power), 6hr (solar).",
          weaponType: "Laser Cutter",
          magazines: 0,
          damage: [{ damageType: "d100", amount: 1, rollMode: "normal" }],
          baseType: "laserCutter",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Patch Kit",
          description:
            "Repairs punctured and torn vaccsuits, restoring their space readiness. Patched vaccsuits have an AP of 1.",
          equipped: true,
          quantity: 3,
          cost: 200,
          baseType: "patchKit",
        },
        {
          id: "",
          name: "Toolbelt with assorted tools",
          description:
            "Wrenches, spanners, screwdrivers, etc. Can be used as weapons (doing the same Damage as a Crowbar).",
          equipped: true,
          quantity: 0,
          cost: 20,
          baseType: "assortedTools",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "vaccsuit",
          id: "",
          name: "Vaccsuit",
          equipped: true,
          armorPoints: 3,
          cost: 1000,
          oxygenSupply: 12,
          notes:
            "Includes short-range comms, headlamp, and radiation shielding. Decompression within 1d5 rounds if punctured.",
          armorSpeed: "disadvantage",
        },
      ],
      weapons: [
        {
          id: "",
          name: "FN Slug",
          equipped: true,
          cost: 750,
          weaponRange: "close",
          damageString: "1d10 DMG [+]",
          shots: 6,
          magazineSize: 6,
          critical: "Gunshot",
          special: "",
          weaponType: "Revolver",
          magazines: 0,
          damage: [{ damageType: "xd10", amount: 1, rollMode: "advantage" }],
          baseType: "revolver",
        },
        {
          id: "",
          name: "",
          equipped: true,
          cost: 50,
          weaponRange: "adjacent",
          damageString: "1d5 DMG",
          shots: null,
          magazineSize: null,
          critical: "Blunt Force [+]",
          special: "",
          weaponType: "Crowbar",
          magazines: null,
          damage: [{ damageType: "xd5", amount: 1, rollMode: "normal" }],
          baseType: "crowbar",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Flashlight",
          description:
            "Handheld or shoulder mounted. Illuminates 10m ahead of the user.",
          equipped: true,
          quantity: 1,
          cost: 10,
          baseType: "flashlight",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "vaccsuit",
          id: "",
          name: "Vaccsuit",
          equipped: true,
          armorPoints: 3,
          cost: 1000,
          oxygenSupply: 12,
          notes:
            "Includes short-range comms, headlamp, and radiation shielding. Decompression within 1d5 rounds if punctured.",
          armorSpeed: "disadvantage",
        },
      ],
      weapons: [
        {
          id: "",
          name: "HAN-290",
          equipped: true,
          cost: 350,
          weaponRange: "close",
          damageString: "1d10 DMG + 2d10 DMG when removed.",
          shots: 1,
          magazineSize: 1,
          critical: "Bleeding [+]",
          special: "100m micro-filament. Body Save or become entangled.",
          weaponType: "Rigging Gun",
          magazines: 0,
          damage: [
            { damageType: "xd10", amount: 1, rollMode: "normal" },
            { damageType: "xd10", amount: 2, rollMode: "normal" },
          ],
          baseType: "riggingGun",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Shovel",
          description: "",
          equipped: true,
          quantity: 1,
          cost: 10,
          baseType: "shovel",
        },
        {
          id: "",
          name: "Drone (Salvage)",
          description:
            "Remote controlled drone. Requires two hands to operate receiver. Can fly up to 10m high, to anywhere Long Range from the operator. Battery operated. Can run for 2 hours. Can record and transmit footage to receiver. Can be equipped with a laser cutter if purchased separately. Can carry up to 225kg.",
          equipped: true,
          quantity: 1,
          cost: 10000,
          baseType: "droneSalvage",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "hazardSuit",
          id: "",
          name: "Hazard Suit",
          equipped: true,
          armorPoints: 5,
          cost: 750,
          oxygenSupply: 1,
          notes:
            "Includes air filter, extreme heat/cold protection, hydration reclamation (1L of water lasts 4 days), short-range comms, headlamp, and radiation shielding.",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "",
          equipped: true,
          cost: 500,
          weaponRange: "adjacent",
          damageString: "3d10 DMG",
          shots: null,
          magazineSize: null,
          critical: "Bleeding + Gore",
          special:
            "When dealing a Wound, roll on BOTH the Bleeding AND Gore columns.",
          weaponType: "Vibechete",
          magazines: null,
          damage: [{ damageType: "xd10", amount: 3, rollMode: "normal" }],
          baseType: "vibechete",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Spanner",
          description: "",
          equipped: true,
          quantity: 1,
          cost: 10,
          baseType: "spanner",
        },
        {
          id: "",
          name: "Campign gear",
          description: "",
          equipped: true,
          quantity: 1,
          cost: 100,
          baseType: "campingGear",
        },
        {
          id: "",
          name: "Water Filtration Device",
          description:
            "Can pump 50 liters of filtered water per hour from even the most brackish swamps.",
          equipped: true,
          quantity: 1,
          cost: 15,
          baseType: "waterFiltrationDevice",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardCrewAttire",
          id: "",
          name: "Heavy Duty Work Clothes",
          equipped: true,
          armorPoints: 2,
          cost: 20,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [],
      equipments: [
        {
          id: "",
          name: "Explosives & Detonator",
          description:
            "Explosive charge powerful enough to blow open an airlock. All Close organisms must make a Body Save or take a Wound (Explosive). Detonator works at Long Range, but can be blocked by a radio jammer.",
          equipped: true,
          quantity: 1,
          cost: 500,
          baseType: "explosivesDetonator",
        },
        {
          id: "",
          name: "Cigarettes",
          description: "",
          equipped: true,
          quantity: 10,
          cost: 1000,
          baseType: "cigarettes",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardCrewAttire",
          id: "",
          name: "Heavy Duty Work Clothes",
          equipped: true,
          armorPoints: 2,
          cost: 20,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [],
      equipments: [
        {
          id: "",
          name: "Drill",
          description:
            "Wrenches, spanners, screwdrivers, etc. Can be used as weapons (doing the same Damage as a Crowbar).",
          equipped: true,
          quantity: 0,
          cost: 20,
          baseType: "assortedTools",
        },
        {
          id: "",
          name: "Paracord (100m)",
          description: "General purpose lightweight nylon rope.",
          equipped: true,
          quantity: 1,
          cost: 10,
          baseType: "paracord",
        },
        {
          id: "",
          name: "Drone (Recon)",
          description:
            "Remote controlled drone. Requires two hands to operate receiver. Can fly up to 450m high, to a distance of 3km from operator. Battery operated. Can run for 2 hours. Can record and transmit footage to receiver. If purchased separately, can be equipped with up to two of the following (at their regular cost): binoculars, radio jammer, Geiger counter, medscanner, personal locator, infrared goggles, emergency beacon, cybernetic diagnostic scanner, bioscanner.",
          equipped: true,
          quantity: 1,
          cost: 5000,
          baseType: "droneRecon",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardCrewAttire",
          id: "",
          name: "Standard Crew Attire",
          equipped: true,
          armorPoints: 1,
          cost: 20,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "KANO X9",
          equipped: true,
          cost: 1400,
          weaponRange: "close",
          damageString: "1 Wound",
          shots: 4,
          magazineSize: 4,
          critical: "Gunshot",
          special: "1d10 DMG at Long Range.",
          weaponType: "Combat Shotgun",
          magazines: 0,
          damage: [
            { damageType: "fixedWounds", amount: 1, rollMode: "normal" },
            { damageType: "xd10", amount: 1, rollMode: "normal" },
          ],
          baseType: "combatShotgun",
        },
      ],
      equipments: [
        {
          name: "Cat",
          id: "",
          description: "",
          equipped: true,
          cost: 0,
          quantity: 1,
          baseType: "extensionCord",
        },
        {
          name: "Extension Cord (20m)",
          id: "",
          description: "",
          equipped: true,
          cost: 0,
          quantity: 1,
          baseType: "extensionCord",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardCrewAttire",
          id: "",
          name: "Standard Crew Attire",
          equipped: true,
          armorPoints: 1,
          cost: 20,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "",
          equipped: true,
          cost: 150,
          weaponRange: "close",
          damageString: "1d5 DMG",
          shots: 32,
          magazineSize: 32,
          critical: "Bleeding",
          special: "",
          weaponType: "Nail Gun",
          magazines: null,
          damage: [{ damageType: "xd5", amount: 1, rollMode: "normal" }],
          baseType: "nailGun",
        },
      ],
      equipments: [
        {
          name: "Head Lamp",
          id: "",
          description: "",
          equipped: true,
          cost: 0,
          quantity: 1,
          baseType: "headLamp",
        },
        {
          id: "",
          name: "Toolbelt with assorted tools",
          description:
            "Wrenches, spanners, screwdrivers, etc. Can be used as weapons (doing the same Damage as a Crowbar).",
          equipped: true,
          quantity: 0,
          cost: 20,
          baseType: "assortedTools",
        },
        {
          name: "Lunch Box",
          id: "",
          description: "",
          equipped: true,
          cost: 0,
          quantity: 1,
          baseType: "lunchBox",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardCrewAttire",
          id: "",
          name: "Standard Crew Attire",
          equipped: true,
          armorPoints: 1,
          cost: 20,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "Peabody",
          equipped: true,
          cost: 85,
          weaponRange: "long",
          damageString: "1d5 DMG",
          shots: 2,
          magazineSize: 2,
          critical: "Fire/Explosives [-]",
          special:
            "High intensity flare visible day and night from Long Range.",
          weaponType: "Flare Gun",
          magazines: 0,
          damage: [{ damageType: "xd5", amount: 1, rollMode: "normal" }],
          baseType: "flareGun",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Water Filtration Device",
          description:
            "Can pump 50 liters of filtered water per hour from even the most brackish swamps.",
          equipped: true,
          quantity: 1,
          cost: 15,
          baseType: "waterFiltrationDevice",
        },
        {
          id: "",
          name: "Personal Locator",
          description:
            "Allows crewmembers at a control center (or on the bridge of a ship) to track the location of the wearer.",
          equipped: true,
          quantity: 1,
          cost: 45,
          baseType: "personalLocator",
        },
        {
          id: "",
          name: "Subsurface scanner",
          description:
            "Allows crewmembers at a control center (or on the bridge of a ship) to track the location of the wearer.",
          equipped: true,
          quantity: 1,
          cost: 1000,
          baseType: "subsurfaceScanner",
        },
      ],
    },
    {
      armors: [
        {
          armorType: "standardCrewAttire",
          id: "",
          name: "Lounge Wear",
          equipped: true,
          armorPoints: 1,
          cost: 20,
          oxygenSupply: 0,
          notes: "",
          armorSpeed: "normal",
        },
      ],
      weapons: [
        {
          id: "",
          name: "",
          equipped: true,
          cost: 50,
          weaponRange: "adjacent",
          damageString: "1d5 DMG",
          shots: null,
          magazineSize: null,
          critical: "Blunt Force [+]",
          special: "",
          weaponType: "Crowbar",
          magazines: null,
          damage: [{ damageType: "xd5", amount: 1, rollMode: "normal" }],
          baseType: "crowbar",
        },
      ],
      equipments: [
        {
          id: "",
          name: "Pain Pills",
          description:
            "When ingested, immediately restores 1d10 health and lowers Stress by 1. There is a danger of addiction and/or overdose if used frequently.",
          equipped: true,
          quantity: 5,
          cost: 450,
          baseType: "painPills",
        },
        {
          id: "",
          name: "Six pack of beer",
          description: "",
          equipped: true,
          quantity: 1,
          cost: 50,
          baseType: "sixPackBeer",
        },
      ],
    },
  ],
};
