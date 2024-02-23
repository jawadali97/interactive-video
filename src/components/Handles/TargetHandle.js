import { Position, Handle } from "reactflow";

const TargetHandle = ({ id, isConnectable, styles }) => {
    return (
        <Handle
            id={id}
            type='target'
            position={Position.Left}
            style={{width: 8, height: 8}}
            isConnectable={isConnectable}
        />
    )
}

export default TargetHandle;