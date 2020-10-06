import React from "react";
import ReactDOM from "react-dom";

const Main = () => {
  return <div>Hello Content Scripts.</div>;
};

const app = document.createElement("div");
app.id = "my-extension-root";
document.body.appendChild(app);
ReactDOM.render(<Main />, app);

// 送信側 contents -> background
chrome.runtime.sendMessage({ value: { contents: "test value from contents" } });

// 受信側 other tab -> contents(popup/option -> contents)
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("contents", message);
  return;
});
