import { CharacterCreation } from "CharacterCreation/CharacterCreation";
import { MainMenu } from "MainMenu/MainMenu";
import { useState } from "react";
import { Character, Game } from "Rules/types";
import { createRepository } from "Services/services";
import { Session } from "Session/Session";
import { RootModes } from "./types";

const useCharacterRepo = createRepository<Character>("characters");
const useGamesRepo = createRepository<Game>("games");

export function Root() {
  const characterRepo = useCharacterRepo();
  const gamesRepo = useGamesRepo();
  const [mode, setMode] = useState<RootModes>({ mode: "MainMenu" });

  if (mode.mode === "MainMenu") {
    const entries = characterRepo.getEntries();
    return (
      <MainMenu
        characterEntries={entries}
        deleteCharacterEntry={characterRepo.deleteEntry}
        gameEntries={gamesRepo.getEntries()}
        deleteGameEntry={gamesRepo.deleteEntry}
        setMode={setMode}
      />
    );
  }

  if (mode.mode === "CreateCharacter") {
    return (
      <CharacterCreation
        onComplete={(c) => {
          characterRepo.saveNew(c);
          setMode({ mode: "MainMenu" });
        }}
      />
    );
  }

  if (mode.mode === "Play") {
    return (
      <Session
        character={characterRepo.getEntry(mode.characterId)}
        setCharacter={(setter) =>
          characterRepo.update(mode.characterId, setter)
        }
      />
    );
  }

  return <div>Error</div>;
}