"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import React from "react";
import styled from "styled-components";
import CreateContent from "../Modals/CreateContent";
import TaskItem from "../TaskItem/TaskItem";
import { plus } from "@/app/utils/Icons";
import Modal from "../Modals/Modal";
import { useUser } from "@clerk/nextjs";

interface Props {
  title: string;
  tasks: any[];
}

const Task: React.FC<Props> =  ({ title, tasks }) => {
  const { theme,loading,openModal,modal } = useGlobalState();

  
  return (
    <TaskStyled theme={theme}>
     {modal && <Modal content={<CreateContent/>}  />}
      <h1>{title}</h1>
      {!loading ? <div className="tasks grid">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={{ ...task }} />
        ))}
        <button  onClick={openModal} className="create-task">
          {plus}
          Add New Task
        </button>
      </div>:(<div className="tasks-loader w-full flex items-center justify-center h-full">
   <span className="loader"></span>
      </div>)}
    </TaskStyled>
  );
};

const TaskStyled = styled.main`

  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  padding: 2rem;
  overflow-y: auto;
  height: 100%;

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;
    text-underline:green;
  text-decoration: underline  ${(props) => props.theme.colorPrimaryGreen};
    text-underline-position: under;
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 16rem;
    color:${(props) => props.theme.colorGrey2};
    font-weight:600,
    cursor:pointer;
    border-radius:1rem;
    border:3px dashed  ${(props) => props.theme.colorGrey5};
    transition:all 0.3s ease;
    &:hover{
      background-color:${(props) => props.theme.colorGrey5};
      color:${(props) => props.theme.colorGrey0};

    }
  }

`;
export default Task;
