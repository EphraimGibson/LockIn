import React, { createContext, useContext, useState } from "react";

// Create a context to hold tasks and the function to add tasks
const TaskContext = createContext();

// Create a provider component to wrap the app and provide the task state
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]); // State to hold the list of tasks

  // Function to add a new task to the list
  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]); // Append the new task to the existing list
  };

  // Provide the tasks and addTask function to all children components
  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the TaskContext in any component
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};