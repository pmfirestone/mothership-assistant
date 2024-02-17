import { allSaves, allStats } from "Rules/data";
import { PlayerCharacter, NonPlayerCharacter } from "Rules/types";
import { TrashIcon } from "UI/Icons";
import { Rating, Gauge, Skill } from "UI/Molecules";
import { allSkillsDict } from "Rules/Data/skills";

interface Props {
  character: PlayerCharacter;
  onTitleClick(): void;
}

export function CharacterShort({ character, onTitleClick }: Props) {
  return (
    <div className="rounded-xl bg-mother-2 flex flex-col gap-4">
      <div
        className="rounded-3xl bg-mother-6 text-mother-1 text-center cursor-pointer hover:bg-mother-5"
        onClick={onTitleClick}
      >
        {character.characterClass}: {character.name} ({character.pronouns})
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-wrap justify-around gap-x-4 self-center">
          {allStats.map((s) => (
            <Rating key={s} title={s} value={character[s]} />
          ))}
        </div>
        <div className="flex justify-center gap-8">
          {allSaves.map((s) => (
            <Rating key={s} title={s} value={character[s]} />
          ))}
        </div>
        <div className="flex flex-wrap justify-around">
          <Gauge
            title="Health"
            limitName="Maximum"
            current={character.health ?? 0}
            limit={character.maxHealth ?? 0}
          />
          <Gauge
            title="Wounds"
            limitName="Maximum"
            current={character.wounds}
            limit={character.maxWounds}
          />
          <Gauge
            title="Stress"
            limitName="Minimum"
            current={character.stress}
            limit={character.minStress}
          />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {character.skills.map((s) => (
            <Skill
              key={s.type}
              skill={allSkillsDict[s.type]}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
