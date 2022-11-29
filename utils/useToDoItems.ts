import { RefObject, useState } from "react";

export const useToDoItems = () => {
  const [tasks, setTasks] = useState<
    { id: number; value: string; done: boolean }[]
  >([]);

  const addToDoItem = (ref: RefObject<HTMLInputElement>) => {
    if (ref.current && ref.current?.value.length) {
      const newTask = ref.current?.value as string;
      const id = Math.floor(Math.random() * 9999);
      setTasks((prev) => [...prev, { id, value: newTask, done: false }]);
      ref.current.value = "";
    }
  };

  const markAsDone = (id: number) => {
    const newTaskList = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(newTaskList);
  };

  const removeToDoItem = (id: number) => {
    const newTaskList = tasks.filter((task) => task.id !== id);
    setTasks(newTaskList);
  };
  return {
    addToDoItem,
    markAsDone,
    removeToDoItem,
    tasks
  }
};
