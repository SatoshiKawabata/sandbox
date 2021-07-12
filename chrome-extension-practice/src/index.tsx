import * as React from "react";
import * as ReactDOM from "react-dom";
import { useVideoRecorder } from "./recorder/VideoRecorder";
import { startRecording, stopRecording } from "./recorder/VideoRecorder";

const App = () => {
  const { state, setState } = useVideoRecorder();

  return (
    <div>
      <h1>Screen Recorder</h1>
      <ul>
        {state.inputDevice.audioDevices.map((mdi) => (
          <li>{mdi.label}</li>
        ))}
      </ul>
      <ul>
        {state.inputDevice.videoDevices.map((mdi) => (
          <li>{JSON.stringify(mdi)}</li>
        ))}
      </ul>
      {state.recordConfig.recordingStatus === "init" ? (
        <button
          type="button"
          onClick={async () => {
            const newState = await startRecording(
              state.inputType,
              state.inputDevice,
              state.recordConfig,
              state.exportConfig
            );
            console.log("newState", newState, state);
            setState({
              ...state,
              ...newState,
            });
          }}
        >
          start-recording
        </button>
      ) : (
        <button
          type="button"
          onClick={async () => {
            const newState = await stopRecording(
              state.recordConfig,
              state.exportConfig
            );
            setState({
              ...state,
              ...newState,
            });
          }}
        >
          stop-recording
        </button>
      )}
      {state.exportConfig.blob ? (
        <a
          href={URL.createObjectURL(state.exportConfig.blob)}
          download={state.exportConfig.name}
        >
          Download Video
        </a>
      ) : null}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
