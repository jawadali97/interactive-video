import { Position, Handle } from "reactflow";

const SourceHandle = ({ id, isConnectable }) => {
    const handleId = `src-handle-${id + 1}`;
    return (
        <Handle
            id={handleId}
            type='source'
            position={Position.Left}
            isConnectable={isConnectable}
        />
    )
}

export default SourceHandle;