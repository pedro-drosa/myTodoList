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
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() =>{
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    handleSetToday();
  }, [])

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
    <>
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
            placeholder="Add Task"
            onChange={event => setNewTask(event.target.value)}
            value={newTask}
          />
          <Button className="button" type="submit">Task</Button>
        </form>
      </main>
      <aside>
        {
          tasks.map((task, index) => {
            return(
              <Task key={index} handleRemoveTask={handleRemoveTask}>{task}</Task>
            )
          })
        }
      </aside>
    </>
  )
}
