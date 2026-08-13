import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";


const Modal = (props) => {
  // Render the modal overlay into document.body to avoid being clipped
  // by parent stacking contexts (transforms) and to cover the full viewport.
  const content = (
    <Container onClick={props.close}>
      {props.children}
    </Container>
  );

  if (typeof document !== "undefined") {
    return createPortal(content, document.body);
  }

  return content;
};

const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.4s;
`;

export default Modal;
