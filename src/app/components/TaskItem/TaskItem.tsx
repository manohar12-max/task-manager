"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import { edit, trash } from "@/app/utils/Icons";
import { Task } from "@prisma/client";
import React from "react";
import styled from "styled-components";
import CreateContent from "../Modals/CreateContent";

interface Props {
  task: {
    title: string;
    description: string;
    date: string;
    isImportant: boolean;
    isCompleted: boolean;
    id: string;
  };
}

const TaskItem: React.FC<Props> = ({ task }) => {
  const { title, description, date, isCompleted, id } = task;
  const { theme, deleteTask, updateTask } = useGlobalState();
  return (
    <TaskItemStyled theme={theme}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{date}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };
              updateTask(task);
            }}
            className="completed"
          >
            Completed
          </button>
        ) : (
          <button
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };
              updateTask(task);
            }}
            className="incomplete"
          >
            Incomplete
          </button>
        )}
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
          className="delete"
        >
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
};
const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};
  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }
  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }
  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }
    .edit {
      margin-left: auto;
    }
    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }
    .completed {
      background: ${(props) => props.theme.colorGreenDark};
    }
  }
`;
export default TaskItem;
