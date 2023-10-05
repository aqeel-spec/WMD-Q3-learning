"use client"
import React, { useState } from 'react';



type Props = {
  onAddTask: (text: string) => void
}



const AddTask: React.FC<Props> = ({ onAddTask }) => {
  const [text, setText] = useState('');
  return (
    <div className=' '>
      <input
        placeholder="Add task"
        className='mt-2  focus:border focus:border-s-cyan-500 border-sky-500 border-2 '
        value={text}
        onChange={(e) => setText(e.target.value)}

      />
      <button
        className='ml-4 bg-cyan-300 text-black'
        onClick={() => {
          setText('');
          onAddTask(text);
        }}>
        Add
      </button>
    </div>
  );
}

export default AddTask;
