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

    useEffect(() => {
        const startNode = nodes.find(node => node.data.isStartNode);
        setCurrentNode(startNode);
        if (startNode) {
            setCurrentVideo(startNode.data.media.url);
        }
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
                    {showOptions ? (
                        <div className='btns-container'>
                            {!currentNode.data.onscreenQuestion.hide && <span>{currentNode.data.onscreenQuestion.question}</span>}
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
                    )
                    : <video
                        ref={videoRef} 
                        src={currentVideo} 
                        controls 
                        onEnded={onVideoEnded}
                        autoPlay
                        width="100%" 
                        height="100%"
                    />}
            </div>
        </div>
    );
}

export default VideoPlayer;
