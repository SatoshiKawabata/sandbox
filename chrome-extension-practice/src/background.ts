import { Message } from "./types.d";
import { record } from "./services/VideoService";
console.log("background2");

var test_value;

// contents.jsで送信した値を受信
chrome.runtime.onMessage.addListener(function (
  message: Message,
  sender,
  sendResponse
) {
  test_value = message.type;
  console.log("onMaessage", message, sender, sendResponse);
  sendResponse("response from background");
  handleMessage(message);
  return true;
});

/**
- [ ] マイクの入力を実装する
- [ ] 画面共有が停止したら録画も終了するようにする
*/

let recorder: MediaRecorder;

const handleMessage = async (message: Message) => {
  switch (message.type) {
    case "start-recording":
      const stream = await (navigator.mediaDevices as any).getDisplayMedia({
        video: true,
        audio: true,
      });
      recorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9",
      });
      recorder.ondataavailable = (e) => {
        const blob = new Blob([e.data], { type: e.data.type });
        const blobUrl = URL.createObjectURL(blob);
        console.log(blobUrl);
        const link = document.createElement("a");
        link.download = "movie.webm";
        link.href = blobUrl;
        document.body.appendChild(link);
        link.click();
      };
      recorder.start();
      break;
    case "stop-recording":
      if (recorder) {
        recorder.stop();
      }
      break;
  }
};
