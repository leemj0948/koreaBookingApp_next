import React, { useState } from 'react';
import styled from 'styled-components';
// import Modal from '../utilty/Modal';

const Course = () => {
  const [ModalSwitch, setModalSwitch] = useState(false);

  const ClassDetail = [
    {
      name: 'Trial Class',
      option: '$3 / 25 min',
      color: '#E1E9E5',
      detail: 'Lorem ipsum dolor sit amet, consectuetur adipiscing elit, sed',
    },
    {
      name: 'Regular Class',
      option: '$18 / 50 min',
      color: '#FFFFFF',
      detail: 'Lorem ipsum dolor sit amet, consectuetur adipiscing elit, sed',
    },
    {
      name: 'Subscribe Class',
      option: '$15 / 50 min',
      color: '#D1F2E0',
      detail: 'Lorem ipsum dolor sit amet, consectuetur adipiscing elit, sed',
    },
  ];
  return (
    <CardBox>
      {ClassDetail.map((list, key) => {
        return (
          <ClassCard key={key} list={list} onClick={() => setModalSwitch(true)}>
            <ClassName>{list.name}</ClassName>
            <Option>{list.option}</Option>
            <Detail>{list.detail}</Detail>
          </ClassCard>
        );
      })}
      {/* {ModalSwitch && <Modal ModalClose={() => setModalSwitch(false)} />} */}
    </CardBox>
  );
};
const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
`;
const ClassCard = styled.div`
  margin: 1rem 0;
  padding: 0 1rem;
  max-width: 302px;
  max-height: 180px;
  background-color: ${(props) => props.list.color};
  box-shadow: 0px 3px 6px #00000029;
`;
const ClassName = styled.h1``;
const Option = styled.p`
  margin: 0;
  display: flex;
  justify-content: flex-end;
  font-size: 18px;
  color: #93b080;
  font-weight: bolder;
`;
const Detail = styled.p``;
export default Course;
