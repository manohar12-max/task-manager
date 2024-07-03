"use client";
import React from "react";
import { useGlobalState } from "../context/globalProvider";
import Task from "../components/Tasks/Task";

const page = () => {
  const { incompleteTask } = useGlobalState();
  return <Task title="Important Task" tasks={incompleteTask} />;
};

export default page;
