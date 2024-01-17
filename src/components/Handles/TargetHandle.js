import { Position, Handle } from "reactflow";

const TargetHandle = ({ id, isConnectable }) => {
    const handleId = `target-handle-${id + 1}`;
    return (
        <Handle
            id={handleId}
            type='target'
            position={Position.Right}
            // style={{ top: 10 }}
            isConnectable={isConnectable}
        />
    )
}

export default TargetHandle;