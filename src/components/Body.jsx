import React, { useEffect, useState } from "react";

const Body = () => {
  //state for the time the audio currently is
  const [currentTime, setCurrentTime] = useState(0);
  //determine if audio is playing or not
  const [playerStatus, setPlayerStatus] = useState(false);
  //create an object with the loops names and audio files
  const [loops, setLoops] = useState({});
  //how many cubes are currently "on"
  const [onCount, setOnCount] = useState(0);

  const loopsName = [
    "breakBeats",
    "electricGuitar",
    "funkBeats",
    "groove",
    "grooveTanggu",
    "heavyFunk",
    "mazePerc",
    "silentStar",
    "stompySlosh",
  ];

  useEffect(() => {
    const newLoops = {};
    for (let name of loopsName) {
      newLoops[name] = {
        name: name,
        audio: new Audio(`sounds/${name}.mp3`),
        on: false,
      };
      newLoops[name].audio.setAttribute("loop", "true");
    }
    setLoops(newLoops);
  }, []);

  useEffect(() => {
    for (let name of loopsName) {
      if (loops[name] && loops[name].on) {
        if (playerStatus) {
          loops[name].audio.currentTime = currentTime;
          loops[name].audio.play();
        } else {
          loops[name].audio.pause();
        }
      }
    }
  }, [playerStatus]);

  const getCurTime = () => {
    for (let name of loopsName) {
      if (loops[name].on) return loops[name].audio.currentTime;
    }
  };

  const handlePadClick = (name) => {
    const isOn = loops[name].on;
    if (isOn) {
      if (playerStatus) {
        loops[name].audio.pause();
        if (onCount === 1) setPlayerStatus(false);
      }
      setOnCount(onCount - 1);
    } else {
      if (playerStatus) {
        loops[name].audio.currentTime = getCurTime();
        loops[name].audio.play();
      }
      setOnCount(onCount + 1);
    }
    setLoops({ ...loops, [name]: { ...loops[name], on: !isOn } });
  };

  const handleAudioToggle = (e) => {
    const clickedBtn = e.target.alt;

    if (clickedBtn === "playBtn") {
      if (playerStatus) return;
      if (onCount) setPlayerStatus(true);
    } else {
      if (!playerStatus) return;
      setCurrentTime(getCurTime());
      setPlayerStatus(false);
    }
  };

  return (
    <div>
      <div className='loopControls'>
        <img
          id='playBtn'
          src='img/play.png'
          onClick={handleAudioToggle}
          alt='playBtn'
        />
        <img
          id='pauseBtn'
          src='img/pause.png'
          onClick={handleAudioToggle}
          alt='pauseBtn'
        />
      </div>
      <div className='container'>
        {loopsName.map((name, i) => (
          <div className={`cube${i}`} key={i}>
            <p>{name.toLowerCase()}</p>
            <label className='switch'>
              <input onClick={() => handlePadClick(name)} type='checkbox' />
              <span className='slider round'></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

// {loops[name] && loops[name].on ? "on" : "off"}

export default Body;
