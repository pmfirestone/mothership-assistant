import { analyseRoll, updateInList } from "helpers";
import { Log } from "Messages/types";
import { useState } from "react";
import { allStats } from "Rules/data";
import { CharacterSkill, RollMode, StatType } from "Rules/types";
import { rollStat } from "Services/diceServices";
import { Block, Button, Divider } from "UI/Atoms";
import { SelectableRating, Skill } from "UI/Molecules";
import { ReadWriteCharacter, SetMode } from "./types";
import { allSkillsDict } from "Rules/Data/skills";
import { spendAmmoForWeapon } from "Services/characterServices";

interface Props extends ReadWriteCharacter, Log, SetMode {
  weaponId?: string;
}

export function RollStat({
  character,
  setCharacter,
  log,
  setMode,
  weaponId,
}: Props) {
  const [stat, setStat] = useState<StatType>("combat");
  const [skill, setSkill] = useState<CharacterSkill | null>(null);
  const [rollMode, setRollMode] = useState<RollMode>("normal");

  return (
    <Block variant="light">
      <div className="flex flex-wrap justify-center gap-8">
        {allStats.map((s) => (
          <SelectableRating
            key={s}
            title={s}
            value={character[s]}
            onClick={() => setStat(s)}
            selected={s === stat}
          />
        ))}
      </div>
      <Divider />
      <div className="flex flex-wrap justify-center items-center gap-4">
        {character.skills.map((s) => (
          <Skill
            key={s.type}
            skill={allSkillsDict[s.type]}
            onClick={() => {
              setSkill((ss) => (ss?.type === s.type ? null : s));
            }}
            selected={s.type === skill?.type}
          />
        ))}
      </div>
      <Divider />
      <div className="flex justify-center gap-2">
        <Button
          light={rollMode !== "advantage"}
          rounded
          onClick={() => {
            setRollMode((m) => (m === "advantage" ? "normal" : "advantage"));
          }}
        >
          advantage
        </Button>
        <Button
          light={rollMode !== "disadvantage"}
          rounded
          onClick={() => {
            setRollMode((m) =>
              m === "disadvantage" ? "normal" : "disadvantage",
            );
          }}
        >
          disadvantage
        </Button>
      </div>
      <Divider />
      <div className="flex justify-center gap-2">
        <Button
          dark
          rounded
          onClick={() => {
            const results = rollStat({
              stat: { value: character[stat], name: stat },
              skill,
              rollMode,
            });
            log(
              weaponId === undefined
                ? {
                    type: "StatRollMessage",
                    props: results,
                  }
                : {
                    type: "AttackRollMessage",
                    props: { weaponId, roll: results },
                  },
            );
            const analysis = analyseRoll(results);
            if (!analysis.isSuccess) {
              setCharacter((c) => ({ ...c, stress: c.stress + 1 }));
            }
            if (weaponId !== undefined) {
              setCharacter((c) => spendAmmoForWeapon(c, weaponId));
            }
            setMode({ mode: "CharacterSheet" });
          }}
        >
          roll
        </Button>
        <Button
          rounded
          onClick={() => {
            setMode({ mode: "CharacterSheet" });
          }}
        >
          back
        </Button>
      </div>
    </Block>
  );
}
