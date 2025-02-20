"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import React from "react";
import { IoIosClose } from "react-icons/io";
import styled from "styled-components";
interface Props {
  content: React.ReactNode;
}
const Modal: React.FC<Props> = ({ content }) => {
  const { closeModal ,theme} = useGlobalState();
  return (
    <ModalStyled theme={theme}>
      <div className="modal-overlay" onClick={closeModal}>
      </div>
      <div className="modal-content">
      <div className="flex justify-between gap-0">
      <div className="w-[100%]">
        {content}
      </div>
      <IoIosClose size={28} onClick={closeModal}  className="cursor-pointer "/>
      </div>
     
      </div>
     
    </ModalStyled>
  );
};

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.45);
    filter: blur(4px);
  }

 .modal-content {
 padding:2rem;
 position:relative;
 max-width:630px;
 width:100%;
 z-index:100;
 border-radius:1rem;
 background-color:${(props)=>props.theme.colorBg2}
 }
`;

export default Modal;
