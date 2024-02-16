import { GameMessage, StampedMessage } from "Messages/types";
import { useState } from "react";

/** Returns the present datetime as a string value in ISO format. */
function getNow(): string {
  const now = new Date();
  return now.toISOString();
}

/** Appends character name and id, and timestamp, to a message. */
export function stamp(
  character: { id: string; name: string },
  m: GameMessage,
): StampedMessage {
  return {
    ...m,
    author: character.name,
    authorId: character.id,
    time: getNow(),
  };
}

/** Returns a list of messages and a function to append.
 *
 *  Messages are stamped with author and time before appending.
 */
export function useLog(author: string, authorId: string) {
  const [messages, setMessages] = useState<StampedMessage[]>([]);

  function log(m: GameMessage) {
    setMessages((ms) => [...ms, stamp({ id: authorId, name: author }, m)]);
  }

  return { messages, log };
}
