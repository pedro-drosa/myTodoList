import { FormEvent, useState, useRef, useEffect } from 'react';
import {format} from 'date-fns';

import { Button } from '../components/Button';
import { Task } from '../components/Task';

import '../styles/home.scss';

export function Home() {

  type TodayParams = {
    day:string;
    dayOfTheWeek:string; 
    mounth:string; 
    year: string;
  }

  const [today, setToday] = useState<TodayParams>(); 
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(()=>{
    inputRef.current?.focus();
    handleSetToday();
  },[])

  function handleAddTask(event: FormEvent) {
    event.preventDefault();
    if(newTask.trim() === '') {
      return;
    }

    setTasks([...tasks, newTask]);
    setNewTask('');
    inputRef.current?.focus();
  }

  function handleRemoveTask(event: FormEvent) {
    const currentTask = event.currentTarget.parentElement?.parentElement;
    currentTask?.remove();

    const taskRemoved = currentTask?.firstChild?.firstChild?.textContent;

    const indexRemoved = tasks.findIndex((task) => {
      return task === taskRemoved;
    });

    const currentTasks = tasks.slice();

    tasks.splice(indexRemoved,1);
    setTasks([...currentTasks]);

    inputRef.current?.focus();
  }

  function handleSetToday() {
    const date = new Date();

    const dateFormatted = {
      day: format(date, 'dd'),
      dayOfTheWeek: format(date, 'EEEE'),
      mounth: format(date, 'LLL').toUpperCase(),
      year: format(date, 'yyyy'),
    }

    setToday(dateFormatted);
  }

  return (
    <div className='content'>
      <header>
        <div>
          <span>{today?.day}</span>
          <ul>
            <li>{today?.mounth}</li>
            <li>{today?.year}</li>
          </ul>
        </div>
        <strong>{today?.dayOfTheWeek}</strong>
      </header>
      <main>
        <form onSubmit={handleAddTask}>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Add a new task"
            onChange={event => setNewTask(event.target.value)}
            value={newTask}
          />
          <Button className="button" type="submit">Add</Button>
        </form>
      </main>
      <aside>
        <h3>Scheduled Tasks</h3>
        {
          tasks.map((task, index) => {
            return(
              <Task key={index} handleRemoveTask={handleRemoveTask}>{task}</Task>
            )
          })
        }
      </aside>
    </div>
  )
}
