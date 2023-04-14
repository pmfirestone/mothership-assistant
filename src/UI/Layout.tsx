import { Children } from "./types";

export function Layout({ children }: Children) {
  return (
    <div className="p-4 mx-auto max-w-6xl bg-mother-1">
      <h1 className="text-4xl">
        <a href="/">Mothership assistant</a>
      </h1>
      <h2>Mothership is a tabletop rpg by Tuesday Knight Games</h2>
      <a className="link" href="www.tuesdayknightgames.com">
        www.tuesdayknightgames.com
      </a> -{" "}
      <a className="link" href="https://github.com/sbergot/mothership-assistant/issues">
      report a bug
      </a>
      <div className="mt-4 text-lg uppercase font-bold text-mother-6">
        {children}
      </div>
    </div>
  );
}