import React, {useEffect, useState} from 'react';
import TaskItem from '../TaskItem';

const TaskList = ({tasks, onToggle, onDelete, filter}) => {

    const [filteredTasks, setFilteredTasks] = useState(tasks);

    useEffect(()=>{
        switch (filter) {
            case 'active':
                setFilteredTasks(tasks.filter(task => !task.completed));
                break;
            case 'completed':
                setFilteredTasks(tasks.filter(task => task.completed));
                break;
            case 'all':
            default:
                setFilteredTasks(tasks);
                break;
        }
    }, [filter, tasks])





  return (
      <ul className="bg-gray-800 rounded p-4">
        {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete}/>
        ))}
      </ul>
  );
};

export default TaskList;
