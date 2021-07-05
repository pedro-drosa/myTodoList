import { useState } from 'react';
import { FiCheck, FiRefreshCw } from 'react-icons/fi';

import "../styles/task.scss";

type TaskProps = {
  children: string;
}

export function Task(props: TaskProps) {
  const [complete, setComplete] = useState<boolean>(false);

  function handleComplete() {
    setComplete(!complete);
  }

  return(
    <div className={`task ${complete ? 'complete' : ''}`}>
      <div id="task-description">
        <p>{props.children}</p>
      </div>
      <div id="task-options">
        <button onClick={handleComplete}>
          {
            complete ? <FiRefreshCw/> : <FiCheck/>
          }
        </button>
      </div>    
    </div>
  )
}