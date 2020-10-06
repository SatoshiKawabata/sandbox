export function sendToTab<Res>(message: string) {
  return new Promise<Res>((res, rej) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const [tab] = tabs;
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, message, (response: Res) => {
          res(response);
        });
      } else {
        rej("no tabs");
      }
    });
  });
}
