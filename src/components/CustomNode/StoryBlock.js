import { useCallback, useState } from 'react';
import SourceHandle from '../Handles/SourceHandle';
import TargetHandle from '../Handles/TargetHandle';

function StoryBlock({ data, isConnectable }) {

  const { description, title } = data;
  const [targetHandles, setTargetHandles] = useState([0]);

  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="story-node">
      <div className='node-content'>
        <div className='node-title'>{title}</div>
        <div className='node-desc'>{description}</div>
      </div>

      <SourceHandle id={1} isConnectable={isConnectable} />

      {targetHandles.map((handle, index) => (
        <TargetHandle
          id={index}
          isConnectable={isConnectable}
        />
      ))}
    </div>
  );
}

export default StoryBlock;