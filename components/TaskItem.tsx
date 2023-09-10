import React from 'react';
import { type Task } from "@/types/task";
import { Button } from "@/components/ui/button"


interface TaskItemProps {
  task: Task;
  onDoneClick: (task: Task) => void;
  onDeleteClick: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDoneClick, onDeleteClick }) => {

  return (
    <div className="w-full inline-flex items-center justify-center rounded-md font-medium transition-colors py-2">
      <div className="w-80 flex rounded-md px-3 py-1 text-xl shadow-sm transition-colors break-all">{task.text}</div>
      <div className='px-3 py-1 space-x-1'>

        {!task.isDone ? (
        <Button onClick={() => onDoneClick(task)} className="h-9 bg-green-500">
        Done
        </Button>
        ) : (
          <Button onClick={() => onDoneClick(task)} className="h-9 bg-blue-500">
          Cancel
        </Button>
        )}
        <Button onClick={() => onDeleteClick(task)} className="h-9 bg-red-500">
          Delete
        </Button>

      </div>
    </div>
  );
};

export default TaskItem;