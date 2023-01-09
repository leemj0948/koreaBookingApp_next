import React, { useState } from 'react';
import styled from 'styled-components';
import CoursePayModal from '@src/component/CoursePayModal';
import axios,{ AxiosResponse }  from 'axios';
import { useInfiniteQuery, useQuery } from 'react-query';
import Link from 'next/link';

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

interface Data{
    item:arcademiDataList[];
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
// const getDateList = async ():Promise<AxiosResponse<Data>>=>{
//   const ServiceKeyCode = 'c671764f-6502-411a-b69f-74775d1d6e39'
//   const res = await axios.get('http://api.kcisa.kr/openapi/service/rest/meta2020/getSACAacademy',{
//     params:{
//       serviceKey:ServiceKeyCode,
//       numOfRows:10,
//       pageNo:1
//     }
//   })
//   console.log(res.data.response.body.items)
//   return res.data.response.body.items
// }
const zeroChecker = (item:string):string =>{
  let target = item.split(' ')[1];
  return target?item:`${item} 0`
}
const getData = async ({pageParam = 1})=>{
  const ServiceKeyCode = 'c671764f-6502-411a-b69f-74775d1d6e39'
  const res = await axios.get('http://api.kcisa.kr/openapi/service/rest/meta2020/getSACAacademy',{
    params:{
      serviceKey:ServiceKeyCode,
      numOfRows:10,
      pageNo:pageParam
    }
  })
  console.log(res,pageParam);
  return res.data.response.body
}
const InfinityRes = useInfiniteQuery('List',getData,{getNextPageParam:(lastPage,allPages)=>{
  return Number(lastPage.pageNo)+1
}});
// const res = useQuery('DataList',getDateList)

if(InfinityRes.isLoading){
    return (<div>Loading...</div>)
}

if(InfinityRes.data){
   console.log(InfinityRes.data.pages,'InfinityRes');
  
    return (
        <CardBox>
          {InfinityRes.data.pages.map(
            (lists) => {
              return (
                lists.items.item.map((list :arcademiDataList, key:number)=>{
                  return (
                    
                    <ClassCard key={key} onClick={ModalOpen}>
                      <ClassName>{list.title}</ClassName>
                      <Charge>{new Intl.NumberFormat('ko-KR',{style:'currency',currency:'KRW'}).format(Number(list.charge))} 원</Charge>
                      <ClassInfo>
                        <Teaching>강사 : {list.person}</Teaching>
                        <Direction>위치 : {list.collectionDb}</Direction>
                      </ClassInfo>
                      <State>
                        <Waitting>{zeroChecker(list.state)}</Waitting>
                        <GroupExp>{zeroChecker(list.subDescription)}</GroupExp>
                      </State>
                      <MoreInfo href={list.url}>
                        더 알아보기
                      </MoreInfo>
                    </ClassCard>
                     )
                    
                  }
              )
            
              )})}
                {ModalSwitch && <CoursePayModal onClose={ModalClose} />}
              <NextBTN onClick={()=>InfinityRes.fetchNextPage()}>Next</NextBTN>
          </CardBox>
            )
            }};
const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
  height:542px;
  overflow:scroll;
`;
const ClassCard = styled.div`
  margin: 1rem 0;
  padding: 0 1rem;
  width:30rem;
  max-width: 352px;
  max-height: 180px;
  height: auto;
  box-shadow: 0px 3px 6px #00000029;
`;
const ClassName = styled.h1`
  padding-top: 1rem;
  font-size: 1.75rem;
  font-weight: bold;
`;
const Charge = styled.div`
text-align: right;
padding: 10px 30px 0;
font-size: 1.25rem;
color: forestgreen;
`;
const ClassInfo = styled.div`
display:flex;
justify-content: space-around;
padding-top:10px;
font-size: 1.3rem;

`;

const Teaching = styled.p`
  margin: 0;
  display: flex;
  justify-content: flex-end;
  color: #93b080;
  font-weight: bolder;
`;
const Direction = styled.p`
  
`;
const State = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px 20px;
`;
const Waitting = styled.p`
padding-right:50px;`;
const GroupExp = styled.p``;
const MoreInfo = styled.a`
  float: right;
    margin-right: 21px;
    margin-bottom: 10px;
    color:cornflowerblue;
    text-decoration: underline;
    font-size: 1.25rem;
`;
const NextBTN = styled.button``;
export default Course;
