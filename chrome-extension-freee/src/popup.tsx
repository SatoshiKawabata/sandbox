import * as React from "react";
import * as ReactDOM from "react-dom";
import { WorkingTimeViewer } from "./components/WorkingTimeViewer";

const URL = `https://p.secure.freee.co.jp`;

const App = () => {
  const [isTargetPage, setIsTargetPage] = React.useState<boolean>(false);

  React.useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0].url || "";
      const _isTargetUrl = url.indexOf(URL) > -1;
      setIsTargetPage(_isTargetUrl);
      if (!_isTargetUrl) {
        // sendToTab("open-url::" + URL);
        window.open(URL, "_blank");
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
          Please access to freee page.
        </a>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
