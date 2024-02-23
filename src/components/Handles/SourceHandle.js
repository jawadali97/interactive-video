import { getConnectedEdges,
    Handle,
    useNodeId,
    useStore,
    Position
} from 'reactflow';

const selector = (s) => ({
    nodeInternals: s.nodeInternals,
    edges: s.edges
});

const SourceHandle = ({ id, isConnectable, styles }) => {

    const { nodeInternals, edges } = useStore(selector);
    const nodeId = useNodeId();

    const isValidConnection = (connection) => {
        const node = nodeInternals.get(nodeId);
        const connectedEdges = getConnectedEdges([node], edges);
        return connectedEdges.length ? !connectedEdges.some(edge => edge.sourceHandle === connection.sourceHandle) : true;
    };

    return (
        <Handle
            id={id}
            type='source'
            position={Position.Right}
            style={{...styles, width: 8, height: 8}}
            isConnectable={isConnectable}
            isValidConnection={isValidConnection}
        />
    )
}

export default SourceHandle;