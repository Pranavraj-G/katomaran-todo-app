import React, { createContext, useContext, useState } from 'react';
import uuid from 'react-native-uuid';

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  remindMe: string | null;
  repeat: 'none' | 'daily' | 'weekly';
  isStarred: boolean;
  isCompleted: boolean;
  createdAt: string;
};

type TaskInput = Omit<Task, 'id' | 'createdAt'>;

type TaskContextType = {
  tasks: Task[];
  addTask: (task: TaskInput) => void;
  deleteTask: (id: string) => void;
  toggleStar: (id: string) => void;
  toggleComplete: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: TaskInput) => {
    const newTask: Task = {
      ...task,
      id: uuid.v4() as string,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleStar = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isStarred: !t.isStarred } : t
      )
    );
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, toggleStar, toggleComplete }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used inside TaskProvider');
  }
  return context;
};
