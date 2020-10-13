import * as React from "react";
/**
 * 画面共有のみ
 * マイク入力を入れる
 * カメラ入力を入れる
 */

export interface InputType {
  videoInputType: "displayMedia" | "camera" | "video-element";
  audioInputType?: "micropone"; // Only when videoInputType is "camera"
}

export interface InputDevice {
  videoDevices: MediaDeviceInfo[];
  audioDevices: MediaDeviceInfo[];
  selectedVideoDeviceId?: string;
  selectedAudioDeviceId?: string;
}

export interface RecordConfig {
  mimeType: "webm" | "mp4";
  codec: Codec;
  recordingStatus: "init" | "recording" | "finished";
  stream?: MediaStream;
  recorder?: MediaRecorder;
}

export interface ExportConfig {
  name: string;
  blob?: Blob;
}

type Codec = "H264" | "VP8" | "VP9" | "";

export const initialInputType = (): InputType => {
  return {
    videoInputType: "displayMedia",
  };
};

export const initialRecordConfig = (): RecordConfig => {
  return {
    mimeType: "webm",
    codec: "VP8",
    recordingStatus: "init",
  };
};

export const initialExportConfig = (): ExportConfig => {
  return {
    name: "video",
  };
};

export const startRecording = async (
  inputType: InputType,
  inputDevice: InputDevice,
  recordConfig: RecordConfig,
  exportConfig: ExportConfig
): Promise<{
  recordConfig: RecordConfig;
  exportConfig: ExportConfig;
}> => {
  const stream = await getStream(inputType, inputDevice);
  const recorder = new MediaRecorder(stream, {
    mimeType: `video/${recordConfig.mimeType};codecs=${recordConfig.codec}`,
  });
  recorder.start();

  return {
    recordConfig: {
      ...recordConfig,
      stream,
      recorder,
      recordingStatus: "recording",
    },
    exportConfig: {
      name: exportConfig.name,
    },
  };
};

export const getStream = async (
  inputType: InputType,
  inputDevice: InputDevice
) => {
  if (inputType.videoInputType === "displayMedia") {
    // 画面収録
    return await (navigator.mediaDevices as any).getDisplayMedia({
      video: true,
      audio: true,
    });
  } else {
    // カメラ
    return await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: inputDevice.selectedVideoDeviceId,
      },
      audio: {
        deviceId: inputDevice.selectedAudioDeviceId,
      },
    });
  }
};

export const stopRecording = (
  recordConfig: RecordConfig,
  exportConfig: ExportConfig
) => {
  return new Promise<{
    recordConfig: RecordConfig;
    exportConfig: ExportConfig;
  }>((res, rej) => {
    recordConfig.recorder?.addEventListener("dataavailable", (e) => {
      const blob = new Blob([e.data], { type: e.data.type });
      recordConfig.recorder?.stream
        .getTracks()
        .forEach((track) => track.stop());
      res({
        recordConfig: {
          mimeType: recordConfig.mimeType,
          codec: recordConfig.codec,
          recordingStatus: "init",
        },
        exportConfig: {
          ...exportConfig,
          blob,
        },
      });
    });
    recordConfig.recorder?.stop();
  });
};

export const initialInputDevice = async (): Promise<InputDevice> => {
  const infos = await navigator.mediaDevices.enumerateDevices();
  const audioDevices: MediaDeviceInfo[] = [];
  const videoDevices: MediaDeviceInfo[] = [];
  for (const info of infos) {
    if (info.kind === "audioinput") {
      audioDevices.push(info);
    } else if (info.kind === "videoinput") {
      videoDevices.push(info);
    }
  }
  return {
    audioDevices,
    videoDevices,
  };
};

interface State {
  inputType: InputType;
  inputDevice: InputDevice;
  recordConfig: RecordConfig;
  exportConfig: ExportConfig;
}

export const useVideoRecorder = () => {
  const [state, setState] = React.useState<State>({
    inputType: initialInputType(),
    inputDevice: {
      audioDevices: [],
      videoDevices: [],
    },
    recordConfig: initialRecordConfig(),
    exportConfig: initialExportConfig(),
  });

  React.useEffect(() => {
    (async () => {
      const inputDevice = await initialInputDevice();
      setState({
        ...state,
        inputDevice,
      });
    })();
  }, []);

  return {
    state,
    setState,
  };
};
