import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Modal from '../utility/Modal';

// react-icon
import { FaWindowClose } from 'react-icons/fa';

interface Iprops {
  onClose: () => void;
  otherClass?: boolean | undefined;
  title?: string;
  totalPay?: string;
}
const BodyChanger = (isOtherClass = false, props: Iprops) => {
  if (isOtherClass) {
    return (
      <>
        <BodyHeader>{props.title}</BodyHeader>
        <BodyMain>
          <p>$15*10 class</p>
          <p>$150.00</p>
          <p>tax(10%)</p>
          <p>{Number(props.totalPay) * 0.1}</p>
          <p>total</p>
          <p>{props.totalPay}</p>
        </BodyMain>
      </>
    );
  } else {
    return (
      <>
        <BodyHeader>$ 150.00</BodyHeader>
        <BodyMain>
          <p>$15*10 class</p>
          <p>$150.00</p>
          <p>tax(10%)</p>
          <p>$15.00</p>
          <p>total</p>
          <p>$165.00</p>
        </BodyMain>
      </>
    );
  }
};

const CoursePayModal = (props: Iprops) => {
  return (
    <Modal onClose={props.onClose}>
      <Header>
        <FaWindowClose className="close_button" onClick={props.onClose} />
      </Header>
      <Body>{BodyChanger(props.otherClass, props)}</Body>
      <Footer>
        <PayButton href="/pay/paySuccess">Pay</PayButton>
      </Footer>
    </Modal>
  );
};
const Header = styled.div`
  padding: 0.5rem;
  height: 10%;
  .close_button {
    width: 2rem;
    height: 2rem;
    float: right;
    color: #a7f1c9;
    &:hover {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`;
const Body = styled.div`
  height: 70%;
`;
const BodyHeader = styled.div`
  display: flex;
  justify-content: center;
  font-size: 40px;
  font-weight: bolder;
`;
const BodyMain = styled.div`
  display: grid;
  margin-top: 2rem;
  grid-template-columns: 50% 35%;
  padding: 2rem;
  height: 80%;
  justify-content: space-between;
  justify-items: start;
  align-items: center;
  font-size: 2rem;
`;
const Footer = styled.div`
  display: flex;
  justify-content: center;
`;
const PayButton = styled(Link)`
  position: relative;
  border: none;
  display: inline-block;
  text-align: center;
  padding-top: 0.8rem;
  border-radius: 15px;
  width: 7rem;
  height: 3rem;
  font-family: 'paybooc-Light', sans-serif;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
  background-color: #77af9c;
  font-size: 17px;
  color: #d7fff1;
  &:hover {
    font-size: 22px;
    width: 7.5rem;
    height: 3.2rem;
  }
`;
export default CoursePayModal;
