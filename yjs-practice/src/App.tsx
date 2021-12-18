import { useEffect, useState } from "react";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

const ydoc = new Y.Doc();
const wsProvider = new WebsocketProvider(
  "ws://localhost:1234",
  "yjs-practice",
  ydoc
);
wsProvider.on("status", (event: any) => {
  console.log(event.status, event); // logs "connected" or "disconnected"
});

const yArray = ydoc.getArray<string>("yjs-practice:array");

export function App() {
  const [list, setList] = useState<string[]>(yArray.toArray());
  const [text, setText] = useState("");

  useEffect(() => {
    yArray.observe((e) => {
      setList(yArray.toArray());
    });
  }, [yArray]);

  return (
    <>
      <h1>YJS practice</h1>
      <input
        type="text"
        value={text}
        onInput={(e) => setText((e.target as HTMLInputElement).value)}
      />
      <button
        onClick={() => {
          yArray.push([text]);
          setText("");
        }}
      >
        Add
      </button>
      <ul>
        {list.map((text, i) => {
          return (
            <li key={i}>
              {text}
              <button
                onClick={() => {
                  yArray.delete(i, 1);
                }}
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
