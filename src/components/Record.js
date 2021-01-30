import React from "react";

const Record = () => {
  const recordAudio = () =>
    new Promise(async (resolve) => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      const start = () => mediaRecorder.start();

      const stop = () =>
        new Promise((resolve) => {
          mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            const play = () => audio.play();
            resolve({ audioBlob, audioUrl, play });
          });

          mediaRecorder.stop();
        });

      resolve({ start, stop });
    });

  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

  const handleAction = async () => {
    const recorder = await recordAudio();
    recorder.start();
    await sleep(10000);
    const audio = await recorder.stop();
    audio.play();
  };

  return (
    <div className='recSection'>
      <h3>Record Your Own Jam!</h3>
      <p>
        The rocording is set to 10 seconds and after you are done, your
        recording will be played automatically!
      </p>
      <div>
        <button>
          <img
            id='action'
            src='img/rec.png'
            alt='recBtn'
            onClick={handleAction}
          />
        </button>
      </div>
    </div>
  );
};

export default Record;
