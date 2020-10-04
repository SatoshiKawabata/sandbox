document.querySelectorAll("video").forEach(video => {
    console.log(video.captureStream())
    const stream = video.captureStream();
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });
    recorder.ondataavailable = e => {
        const blob = new Blob([e.data], { type: e.data.type });
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "movie.webm";
        link.href = blobUrl;
        document.body.appendChild(link);
        link.click();
    }
    recorder.start();
    setTimeout(()=> {
        recorder.stop();
    }, 3000);
})