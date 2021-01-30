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

  let timeToSleep = 0;

  const handleChange = (e) => {
    let timeToSleepGiven = e.target.value * 1000;
    return (timeToSleep = timeToSleepGiven);
  };

  const handleAction = async () => {
    const recorder = await recordAudio();
    const actionButton = document.getElementById("action");
    actionButton.disabled = true;
    recorder.start();
    console.log(timeToSleep);
    await sleep(timeToSleep);
    const audio = await recorder.stop();
    audio.play();
    await sleep(timeToSleep);
    actionButton.disabled = false;
  };

  return (
    <div className='recSection'>
      <h3>Record Your Own Jam!</h3>
      <p>
        Just choose the record time (3-20 seconds) and click the record button.
      </p>
      <p>After you are done, your recording will be played automatically!</p>
      <div>
        <input type='number' min='3' max='20' onChange={handleChange} />
      </div>
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
