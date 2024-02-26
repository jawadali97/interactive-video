import { useEffect } from 'react';
import SourceHandle from '../Handles/SourceHandle';
import TargetHandle from '../Handles/TargetHandle';
import { nanoid } from '@reduxjs/toolkit';
import {
  useUpdateNodeInternals
} from 'reactflow';

function StoryBlock({ id, data, isConnectable, selected }) {
  
  const { description, name, isStartNode, onscreenChoices } = data;
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeInternals(id);
  }, [JSON.stringify(onscreenChoices), updateNodeInternals])

  const getHandleStyle = (index) => {
    const numOfHandles = onscreenChoices.length;
    const h4 = [20, 40, 60, 80];
    const h3 = [20, 50, 80];
    const h2 = [30, 70];

    if (numOfHandles === 4) {
        return {top: h4[index]}
    } else if (numOfHandles === 3) {
        return {top: h3[index]}
    } else if (numOfHandles === 2) {
       return {top: h2[index]}
    }
  }

  return (
    <>
    <div className="story-node" style={{borderColor: selected && '#0074e6'}}>

      {isStartNode && <div className='start-text'>start</div>}
      <div className='node-content'>
        <div className='node-title'>
          {name || <span style={{color: 'grey'}}>Name</span>}
        </div>
        <div className='node-desc'>
          {description || <span style={{color: 'grey'}}>Description</span>}
        </div>
      </div>

    </div>

    {!isStartNode && <TargetHandle id={nanoid()} isConnectable={isConnectable} />}

      {onscreenChoices.map((choice, index) => (
          <SourceHandle
            key={choice.id}
            id={choice.id}
            isConnectable={isConnectable}
            styles={getHandleStyle(index)}
            tooltipTitle={`${index + 1} ${choice.buttonText && ` > ${choice.buttonText}`}`}
          />
      ))}
    </>
  );
}

export default StoryBlock;