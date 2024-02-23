import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function VideoPlayer({onClose}) {
    const selectedNode = useSelector(state => state.RFState.selectedNode);

    const [currentVideo, setCurrentVideo] = useState('blob:http://localhost:3000/b05ff4dc-1b55-48fe-b901-3a4c7d012591');
    const [showOptions, setShowOptions] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        // Resetting showOptions when the video changes
        setShowOptions(false);
        if (selectedNode && selectedNode.data) {
            setCurrentVideo(selectedNode.data.media.url);
        }
    }, []);

    const onTimeUpdate = () => {
        const videoCurrentTime = videoRef.current.currentTime;
        const pauseTime = 10; // time in seconds when the video should pause

        if (videoCurrentTime >= pauseTime && !showOptions) {
            videoRef.current.pause();
            setShowOptions(true);
        }
    };

    const handleOptionSelect = (videoUrl) => {
        setCurrentVideo(videoUrl);
        setShowOptions(false);
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    return (
        <div className='wrap-player'>
            <div className='player'>
                <button className='close-btn' onClick={onClose}>X</button>
                <video
                    ref={videoRef} 
                    src={currentVideo} 
                    controls 
                    onTimeUpdate={onTimeUpdate}
                    autoPlay
                    width="100%" 
                    height="100%"
                />

                {showOptions && (
                    <div>
                        <button onClick={() => handleOptionSelect('newVideoUrl1.mp4')}>Play Video 1</button>
                        <button onClick={() => handleOptionSelect('newVideoUrl2.mp4')}>Play Video 2</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VideoPlayer;
