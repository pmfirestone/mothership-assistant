import { MessagePanel } from "Messages/MessagePanel";
import { Game } from "Rules/types";
import { useLog } from "Services/messageServices";

interface Props {
    game: Game;
}

export function DmSession({ game }: Props) {
    const { messages, log } = useLog("Warden");
    return (
      <div className="flex gap-2">
        <div className="max-w-2xl">
        </div>
        <MessagePanel messages={messages} />
      </div>
    );
 
}