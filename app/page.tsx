"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TaskItem from '@/components/TaskItem';
import { useState, useRef } from "react";
import { type Task } from "@/types/task";
import { Separator } from "@/components/ui/separator";

export default function Home() {  

  const [tasks, setTasks] = useState<Task[]>([])

  const inputRef = useRef<HTMLInputElement | null>(null);

  const updateTaskList = (task: Task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }

  function createTaskButtonHandler() {
    const title = inputRef.current?.value;
    if (!title) return;
    const maxId = Math.max(...tasks.map(task => task.id), 0);
    const newTask: Task = {id: maxId + 1,text: title, isDone: false};
    updateTaskList(newTask);
  }

  const handleDoneClick = (taskToUpdate: Task) => {
    const updatedTasks = tasks.map((task) => {
      if (task === taskToUpdate) {
        return { ...task, isDone: !task.isDone };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteClick = (taskToDelete: Task) => {
    const updatedTasks = tasks.filter((task) => task !== taskToDelete);
    setTasks(updatedTasks);
  };

  console.log(tasks);
  console.log(tasks.filter((task) => task.isDone));
  console.log(tasks.filter((task) => !task.isDone));

  return (
    <main className="bg-custom flex min-h-screen space-y-8 flex-col justify-start items-center p-24">

    <h1 className="text-5xl font-bold m-2 p-4">Your To Do List</h1>

    <div className="flex w-full max-w-sm items-center space-x-2">

      <Input ref={inputRef} maxLength={70} className="h-12 text-lg" placeholder="Enter new task..." />

      <Button className="h-12 text-lg" onClick={() => createTaskButtonHandler()}>
         Add
      </Button>

    </div>

    <div className="space-y-2">
      {tasks.filter((task) => !task.isDone).map((task: Task) => (
        <TaskItem task={task} onDoneClick={handleDoneClick} onDeleteClick={handleDeleteClick}></TaskItem>
      ))}
    </div>

    {tasks.filter((task) => task.isDone).length != 0 ? (
      <div className='w-72 space-y-2 items-center'>
        <div className='text-center rounded-md px-3 py-1 text-xl shadow-sm transition-colors'>Complited</div>
      </div>
      ) : ('')}

    <div className="space-y-2">
      {tasks.filter((task) => task.isDone).map((task: Task) => (
        <TaskItem task={task} onDoneClick={handleDoneClick} onDeleteClick={handleDeleteClick}></TaskItem>
      ))}
    </div>

    </main>
    
  )

}
