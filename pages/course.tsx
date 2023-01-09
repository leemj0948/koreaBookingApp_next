import React, { useState } from 'react';
import styled from 'styled-components';
import CoursePayModal from '@src/component/CoursePayModal';
import axios,{ AxiosResponse }  from 'axios';
import { useQuery } from 'react-query';

interface ClassList {
  name: string,
  option:string,
  color:string,
  detail:string
}
interface arcademiDataList{
charge: string;
collectionDb: string;
creator: string;
description:string;
grade: string;
person: string;
publisher: string;
regDate: string;
spatialCoverage: string;
state: string;
subDescription: string;
temporalCoverage: string;
title: string;
url: string;
}

const Course = ()=> {
  const [ModalSwitch, setModalSwitch] = useState(false);
  const [arcademiList,setArcademiList]= useState([]);
  const ModalOpen = (): void => {
    setModalSwitch(true);
  };
  const ModalClose = (): void => {
    setModalSwitch(false);
  };
const getDateList = async ():Promise<AxiosResponse<arcademiDataList>>=>{
  const ServiceKeyCode = 'c671764f-6502-411a-b69f-74775d1d6e39'
  const res = await axios.get('http://api.kcisa.kr/openapi/service/rest/meta2020/getSACAacademy',{
    params:{
      serviceKey:ServiceKeyCode,
      numOfRows:10,
      pageNo:1
    }
  })
  console.log(res.data.response.body.items)
  return res.data.response.body.items
}
const res = useQuery('DataList',getDateList)

  const ClassDetail:ClassList[] = [
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
          <ClassCard key={key} list={list} onClick={ModalOpen}>
            <ClassName>{list.name}</ClassName>
            <Option>{list.option}</Option>
            <Detail>{list.detail}</Detail>
          </ClassCard>
        );
      })}
      {ModalSwitch && <CoursePayModal onClose={ModalClose} />}
    </CardBox>
  );
};
const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
  height:542px;
`;
const ClassCard = styled.div`
  margin: 1rem 0;
  padding: 0 1rem;
  max-width: 302px;
  max-height: 180px;
  height: 10rem;
  background-color: ${(props) => props.list.color};
  box-shadow: 0px 3px 6px #00000029;
`;
const ClassName = styled.h1`
  padding-top: 1rem;
  font-size: 2.5rem;
  font-weight: bold;
`;
const Option = styled.p`
  margin: 0;
  display: flex;
  justify-content: flex-end;
  font-size: 1.5rem;
  color: #93b080;
  font-weight: bolder;
`;
const Detail = styled.p`
  padding-top: 0.5rem;
  font-size: 1.3rem;
`;
export default Course;
