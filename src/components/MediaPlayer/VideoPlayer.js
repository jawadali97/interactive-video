import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '@mui/material';
import './styles.css'
import Player from './Player';

function VideoPlayer({open, handleClose}) {
    const nodes = useSelector(state => state.RFState.nodes);
    const edges = useSelector(state => state.RFState.edges);

    const [currentVideo, setCurrentVideo] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [currentNode, setCurrentNode] = useState({});

    useEffect(() => {
        const startNode = nodes.find(node => node.data.isStartNode);
        setCurrentNode(startNode);
        if (startNode) {
            setCurrentVideo(startNode.data.media.url);
        }
    }, []);

    const displayChoices = () => {
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
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className='player'>
                <button className='close-btn' onClick={handleClose}>X</button>
                <div style={{ width: '100%', height: '100%'}}>
                    <Player
                        url={currentVideo}
                        displayChoices={displayChoices}
                        setShowOptions={setShowOptions}
                    />
                    {showOptions && (
                        <div className='btns-container'>
                            <div className='wrap-question'>
                            {!currentNode?.data?.onscreenQuestion?.hide && <div className='qst-div'>{currentNode?.data?.onscreenQuestion?.question}</div>}
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
        </Modal>
    );
}

export default VideoPlayer;
