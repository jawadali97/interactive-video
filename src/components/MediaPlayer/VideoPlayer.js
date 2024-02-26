import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './styles.css'

function VideoPlayer({onClose}) {
    const nodes = useSelector(state => state.RFState.nodes);
    const edges = useSelector(state => state.RFState.edges);

    const [currentVideo, setCurrentVideo] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [currentNode, setCurrentNode] = useState({});
    const videoRef = useRef(null);
    const cloudinaryRef = useRef();

    useEffect(() => {
        const startNode = nodes.find(node => node.data.isStartNode);
        setCurrentNode(startNode);
        if (startNode) {
            setCurrentVideo(startNode.data.media.url);
        }

        if ( cloudinaryRef.current ) return;

        cloudinaryRef.current = window.cloudinary;
        cloudinaryRef.current.videoPlayer(videoRef.current, {
            cloud_name: 'interactive-video-cloud'
        })

    }, []);

    const onVideoEnded = () => {
        const connectedEdge = edges.find(edge => edge.source === currentNode.id);
        if (connectedEdge) {
            setShowOptions(true);
        }
    }

    const handleOptionSelect = (choice) => {
        const connectedEdge = edges.find(edge => edge.sourceHandle === choice.id);
        if (connectedEdge) {
            const nextNodeId = connectedEdge.target;
            const nextNode = nodes.find(node => node.id === nextNodeId);

            setCurrentNode(nextNode);
            if (nextNode) {
                setCurrentVideo(nextNode.data.media.url);
            }
            setShowOptions(false);

            // if (videoRef.current) {
            //     videoRef.current.play();
            // }
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
                    controlsList="nodownload noremoteplayback"
                    onEnded={onVideoEnded}
                    autoPlay
                    width={1400}
                    height={800}
                />
                {showOptions && (
                    <div className='btns-container'>
                        <div className='wrap-question'>
                        {!currentNode?.data?.onscreenQuestion?.hide && <div className='qst-div'>{currentNode?.data?.onscreenQuestion?.question || "hello"}</div>}
                        <div className='wrap-btns'>
                            {currentNode?.data?.onscreenChoices.map((choice, index) => (
                                <button className='btn'
                                        key={choice.id}
                                        onClick={() => handleOptionSelect(choice)}>
                                    {choice.buttonText || `Button ${index}`}
                                </button>
                            ))}
                        </div>
                        </div>
                    </div> 
                )}
            </div>
        </div>
    );
}

export default VideoPlayer;
