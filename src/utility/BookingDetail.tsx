import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsFillXCircleFill } from 'react-icons/bs';

interface propsType {
  today: string;
  goCalendar: () => void;
}

const BookingDetail = (props: propsType) => {
  const { today, goCalendar } = props;
  console.log(today, 'pro', props);
  const schedule = [
    { time: '09am - 10am', isClass: false },
    { time: '10am - 11am', isClass: false },
    { time: '11am - 12am', isClass: false },
    { time: '12am - 1pm', isClass: false },
    { time: '1pm - 2pm', isClass: false },
    { time: '2pm - 3pm', isClass: true },
    { time: '3pm - 4pm', isClass: false },
    { time: '4pm - 5pm', isClass: false },
    { time: '5pm - 6pm', isClass: false },
    { time: '6pm - 7pm', isClass: false },
  ];
  const [schedules, setSchedules] = useState(schedule);
  const [headDate, setHeadDate] = useState('');

  const changeDate = (todays: string): string => {
    const customMonth = new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(todays));
    const customDay = new Intl.DateTimeFormat('ko', { day: 'numeric' }).format(new Date(todays));
    return `${customMonth}. ${customDay}`;
  };

  const clickSchedule = (timeIdx: number) => {
    let schaduleData = schedules[timeIdx];
    const shadulesCopy = [...schedules];

    if (schaduleData.isClass) {
      if (window.confirm('수업을 취소하겠습니까?')) {
        schaduleData = { ...schaduleData, isClass: false };
        shadulesCopy[timeIdx] = schaduleData;
      }
    } else {
      if (window.confirm('이 시간으로 예약하시겠습니까?')) {
        schaduleData = { ...schaduleData, isClass: true };
        shadulesCopy[timeIdx] = schaduleData;
      }
    }

    return setSchedules(shadulesCopy);
  };
  useEffect(() => {
    console.log(today);
    setHeadDate(changeDate(today));
  }, []);

  return (
    <Wapper>
      <GoBack>
        <BsFillXCircleFill onClick={() => goCalendar()} />
      </GoBack>

      <SelectDate>{headDate}</SelectDate>
      <DayDetail>
        {schedules[0] &&
          schedules.map((list, idx) => {
            return (
              <TimeSet key={idx}>
                <HourChart>{list.time}</HourChart>
                <ActiveChart isClassStyle={list.isClass} onClick={() => clickSchedule(idx)} />
              </TimeSet>
            );
          })}
      </DayDetail>
    </Wapper>
  );
};
export default BookingDetail;
const Wapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const GoBack = styled.div`
  position: absolute;
  left: 2rem;
  svg {
    font-size: 1.5rem;
  }
`;
const SelectDate = styled.h1`
  color: #7fdfab;
  size: 32px;
`;
const DayDetail = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 75%;
`;
const TimeSet = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 0.25rem;
`;
const HourChart = styled.div`
  width: 100px;
  color: #7fdfab;
  size: 14px;
  text-align: left;
`;
const ActiveChart = styled.div`
  width: 150px;
  height: 24px;
  background-color: ${(props) => (props.isClassStyle ? '#B9DF7F' : '#defcec')};
`;
