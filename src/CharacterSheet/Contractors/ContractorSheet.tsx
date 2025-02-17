import { AddArmor } from "CharacterSheet/AddArmor";
import { AddCustomItem } from "CharacterSheet/AddCustomItem";
import { AddEquipment } from "CharacterSheet/AddEquipment";
import { AddWeapon } from "CharacterSheet/AddWeapon";
import { Armor } from "CharacterSheet/Armor";
import { EquipmentElem } from "CharacterSheet/Equipment";
import { Modes, Wallet, WriteCharacter } from "CharacterSheet/types";
import { ViewArmor } from "CharacterSheet/ViewArmor";
import { ViewEquipment } from "CharacterSheet/ViewEquipment";
import { ViewWeapon } from "CharacterSheet/ViewWeapon";
import { Weapons } from "CharacterSheet/Weapons";
import { Log } from "Messages/types";
import { useState } from "react";
import { NonPlayerCharacter } from "Rules/types";
import { Button } from "UI/Atoms";
import { ContractorIdentity } from "./ContractorIdentity";
import { ContractorStats } from "./ContractorStats";
import { ContractorStatus } from "./ContractorStatus";
import { EditContractorStats } from "./EditContractorStats";

interface Props extends WriteCharacter, Log {
  contractor: NonPlayerCharacter;
  wallet: Wallet;
  back(): void;
}

export function ContractorSheet({
  contractor,
  setCharacter,
  back,
  wallet,
  log,
}: Props) {
  const [mode, setMode] = useState<Modes>({ mode: "CharacterSheet" });

  function setContractor(
    setter: (c: NonPlayerCharacter) => NonPlayerCharacter,
  ) {
    setCharacter((char) => {
      return {
        ...char,
        contractors: char.contractors.map((c) => {
          if (c.id !== contractor.id) {
            return c;
          }
          return setter(c);
        }),
      };
    });
  }

  if (mode.mode === "AddWeapon") {
    return (
      <AddWeapon
        setCharacter={setContractor}
        setMode={setMode}
        wallet={wallet}
      />
    );
  }

  if (mode.mode === "ViewWeapon") {
    return (
      <ViewWeapon
        setCharacter={setContractor}
        setMode={setMode}
        weapon={contractor.weapons.find((c) => c.id === mode.weaponId)!}
        wallet={wallet}
      />
    );
  }

  if (mode.mode === "AddArmor") {
    return (
      <AddArmor
        setCharacter={setContractor}
        setMode={setMode}
        wallet={wallet}
      />
    );
  }

  if (mode.mode === "ViewArmor") {
    return (
      <ViewArmor
        setCharacter={setContractor}
        setMode={setMode}
        armor={contractor.armor.find((c) => c.id === mode.armorId)!}
      />
    );
  }

  if (mode.mode === "AddEquipment") {
    return (
      <AddEquipment
        setCharacter={setContractor}
        setMode={setMode}
        wallet={wallet}
      />
    );
  }

  if (mode.mode === "AddCustomItem") {
    return <AddCustomItem setCharacter={setContractor} setMode={setMode} />;
  }

  if (mode.mode === "ViewEquipment") {
    return (
      <ViewEquipment
        setCharacter={setContractor}
        setMode={setMode}
        equipment={contractor.equipment.find((c) => c.id === mode.equipmentId)!}
      />
    );
  }

  if (mode.mode === "EditStats") {
    return (
      <EditContractorStats
        contractor={contractor}
        setContractor={setContractor}
        back={() => setMode({ mode: "CharacterSheet" })}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ContractorIdentity
        contractor={contractor}
        setContractor={setContractor}
      />
      <ContractorStatus
        contractor={contractor}
        setContractor={setContractor}
        setMode={setMode}
      />
      <ContractorStats contractor={contractor} setMode={setMode} />
      <Weapons
        character={contractor}
        setMode={setMode}
        setCharacter={setContractor}
        log={log}
      />
      <Armor character={contractor} setMode={setMode} />
      <EquipmentElem character={contractor} setMode={setMode} />
      <div className="flex justify-center gap-2">
        <Button onClick={back} dark>
          Back
        </Button>
        <Button
          onClick={() => {
            setCharacter((char) => ({
              ...char,
              contractors: char.contractors.filter(
                (c) => c.id !== contractor.id,
              ),
            }));
            back();
          }}
          light
        >
          Remove contractor
        </Button>
      </div>
    </div>
  );
}
