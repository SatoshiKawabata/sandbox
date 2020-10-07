/**
 * 画面共有のみ
 * マイク入力を入れる
 * カメラ入力を入れる
 */

interface State {
  inputDevice: InputDevice;
  recordConfig: RecordConfig;
  exportConfig: ExportConfig;
  videoInputType: "displayMedia" | "camera";
  audioInputType?: "micropone";
}
interface InputDevice {
  videoDevices: MediaDeviceInfo[];
  audioDevices: MediaDeviceInfo[];
  selectedVideoDevice?: MediaDeviceInfo;
  selectedAudioDevice?: MediaDeviceInfo;
}

interface RecordConfig {
  mimeType: "webm" | "mp4";
  codec: Codec;
  recordingStatus: "init" | "recording" | "finished";
  stream?: MediaStream;
  recorder?: MediaRecorder;
}

interface ExportConfig {
  name: string;
  blob?: Blob;
}

type Codec = "H264" | "VP8" | "VP9" | "";

const initialInputDevices = async () => {
  const inputDevice: InputDevice = {
    videoDevices: [],
    audioDevices: [],
  };
  const infos = await navigator.mediaDevices.enumerateDevices();
  inputDevice.audioDevices = [];
  inputDevice.videoDevices = [];
  for (const info of infos) {
    if (info.kind === "audioinput") {
      inputDevice.audioDevices.push(info);
    } else if (info.kind === "videoinput") {
      inputDevice.videoDevices.push(info);
    }
  }
  return inputDevice;
};

const initialRecordConfig = (): RecordConfig => {
  return {
    mimeType: "webm",
    codec: "VP8",
    recordingStatus: "init",
  };
};

const initialExportConfig = (): ExportConfig => {
  return {
    name: "video",
  };
};

export const initialState = async () => {
  const inputDevice = await initialInputDevices();
  return {
    videoInputType: "displayMedia",
    inputDevice,
    exportConfig: initialExportConfig(),
    recordConfig: initialRecordConfig(),
  } as State;
};

export const startRecording = async (state: State) => {
  const stream = await getStream(state);
  state.recordConfig.stream = stream;
  const recorder = new MediaRecorder(stream, {
    mimeType: `video/${state.recordConfig.mimeType};codecs=${state.recordConfig.codec}`,
  });
  state.recordConfig.recorder = recorder;

  recorder.ondataavailable = (e) => {
    const blob = new Blob([e.data], { type: e.data.type });
    const blobUrl = URL.createObjectURL(blob);
    console.log(blobUrl);
    const link = document.createElement("a");
    link.download = `${state.exportConfig.name}.${state.recordConfig.mimeType}`;
    link.href = blobUrl;
    document.body.appendChild(link);
    link.click();
  };
  recorder.start();
};

const getStream = async (state: State) => {
  if (state.videoInputType === "displayMedia") {
    // 画面収録
    return await (navigator.mediaDevices as any).getDisplayMedia({
      video: true,
      audio: true,
    });
  } else {
    // カメラ
    return await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: state.inputDevice.selectedVideoDevice?.deviceId,
      },
      audio: {
        deviceId: state.inputDevice.selectedAudioDevice?.deviceId,
      },
    });
  }
};

export const stopRecording = (state: State) => {
  state.recordConfig.recorder?.stop();
};
