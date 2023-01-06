import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>KoreaBookingApp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainBody>
        <BackgroundImg>
          <Title>I am here to help you guys.</Title>
          <NextButton href="/course">
            <ArrowContainer>
              <ArrowHead />
              <ArrowTail />
            </ArrowContainer>
          </NextButton>
        </BackgroundImg>
      </MainBody>
    </div>
  );
};

export default Home;

const MainBody = styled.section`
  margin: 0;
  max-width: 375px;
  height: 542px;
  overflow: scroll;
`;
const BackgroundImg = styled.section`
  height: 100%;
  background-size: 100%;
  background-image: url('/img/bg.jpeg');
`;
const Title = styled.p`
  margin: 0;
  padding: 20% 0;
  font-size: 1.5rem;
  text-align: center;
  color: #ffffff;
`;
const NextButton = styled(Link)`
  position: relative;
  top: 45%;
`;
const ArrowContainer = styled.div`
  position: relative;
  width: 65px;
  height: 65px;
  left: 65%;
  transform: rotate(136deg);
`;
const ArrowHead = styled.div`
  width: 50px;
  height: 32px;
  border: solid white;
  border-width: 0px 0 0 3px;
  left: 0;
  top: 0;
`;
const ArrowTail = styled.div`
  width: 130px;
  height: 4px;
  background-color: white;
  position: absolute;
  transform: rotate(45deg);
  transform-origin: left;
  left: 0;
  top: 0;
`;
