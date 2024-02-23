import { createSlice } from '@reduxjs/toolkit';
import { getDefaultEdge, getDefaultNode } from '../../common';

import {
    applyNodeChanges,
    applyEdgeChanges,
    addEdge
} from 'reactflow';

const initialState = {
    nodes: [getDefaultNode(true)],
    selectedNode: null,
    edges: []
};

export const nodeSlice = createSlice({
    name: 'blockNode',
    initialState,
    reducers: {
        removeBlockNode: (state, action) => {
            state.nodes = state.nodes.filter(node => node.id !== action.payload);
            state.selectedNode = null;
        },
        updateNode: (state, action) => {
            state.nodes = state.nodes.map(node => node.id === action.payload.id ? action.payload : node);
            state.selectedNode = action.payload;
        },
        setSelectedNode: (state, action) => {
            state.selectedNode = action.payload;
        },
        onNodesChange: (state, action) => {
            state.nodes = applyNodeChanges(action.payload, state.nodes);
        },
        addNode: (state, action) => {
            state.nodes.push(action.payload);
        },
        onEdgesChange: (state, action) => {
            state.edges = applyEdgeChanges(action.payload, state.edges);
        },
        onConnect: (state, action) => {
            const newEdge = {...getDefaultEdge(), ...action.payload};
            state.edges = addEdge(newEdge, state.edges);
        },
        setEdges: (state, action) => {
            const updatedEdges = state.nodes.map((node) => {
                const { onscreenChoices } = node.data;
                const choices = onscreenChoices.map(choice => choice.id)
                return choices;
            });

            const choicesArray = updatedEdges.flat();
            state.edges = state.edges.filter(edge => choicesArray.some(choice => choice === edge.sourceHandle));
        }
        
    }
});

export const {
    removeBlockNode,
    updateNode,
    setSelectedNode,
    onNodesChange,
    addNode,
    onEdgesChange,
    onConnect,
    setEdges
} = nodeSlice.actions;

export default nodeSlice.reducer;