import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface ModalProps {
  onClose: () => void;
}
const BackDrop = (props: ModalProps) => {
  return <BackDrops onClick={props.onClose} />;
};

const ModalOverlay = ({ children }: PropsWithChildren) => {
  return (
    <ModalOL>
      <Content>{children}</Content>
    </ModalOL>
  );
};
const Modal = (props: PropsWithChildren<ModalProps>) => {
  const PositionTag = document.getElementById('_modal');
  if (PositionTag === null) {
    return <div></div>;
  }
  return (
    <>
      {ReactDOM.createPortal(<BackDrop onClose={props.onClose} />, PositionTag)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, PositionTag)}
    </>
  );
};
export default Modal;

const BackDrops = styled.div`
  position: fixed;
  background-color: black;
  opacity: 0.3;
  width: 100%;
  height: 100vh;
`;
const ModalOL = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80vh;
  background-color: white;
`;
const Content = styled.div`
  height: 100%;
  width: 100%;
`;
