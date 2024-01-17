import { useCallback, useEffect, useMemo, useState } from 'react';
import { Add } from '@mui/icons-material';
import { Fab } from '@mui/material';

import ReactFlow, {
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge
} from 'reactflow';
import StoryBlock from '../CustomNode/StoryBlock';

function Flow() {

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const nodeTypes = useMemo(() => ({ storyNode: StoryBlock }), []); // Register our Story block as node type

    const onAddblockClicked = () => {
        console.log('Button clicked..')
        setNodes((preState) => {

            return [...preState, {
                id: `${preState.length + 1}`,
                type: 'storyNode',
                data: {
                    title: `Choice ${preState.length + 1}`,
                    description: `This is choice ${preState.length + 1} and testing with fake sample data. Description only displayed in two lines.`
                },
                position: { x: 100, y: 100 },
            }]
        });
    }

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );

    return (
        <div style={{ height: '100%' }}>
            <Fab color="primary" aria-label="add"
                sx={{
                    position: 'absolute',
                    left: '20px',
                    top: '100px'
                }}
                onClick={onAddblockClicked}
            >
                <Add />
            </Fab>
            <ReactFlow nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
            // fitView
            >
                <Background />
                <Controls style={{ bottom: '100px', marginLeft: '50px' }} />
            </ReactFlow>
        </div>
    );
}

export default Flow;