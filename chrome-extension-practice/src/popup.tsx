import * as React from "react";
import * as ReactDOM from "react-dom";
import { Message } from "./types";

window.open("/index.html", "_blank");

const App = () => {
  console.log("window", window);

  const [second, setSecond] = React.useState<number>(0);

  return (
    <div>
      <h1>Hello!!!</h1>
      {second}
      <button type="button" id="log">
        log
      </button>
      <button type="button" id="send">
        send to contents
      </button>
      <button
        type="button"
        onClick={() => {
          sendToBackground({ type: "start-recording" });
        }}
      >
        start-recording
      </button>
      <button
        type="button"
        onClick={() => {
          sendToBackground({ type: "stop-recording" });
        }}
      >
        stop-recording
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));

// backgroundで受け取った値をコンソールに表示
function logBackgroundValue() {
  var test = (chrome.extension.getBackgroundPage() as any)?.test_value;
  console.log(test);
  return;
}

// 現在アクティブなタブにデータを送信
function sendToContents() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];

    chrome.tabs.sendMessage(
      tab.id || 0,
      JSON.stringify({ contents: "test value from popup" }),
      function (response) {}
    );
  });
}

const sendToBackground = (message: Message) => {
  chrome.runtime.sendMessage(message, (res) => {
    console.log("response", res);
  });
};

document.getElementById("log")?.addEventListener("click", logBackgroundValue);
document.getElementById("send")?.addEventListener("click", sendToContents);
