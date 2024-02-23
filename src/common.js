import { nanoid } from '@reduxjs/toolkit';
import { MarkerType } from 'reactflow';

export const getDefaultNode = (isStartNode=false) => {
    return {
        id: `node-${nanoid()}`,
        type: 'storyNode',
        selected: false,
        data: {
            name: '',
            isStartNode,
            description: '',
            onscreenChoices: [
                {
                    id: `handle-${nanoid()}`,
                    buttonText: ''
                },
                {
                    id: `handle-${nanoid()}`,
                    buttonText: ''
                }
            ],
            onscreenQuestion: {
                question: '',
                hide: false
            },
            media: {
                type: 'video',
                url: '',
                name: ''
            }
        },
        position: isStartNode ? { x: 200, y: 400 } : { x: 100, y: 100 },
    }
}

export const getDefaultEdge = () => {
    return {
        id: `edge-${nanoid()}`,
        type: 'customEdge',
        markerEnd: { type: MarkerType.ArrowClosed }
    }
}
