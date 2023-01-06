import React from 'react';
import styled from 'styled-components';

const ScheduleCardList = () => {
  const DummyClass = [
    { nth: '4th', day: 'Thr', time: '10:00am-10:50am' },
    { nth: '8th', day: 'Mon', time: '10:00am-10:50am' },
    { nth: '10th', day: 'Wed', time: '13:00pm-13:50pm' },
  ];

  return (
    <Schedule>
      <Month>August</Month>
      {DummyClass.map((data, idx) => {
        const { nth, day, time } = data;
        return (
          <CardList key={idx}>
            <NthCircle>
              <p className="nth">{nth}</p>
              <p className="day">{day}</p>
            </NthCircle>
            <ClassTime>{time}</ClassTime>
          </CardList>
        );
      })}
    </Schedule>
  );
};
const Schedule = styled.div`
  margin: 0.5rem auto;
  width: 323px;
`;
const Month = styled.h1`
  width: 72px;
  height: 34px;
  font-size: 24px;
  color: #93b080;
`;
const CardList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem 0;
  width: 100%;
  height: 86px;
  background-color: #ccdfd5;
`;
const NthCircle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
  border-radius: 35px;
  background-color: #ffffff;
  font-size:1.5rem;
  p {
    margin: 0;
  }
`;
const ClassTime = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 224px;
  height: 66px;
  border-radius: 20px;
  background-color: #ffffff;
  color: #7ac9a1;
  font-size: 24px;
  text-align: center;
`;
export default ScheduleCardList;
