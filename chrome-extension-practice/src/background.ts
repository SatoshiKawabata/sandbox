console.log("background");
// import { startRecording, stopRecording } from "./recorder/VideoRecorder";
// import { Message } from "./types.d";

// // contents.jsで送信した値を受信
// chrome.runtime.onMessage.addListener(function (
//   message: Message,
//   sender,
//   sendResponse
// ) {
//   sendResponse("response from background");

//   handleMessage(message);
//   return true;
// });

// /**
// - [ ] マイクの入力を実装する
// - [ ] 画面共有が停止したら録画も終了するようにする
// */

// let state: State;
// async () => {
//   state = await initialState();
// };

// const handleMessage = async (message: Message) => {
//   switch (message.type) {
//     case "start-recording":
//       startRecording(state);
//       break;
//     case "stop-recording":
//       stopRecording(state);
//       break;
//   }
// };
