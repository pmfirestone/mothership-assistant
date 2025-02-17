import { Column } from "./Table";

export interface Field<T> extends Column<T> {
  hidden?(elt: T): boolean;
}

export function simpleField<T, K extends keyof T>(
  key: K,
  name: string,
): Field<T> {
  return {
    name,
    hidden(elt) {
      return !elt[key];
    },
    cell({ elt }) {
      return <span>{elt[key] as string}</span>;
    },
  };
}

interface Props<T> {
  fields: Field<T>[];
  item: T;
}

export function ItemDetails<T>({ fields, item }: Props<T>) {
  return (
    <div className="flex flex-col  border-b border-mother-5">
      {fields.map((f) => {
        const Comp = f.cell;
        if (f.hidden && f.hidden(item)) {
          return null;
        }
        return (
          <div className="flex border-t border-mother-5">
            <div className="w-48 shrink-0">{f.name}</div>
            <div>
              <Comp elt={item} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
