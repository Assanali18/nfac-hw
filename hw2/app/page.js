"use client";

import { useEffect, useState } from 'react';
import TaskList from "@/app/components/TaskList";
import {log} from "next/dist/server/typescript/utils";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    setIsLoaded(true)
  }, []);

  useEffect(() => {
      if(isLoaded){
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
  }, [isLoaded, tasks]);

  const handleAddTask = () => {
    if (inputValue) {
      const newTask = { id: Date.now(), text: inputValue, completed: false };
      setTasks(prevTasks => [...prevTasks, newTask]);
      setInputValue('');
    }
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClearCompleted = () => {
    const filteredTasks = tasks.filter(task => !task.completed);
    console.log(filteredTasks)
    setTasks(filteredTasks);
  };

  return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">TODO</h1>
        </div>
        <div className="mb-4 flex items-center">
          <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
              placeholder="What to do ?"
          />
          <button
              onClick={handleAddTask}
              className="bg-blue-500 text-white p-4 rounded ml-4"
          >
            Add Task
          </button>
        </div>
        <TaskList tasks={tasks} filter={filter} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span>{tasks.filter(task => !task.completed).length} items left</span>
          <div>
            <button onClick={() => setFilter('all')} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
            <button onClick={() => setFilter('active')} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
            <button onClick={() => setFilter('completed')} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
          </div>
          <button
              onClick={handleClearCompleted}
              className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
  );
}
