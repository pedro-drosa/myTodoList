import { FormEvent, useState } from 'react';
import { FiCheck, FiRefreshCw, FiX } from 'react-icons/fi';

import "../styles/task.scss";

type TaskProps = {
  children: string;
  handleRemoveTask: (event: FormEvent) => void;
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
        <button onClick={props.handleRemoveTask}>
          <FiX/>
        </button>
      </div>    
    </div>
  )
}