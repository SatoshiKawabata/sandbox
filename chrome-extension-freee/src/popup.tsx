import * as React from "react";
import * as ReactDOM from "react-dom";
import { WorkingTimeViewer } from "./components/WorkingTimeViewer";
import { sendToTab } from "./utils/ChromeUtil";

const URL = `https://p.secure.freee.co.jp/#home/${new Date().getFullYear()}/${
  new Date().getMonth() + 1
}`;

const App = () => {
  const [isTargetPage, setIsTargetPage] = React.useState<boolean>(false);

  React.useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setIsTargetPage(tabs[0].url === URL);
      if (tabs[0].url !== URL) {
        sendToTab("open-url::" + URL);
      }
    });
  }, []);

  return (
    <div style={{ width: 300 }}>
      <h1>Freee working time</h1>
      {isTargetPage ? (
        <WorkingTimeViewer />
      ) : (
        <a href={URL} target="_blank">
          Access to freee page
        </a>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
