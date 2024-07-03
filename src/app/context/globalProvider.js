"use client";
import { createContext, useState, useContext, useEffect } from "react";
import themes from "./theme";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user } = useUser();
  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme];
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };

  const allTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/task");
      if (res.data.error) {
        toast.error(res.data.error);
        return;
      }
      setTasks(res.data);
    } catch (e) {
      toast.error("Something went wrong");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`/api/task/${id}`);
      toast.success("Task deleted");
      allTasks();
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const updateTask = async (task) => {
    
    try {
      const res = await axios.put(`/api/task`,task);
      toast.success("Task updated successfully");
      allTasks();
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };
  const completedTask=tasks?.filter(task => task.isCompleted==true)
  const importantTask=tasks?.filter(task => task.important==true)
const incompleteTask=tasks?.filter(task => task.isCompleted === false)


const openModal = () => {
  setModal(true);
};

const closeModal = () => {
  setModal(false);
};


  useEffect(() => {
    if (user) allTasks();
  }, [user]);
  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        loading,
        completedTask,
        importantTask,
        incompleteTask,
        updateTask,
        modal,
        openModal,
        closeModal,
        allTasks,
        collapsed,
        collapseMenu
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);

export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
