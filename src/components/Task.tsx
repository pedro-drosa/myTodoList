import { FormEvent, useState } from 'react';
import { FiCheck, FiRefreshCw, FiX } from 'react-icons/fi';

import "../styles/task.scss";

type TaskProps = {
  children: string;
  finished?: boolean;
  handleRemoveTask: (event: FormEvent) => void;
  handleCompleteTask: (event: FormEvent) => void;
}

export function Task(props: TaskProps) {

  return(
    <div className={`task ${props.finished ? 'complete' : ''}`}>
      <div id="task-description">
        <p>{props.children}</p>
      </div>
      <div id="task-options">
        <button onClick={props.handleCompleteTask}>
          {
            props.finished ? <FiRefreshCw/> : <FiCheck/>
          }
        </button>
        <button onClick={props.handleRemoveTask}>
          <FiX/>
        </button>
      </div>    
    </div>
  )
}