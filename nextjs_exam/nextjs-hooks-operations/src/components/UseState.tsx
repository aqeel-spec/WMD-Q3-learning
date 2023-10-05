"use client"
import { useState } from 'react';
import TaskList from '@/lib/useState/TaskList';
import { Task } from '@/lib/types/useState.js';
import  AddTask  from "@/lib/useState/AddTask"

export default function UseStateApp() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(text : string) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  function handleChangeTask(task : Task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId : number) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  return (
    <div className='pt-10 justify-between flex space-y-4 flex-col '>
      <h1 className='text-2xl font-black py-4'>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask}  />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];
