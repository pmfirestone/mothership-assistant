import { Block, Button, Title } from "UI/Atoms";
import { ReadWriteGame, SetDmMode } from "./types";
import { useState } from "react";
import { updateInList } from "helpers";
import { applyDamage } from "Services/damageServices";
import { InflictedDamage, NonPlayerCharacter } from "Rules/types";

interface Props extends ReadWriteGame, SetDmMode {
  damage: InflictedDamage;
}

interface Selection {
  type: "npc" | "monster";
  id: string;
}

export function DealDamage({ game, setGame, setMode, damage }: Props) {
  const { npcs, monsters } = game;
  const [selection, setSelection] = useState<Selection | null>(null);
  return (
    <Block variant="light">
      <Title>Select target</Title>
      <div className="flex flex-wrap gap-1 my-2">
        {npcs.map((npc) => (
          <Button
            light={selection?.id !== npc.id}
            onClick={() => {
              setSelection({ type: "npc", id: npc.id });
            }}
          >
            {npc.name}
          </Button>
        ))}
        {monsters.map((m) => (
          <Button
            light={selection?.id !== m.id}
            onClick={() => {
              setSelection({ type: "monster", id: m.id });
            }}
          >
            {m.name}
          </Button>
        ))}
      </div>
      <div className="flex justify-center gap-2">
        <Button
          dark
          rounded
          disabled={selection === null}
          onClick={() => {
            if (selection?.type === "npc") {
              setGame((g) => ({
                ...g,
                npcs: updateInList(
                  g.npcs,
                  selection?.id,
                  (n) => applyDamage(n, damage) as NonPlayerCharacter,
                ),
              }));
            }
            if (selection?.type === "monster") {
              setGame((g) => ({
                ...g,
                monsters: updateInList(
                  g.monsters,
                  selection?.id,
                  (n) => applyDamage(n, damage) as NonPlayerCharacter,
                ),
              }));
            }
            setMode({ mode: "DmSheet" });
          }}
        >
          take damage
        </Button>
        <Button
          rounded
          onClick={() => {
            setMode({ mode: "DmSheet" });
          }}
        >
          back
        </Button>
      </div>
    </Block>
  );
}
