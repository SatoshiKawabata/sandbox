import React from "react";
import ReactDOM from "react-dom";
import { getWorkingMilliSeconces, getWorkingStamps } from "./utils/FreeeUtil";

const Main = () => {
  return <div>Hello Content Scripts.</div>;
};

const app = document.createElement("div");
app.id = "my-extension-root";
document.body.appendChild(app);
ReactDOM.render(<Main />, app);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);

  if (request === "get-working-time") {
    if (
      document.querySelectorAll(".sw-basic-table .time-clocks").length === 0
    ) {
      (document.querySelector(
        ".time-clock-content.time-clock-edit > .sw-button:last-child"
      ) as HTMLButtonElement)?.click();
    }
    const stamps = getWorkingStamps();
    const milliSec = getWorkingMilliSeconces(stamps);
    sendResponse(milliSec);
  } else {
    sendResponse("failed");
  }
});
