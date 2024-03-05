import React, { useEffect, useRef, useState } from 'react';
import './media-player.css';
import {
  Pause,
  PlayArrow,
  Fullscreen,
  FullscreenExit,
  VolumeUp
} from '@mui/icons-material';
import { Button } from '@mui/material'

let timer = null;

function Player({url, displayChoices, setShowOptions}) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsRef = useRef(null);

  useEffect(() => {
    setProgress(0);
    setIsPlaying(true);
  }, [url])

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setControlsHideTimeout();
    } else {
      video.pause();
      setIsPlaying(false);
      clearControlsHideTimeout();
    }
  };

  const setControlsHideTimeout = () => {
    clearControlsHideTimeout()
    timer = setTimeout(() => { setShowControls(false) }, 5000);
  }

  const clearControlsHideTimeout = () => {
    clearTimeout(timer);
    setShowControls(true);
  }

  const handleOnTimeUpdate = () => {
    const video = videoRef.current;
    const progress = (video.currentTime / video.duration) * 100;
    if (progress) {
      setProgress(progress);
    }

    if (progress >= 95) {
      displayChoices();
    } else {
      setShowOptions(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setControlsHideTimeout();
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const progressBar = e.target;
    const time = (progressBar.value / 100) * video.duration;
    video.currentTime = time;
    setControlsHideTimeout();
  };

  const toggleFullScreen = () => {
    const video = playerRef.current;
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      video.parentElement.requestFullscreen();
      setIsFullscreen(true);
    }
    setControlsHideTimeout();
  };

  const onVideoClick = () => {
    if (!showControls) {
      setShowControls(true);
      setControlsHideTimeout();
    }
  }

  const onVideoEnded = () => setIsPlaying(false);

  return (
    <div ref={playerRef} className="video-player">
      <video
        ref={videoRef}
        src={url}
        onTimeUpdate={handleOnTimeUpdate}
        onClick={onVideoClick}
        onEnded={onVideoEnded}
        autoPlay
      />
      <div className={`controls ${showControls ? 'show' : 'hide'}`} ref={controlsRef}>
        <input
          id='seekbar'
          type="range"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          onClick={handleSeek}
        />
        <div className='controls-btns'>
          <Button variant='contained' onClick={togglePlayPause}>{isPlaying ? <Pause/> : <PlayArrow/>}</Button>
          <div style={{ display: 'inline-flex', alignItems: 'center'}}>
            <VolumeUp/>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
            />
            <Button
              variant='text'
              onClick={toggleFullScreen}
              sx={{
                color: 'white',
                padding: 0,
                minWidth: 0,
                marginLeft: '25px'
              }}
            >
              {!isFullscreen ? <Fullscreen/> : <FullscreenExit/>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
