import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Add } from '@mui/icons-material';
import { Fab } from '@mui/material';

import ReactFlow, {
    Controls,
    Background,
    useOnSelectionChange
} from 'reactflow';
import StoryBlock from '../CustomNode/StoryBlock';
import { onNodesChange, addNode, onEdgesChange, onConnect, setSelectedNode } from '../../RTK/slices/nodeSlice';
import { getDefaultNode } from '../../common';
import CustomEdge from '../CustomEdge/CustomEdge';

function Flow() {

    const nodes = useSelector((state) => state.RFState.nodes);
    const edges = useSelector((state) => state.RFState.edges);
    // const selectedNode = useSelector((state) => state.RFState.selectedNode);
    const dispatch = useDispatch();

    const nodeTypes = useMemo(() => ({ storyNode: StoryBlock }), []); // Register our Story block as node type
    const edgeTypes = useMemo(() => ({ customEdge: CustomEdge }), []);

    useOnSelectionChange({
        onChange: ({nodes, edges}) => {
            const selected = nodes.find(node => node.selected);
            dispatch(setSelectedNode(selected));
        }
    })

    const onAddblockClicked = () => {
        const newNode = getDefaultNode();
        dispatch(addNode(newNode));
    }

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
            <ReactFlow
                nodes={nodes}
                nodeTypes={nodeTypes}
                onNodesChange={(changes) => dispatch(onNodesChange(changes))}
                edges={edges}
                edgeTypes={edgeTypes}
                onEdgesChange={(changes) => dispatch(onEdgesChange(changes))}
                onConnect={(params) => dispatch(onConnect(params))}
                selectNodesOnDrag={false}
                onError={(code, message) => console.error('Error:: ', message)}
                // fitView
            >
                <Background />
                <Controls style={{ bottom: '100px', marginLeft: '50px' }} />
            </ReactFlow>
        </div>
    );
}

export default Flow;