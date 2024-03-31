import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, Grid } from '@mui/material';
import './styles.css'
import Player from './Player';
import Draggable from 'react-draggable';

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
        <Draggable>
            <Dialog
                open={open}
                onClose={handleClose}
                hideBackdrop={true}
                fullWidth={true}
                maxWidth="xl"
                sx={{ overflowY: 'hidden' }}>
                <Grid container
                    columns={12}
                    rowSpacing={0}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}
                    sx={{
                        height: "55rem",
                        p: "0.5rem",
                        borderRadius: 5,
                    }}>

                    <Grid item
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%"
                        }}>
                        <button className='close-btn' onClick={handleClose}>X</button>
                    </Grid>

                    <Grid item xs={11}
                        sx={{ width: "100%" }}>
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
                    </Grid>
                </Grid>
            </Dialog>
        </Draggable>


        
    );
}

export default VideoPlayer;
