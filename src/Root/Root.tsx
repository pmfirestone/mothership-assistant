import { CharacterCreation } from "CharacterCreation/CharacterCreation";
import { DmSession } from "DmSession/DmSession";
import { MainMenu } from "MainMenu/MainMenu";
import { PlayerSession } from "PlayerSession/PlayerSession";
import { useState } from "react";
import { PlayerCharacter, Game } from "Rules/types";
import { createRepository } from "Services/storageServices";
import { RootModes, Schema } from "./types";
import useLocalStorage from "use-local-storage";

const useCharacterRepo = createRepository<PlayerCharacter>("characters");
const useGamesRepo = createRepository<Game>("games");

export function Root() {
  const characterRepo = useCharacterRepo();
  const gamesRepo = useGamesRepo();
  useLocalStorage<Schema>("schema", { version: "1.0" });
  const [mode, setMode] = useState<RootModes>({ mode: "MainMenu" });

  if (mode.mode === "MainMenu") {
    const entries = characterRepo.getEntries();
    return (
      <MainMenu
        characterEntries={entries}
        deleteCharacterEntry={characterRepo.deleteEntry}
        gameEntries={gamesRepo.getEntries()}
        deleteGameEntry={gamesRepo.deleteEntry}
        saveNewGame={gamesRepo.saveNew}
        setMode={setMode}
        reloadCharacters={characterRepo.reload}
        reloadGames={gamesRepo.reload}
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

  if (mode.mode === "PlayerSession") {
    return (
      <PlayerSession
        character={characterRepo.getEntry(mode.characterId)}
        setCharacter={(setter) =>
          characterRepo.update(mode.characterId, setter)
        }
        sessionCode={mode.sessionCode}
      />
    );
  }

  if (mode.mode === "DmSession") {
    return (
      <DmSession
        game={gamesRepo.getEntry(mode.gameId)}
        setGame={(setter) => gamesRepo.update(mode.gameId, setter)}
      />
    );
  }

  return <div>Error</div>;
}
