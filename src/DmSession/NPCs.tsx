import { Title, Button } from "UI/Atoms";
import { updateInList, deleteInList } from "helpers";
import { useState } from "react";
import { ReadWriteGame } from "./types";
import { NonPlayerCharacter } from "Rules/types";
import { uuidv4 } from "Services/storageServices";
import { NpcShort } from "UI/Organisms/NpcShort";

export function NPCs({ game, setGame }: ReadWriteGame) {
  const [newNpcName, setNewNpcName] = useState("");
  const { npcs } = game;

  function newNpc(name: string): NonPlayerCharacter {
    return {
      type: "",
      combat: 0,
      instinct: 0,
      maxWounds: 2,
      wounds: 0,
      name,
      description: "",
      visibleToAll: false,
      id: uuidv4(),
      excluded: false,
      pronouns: "",
      occupation: "",
      salary: 0,
      loyalty: 0,
      motivation: "",
      attacks: [],
      probability: { min: 0, max: 0 },
      equipment: [],
      armor: [],
      items: [],
      weapons: [],
    };
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-evenly gap-4 mb-8">
        {npcs.map((c) => (
          <NpcShort
            key={c.id}
            npc={c}
            setNpc={(setter) => {
              setGame((g) => ({
                ...g,
                npcs: updateInList(g.npcs, c.id, setter),
              }));
            }}
            deleteNpc={() => {
              setGame((g) => ({
                ...g,
                npcs: deleteInList(g.npcs, c.id),
              }));
            }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="shrink-0">
          <Button
            disabled={newNpcName.replace(/\s/g, "") === ""}
            onClick={() => {
              setGame((g) => ({
                ...g,
                npcs: [...g.npcs, newNpc(newNpcName)],
              }));
              setNewNpcName("");
            }}
          >
            New Npc
          </Button>
        </div>
        <input
          className="input border-2 border-mother-5"
          placeholder="name"
          value={newNpcName}
          onChange={(e) => setNewNpcName(e.target.value)}
        />
      </div>
    </>
  );
}
