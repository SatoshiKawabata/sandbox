import { useEffect, useState } from "react";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import { parse } from "./yJson";

const ydoc = new Y.Doc();
const wsProvider = new WebsocketProvider(
  "ws://localhost:1234",
  "yjs-practice",
  ydoc
);
wsProvider.on("status", (event: any) => {
  console.log(event.status, event); // logs "connected" or "disconnected"
});

type Item = {
  text: string;
  id: number;
};

const yArray = ydoc.getArray<Item>("yjs-practice:array");

const mock = require("./mock.json");
const json = parse(mock, ydoc);
console.log(json);

export function App() {
  // const [yList, setYList] = useState<Y.Array<Item>>(ydoc.getArray<Item>("yjs-practice:array"));
  const [list, setList] = useState<Item[]>(yArray.toArray());
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
          yArray.push([{ text, id: Date.now() }]);
          setText("");
        }}
      >
        Add
      </button>
      <ul>
        {list.map((item, i) => {
          return (
            <li key={i}>
              <input
                type="text"
                value={item.text}
                onInput={(e) => {
                  const text = (e.target as HTMLInputElement).value;
                  yArray.get(i).text = text;
                  // yArray.delete(i, 1);
                  // yArray.insert(i, [{ text, id: item.id }]);
                }}
              />
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
