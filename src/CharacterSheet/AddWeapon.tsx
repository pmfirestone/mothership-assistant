import { useState } from "react";
import { allWeaponDict, allWeapons } from "Rules/data";
import { Weapon, WeaponType } from "Rules/types";
import { Block, Button, Title } from "UI/Atoms";
import { clone, formatCredits } from "helpers";
import { Column, Counter, Table } from "UI/Organisms/Table";
import { ReadWriteCharacter, SetMode } from "./types";

function getDefaultSelection(): Record<WeaponType, number> {
  const res = {} as Record<WeaponType, number>;
  allWeapons.forEach((w) => {
    res[w.weaponType] = 0;
  });
  return res;
}

export function AddWeapon({
  character,
  setCharacter,
  setMode,
}: ReadWriteCharacter & SetMode) {
  const [selected, setSelected] = useState<Record<WeaponType, number>>(
    getDefaultSelection()
  );

  const columns: Column<Weapon>[] = [
    {
      name: "Item",
      cell({ elt }) {
        return <div>{elt.weaponType}</div>;
      },
    },
    {
      name: "Credits",
      className: "w-24",
      cell({ elt }) {
        return <div className="text-center">{formatCredits(elt.cost)}</div>;
      },
    },
    {
      name: "Buy",
      className: "w-24",
      cell({ elt }) {
        return (
          <div className="mx-auto">
            <Counter
              amount={selected[elt.weaponType]}
              onDeselect={() =>
                setSelected((s) => ({
                  ...s,
                  [elt.weaponType]: s[elt.weaponType] - 1,
                }))
              }
              onSelect={() =>
                setSelected((s) => ({
                  ...s,
                  [elt.weaponType]: s[elt.weaponType] + 1,
                }))
              }
            />
          </div>
        );
      },
    },
  ];

  const firearms = allWeapons.filter((w) => w.type === "Firearm");
  const industrial = allWeapons.filter((w) => w.type === "Industrial");
  const melee = allWeapons.filter((w) => w.type === "Melee");

  const totalCost = allWeapons
    .map((w) => w.cost * selected[w.weaponType])
    .reduce((a, b) => a + b, 0);

  function getNewWeapons() {
    const res: Weapon[] = [];
    Object.entries(selected).forEach(([key, value]) => {
      for (let i = 0; i < value; i++) {
        res.push(clone(allWeaponDict[key]));
      }
    });
    return res;
  }

  return (
    <div className="flex flex-col gap-2">
      <Block variant="light">
        <Title>Firearms</Title>
        <Table columns={columns} rows={firearms} />
      </Block>
      <Block variant="light">
        <Title>Industrial</Title>
        <Table columns={columns} rows={industrial} />
      </Block>
      <Block variant="light">
        <Title>Melee</Title>
        <Table columns={columns} rows={melee} />
      </Block>
      <Block variant="dark">
        <div>
          <div>{formatCredits(totalCost)}</div>
          <div>Current credits: {formatCredits(character.credits)}</div>
          <Button
            onClick={() => {
              setCharacter((char) => ({
                ...char,
                weapons: [...char.weapons, ...getNewWeapons()],
                credits: char.credits - totalCost,
              }));
              setMode({ mode: "CharacterSheet" });
            }}
          >
            Purchase
          </Button>
          <Button
            onClick={() => {
              setCharacter((char) => ({
                ...char,
                weapons: [...char.weapons, ...getNewWeapons()],
              }));
              setMode({ mode: "CharacterSheet" });
            }}
          >
            Acquire
          </Button>
        </div>
      </Block>
    </div>
  );
}
