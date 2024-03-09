import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import CoursePayModal from '@src/component/CoursePayModal';
import axios, { AxiosResponse } from 'axios';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { zzimState } from '@src/store/store';
import { useRecoilState } from 'recoil';

//react icons
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

export interface arcademiDataList {
  charge: string;
  collectionDb: string;
  creator: string;
  description: string;
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
  isZzim?: boolean;
}

interface Data {
  items: { item: arcademiDataList[] };
  numOfRows: string;
  pageNo: string;
  totalCount: string;
}
const getData = async (pageParam = 1 as number) => {
  const ServiceKeyCode = 'c671764f-6502-411a-b69f-74775d1d6e39';
  try {
    const res = await axios.get('http://api.kcisa.kr/openapi/service/rest/meta2020/getSACAacademy', {
      params: {
        serviceKey: ServiceKeyCode,
        numOfRows: 10,
        pageNo: pageParam,
      },
    });
    return res.data.response.body;
  } catch (e) {
    console.error(e);
  }
};

const Course = () => {
  const [ModalSwitch, setModalSwitch] = useState(false);
  const [keyList, setKeyList] = useState([1]);
  const [page, setPage] = useState(1);
  const [selectZzim, setSelectZzim] = useRecoilState(zzimState);

  // post 함수 Zzim 기능 추가 useMutation 로직
  // const postData = async (addData:arcademiDataList) =>{
  //   const { data } = await axios.post("http://localhost:5000/list", {
  //     addData
  //   });

  //   return data;
  // }
  //   const { mutate } = useMutation(postData, {
  // onMutate: async (newData) => {

  //   await queryClient.cancelQueries(`${page}`);

  //   const previousData = queryClient.getQueryData<arcademiDataList[]>(`${page}`);

  //   queryClient.setQueryData(`${page}`, (oldData) => {
  //     if (!oldData) {
  //       return [];
  //     }

  //     return newData;
  //   });

  //   return { previousData };
  // },

  // onError: (_error, _newData, context) => {
  //   queryClient.setQueryData(`${page}`, context?.previousData);
  // },
  // onSettled: () => {
  //   queryClient.invalidateQueries(`${page}`);
  // },
  // });

  const queryClient = useQueryClient();

  const ModalOpen = useCallback((): void => {
    setModalSwitch(true);
  }, [ModalSwitch]);
  const ModalClose = useCallback((): void => {
    setModalSwitch(false);
  }, [ModalSwitch]);
  const checkZzim = (title: string): Boolean => {
    let idx = selectZzim.findIndex((arr) => {
      return arr.title === title;
    });
    if (idx > -1) {
      return true;
    } else {
      return false;
    }
  };
  const ZzimBtnClick = useCallback(
    (e: React.MouseEvent, list: arcademiDataList) => {
      e.stopPropagation();

      let idx = selectZzim.findIndex((arr) => {
        return arr.title === list.title;
      });
      let newArr: arcademiDataList[];
      if (idx > -1) {
        //있는 경우
        newArr = [...selectZzim];
        newArr.splice(idx, 1);
      } else {
        newArr = [...selectZzim, list];
      }
      setSelectZzim(newArr);
    },
    [selectZzim],
  );
  const zeroChecker = (item: string): string => {
    let target = item.split(' ')[1];
    return target ? item : `${item} 0`;
  };
  const nextFetchBtn = () => {
    let prevCnt = keyList[keyList.length - 1];
    let nextCnt = prevCnt + 1;
    let newArr = [...keyList].concat([nextCnt]);
    setPage(nextCnt);
    return setKeyList(newArr);
  };
  const prevFetchBtn = () => {
    let newArr = [...keyList];
    newArr.pop();
    setPage(page - 1);
    setKeyList(newArr);
  };
  const { isLoading, data } = useQuery<AxiosResponse<Data, any>>(keyList, () => getData(page), {
    staleTime: 60000,
    cacheTime: Infinity,
    keepPreviousData: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(queryClient);
  if (data) {
    console.log(data);

    return (
      <CardBox>
        {data.data.items?.item.map((list, key) => {
          return (
            <ClassCard key={key} onClick={ModalOpen}>
              <ClassName>
                <p>{list.title}</p>
                <ZzimBtn onClick={(e) => ZzimBtnClick(e, list)}>
                  {checkZzim(list.title) ? <AiFillHeart /> : <AiOutlineHeart />}
                </ZzimBtn>
              </ClassName>
              <Charge>
                {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(Number(list.charge))} 원
              </Charge>
              <ClassInfo>
                <Teaching>강사 : {list.person}</Teaching>
                <Direction>위치 : {list.collectionDb}</Direction>
              </ClassInfo>
              <State>
                <Waitting>{zeroChecker(list.state)}</Waitting>
                <GroupExp>{zeroChecker(list.subDescription)}</GroupExp>
              </State>
              <MoreInfo href={list.url}>더 알아보기</MoreInfo>
            </ClassCard>
          );
        })}
        {ModalSwitch && <CoursePayModal onClose={ModalClose} otherClass={true} />}
        <DataControll>
          {page > 1 && <PrevBTN onClick={() => prevFetchBtn()}>Prev</PrevBTN>}
          {Number(data.data.totalCount) > page && <NextBTN onClick={() => nextFetchBtn()}>Next</NextBTN>}
        </DataControll>
      </CardBox>
    );
  }
};
const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
  height: 542px;
  overflow: scroll;
`;
const ClassCard = styled.div`
  margin: 1rem 0;
  padding: 0 1rem;
  width: 30rem;
  max-width: 352px;
  max-height: 180px;
  height: auto;
  box-shadow: 0px 3px 6px #00000029;
`;
const ZzimBtn = styled.span`
  color: red;
`;
const ClassName = styled.div`
  display: flex;
  justify-content: space-around;
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
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
  font-size: 1.3rem;
`;

const Teaching = styled.p`
  margin: 0;
  display: flex;
  justify-content: flex-end;
  color: #93b080;
  font-weight: bolder;
`;
const Direction = styled.p``;
const State = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px 20px;
`;
const Waitting = styled.p`
  padding-right: 50px;
`;
const GroupExp = styled.p``;
const MoreInfo = styled.a`
  float: right;
  margin-right: 21px;
  margin-bottom: 10px;
  color: cornflowerblue;
  text-decoration: underline;
  font-size: 1.25rem;
`;
const DataControll = styled.div``;
const PrevBTN = styled.button``;
const NextBTN = styled.button``;
export default Course;
