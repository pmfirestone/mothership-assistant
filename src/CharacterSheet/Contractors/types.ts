import { NonPlayerCharacter } from "Rules/types";

export interface ReadContractor {
  contractor: NonPlayerCharacter;
}

export interface WriteContractor {
  setContractor(setter: (c: NonPlayerCharacter) => NonPlayerCharacter): void;
}

export type ReadWriteContractor = ReadContractor & WriteContractor;
