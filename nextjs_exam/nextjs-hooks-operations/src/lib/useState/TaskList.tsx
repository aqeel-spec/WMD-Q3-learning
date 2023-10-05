"use client"
import { useState } from 'react';
import { Task } from '../types/useState';


type TasksList = {
    tasks : Task[],
    onChangeTask : (task : Task) => void;
    onDeleteTask : (id : number) => void;   
}
type Tasks = {
    task : Task,
    onChange : (task : Task) => void;
    onDelete : (id : number) => void;   
}

export default function TaskList({tasks, onChangeTask, onDeleteTask} : TasksList ) {
  return (
    <ul className='  text-base space-y-2'>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

function Task({task, onChange, onDelete}: Tasks) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <div className=''>
        <input
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)} className='bg-red-500'>Save</button>
      </div>
    );
  } else {
    taskContent = (
      <div className=' bg-red-500 text-green-500 '>
        {task.text}
        <button onClick={() => setIsEditing(true)} className=' bg-cyan-500 px-6 py-2 rounded-md   '>Edit</button>
      </div>
    );
  }
  return (
    <label className=' text-blue-500 '>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}
