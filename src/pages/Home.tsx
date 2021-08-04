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

  type TasksParams = {
    content: string;
    finished?: boolean;
  }

  const [today, setToday] = useState<TodayParams>(); 
  const [newTask, setNewTask] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [tasks, setTasks] = useState<TasksParams[]>(() => {
    const storageTasks = localStorage.getItem('@myTodoList');
    if(storageTasks) {
      return JSON.parse(storageTasks);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('@myTodoList', JSON.stringify(tasks));
  },[tasks])
  
  useEffect(()=>{
    inputRef.current?.focus();
    handleSetToday();
  },[])

  function handleAddTask(event: FormEvent) {
    event.preventDefault();
    
    if(newTask.trim() === '') {
      return;
    }

    const currentTask = {
      content: newTask,
    }
    
    setTasks([...tasks, currentTask]);
    localStorage.setItem('@myTodoList',JSON.stringify(tasks));

    
    setNewTask('');
    inputRef.current?.focus();
  }

  function handleRemoveTask(event: FormEvent) {
    const contentCurrentTask = event.currentTarget.parentElement?.parentElement?.firstElementChild?.firstElementChild?.innerHTML;
    setTasks(tasks.filter( task => task.content !== contentCurrentTask));
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
              <Task key={index} handleRemoveTask={handleRemoveTask}>{task.content}</Task>
            )
          })
        }
      </aside>
    </div>
  )
}
