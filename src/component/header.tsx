import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

//쿼리 파라미터로 제목 바꾸기
const Header = () => {
  const router = useRouter();
  const pathName = router.pathname;
  const [title, setTitle] = useState('Reb Korean');

  const getTitle = (): void => {
    let titleName = 'Reb korean';
    switch (pathName) {
      case '/mypage':
        titleName = 'My Page';
        break;
      case '/course':
        titleName = 'Course';
        break;
      case '/booking':
        titleName = 'Booking';
        break;
      default:
        titleName;
    }

    return setTitle(titleName);
  };
  useEffect(() => {
    getTitle();
  }, []);

  return (
    <Wapper>
      <Title>{title}</Title>
    </Wapper>
  );
};
export default Header;
const Wapper = styled.section`
  width: 100%;
  height: 68px;
  background-color: #7fdfab;
`;
const Title = styled.h1`
  display: flex;
  align-content: center;
  justify-content: space-around;
  margin: 0px;
  padding: 3vh;
  color: white;
  font-size: 3rem;
  font-family: 'Adobe Handwriting Tiffany';
`;
