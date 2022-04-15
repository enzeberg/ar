import { useState, useRef } from 'react';
import { FiCamera, FiCameraOff } from 'react-icons/fi';

import './App.css';

function App() {
  const [cameraIsOn, setCameraIsOn] = useState(false);
  const videoEl = useRef(null);

  const onCameraOnBtnClick = () => {
    const constraints = {
      // video: {
      //   // width: window.innerWidth,
      //   // height: window.innerHeight,
      //   width: 320,
      //   height: 600,
      // },
      video: true,
      audio: false
    };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        setCameraIsOn(true);
        const video = videoEl.current;
        if ('srcObject' in video) {
          video.srcObject = stream;
        }
        video.addEventListener('loadedmetadata', (e) => {
          video.play();
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  const onCameraOffBtnClick = () => {
    const video = videoEl.current;
    const stream = video.srcObject;
    if ('getTracks' in stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    setCameraIsOn(false);
  };

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <video
        ref={videoEl}
        // style={{
        //   width: window.innerWidth,
        //   height: window.innerHeight,
        // }}
      />
      {
        cameraIsOn ||
          <button
            className="icon-btn camera"
            onClick={onCameraOnBtnClick}
          >
            <FiCamera style={{ fontSize: '50px', color: 'green' }} />
          </button>
      }
      {
        cameraIsOn &&
          <button
            className="icon-btn camera"
            onClick={onCameraOffBtnClick}
          >
            <FiCameraOff style={{ fontSize: '50px', color: 'red' }} />
          </button>
      }
    </div>
  );
}

export default App;