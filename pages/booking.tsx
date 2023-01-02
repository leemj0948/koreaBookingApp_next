import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// react-icon
import { BsFillCaretLeftFill } from 'react-icons/bs';
import { BsFillCaretRightFill } from 'react-icons/bs';
import BookingDetail from '@src/utility/BookingDetail';

function Booking() {
  const [value, setValue] = useState(new Date());
  const [today, setToday] = useState('');
  const [isDeatail, setIsDeatail] = useState(false);

  const koDtf = new Intl.DateTimeFormat('ko', { dateStyle: 'long' });
  const ClickDay = (value: Date, event) => {
    const ctToday = koDtf.format(new Date());
    const ctValue = koDtf.format(new Date(value));
    console.log(ctToday, ctValue, 'ct');
    if (ctToday === ctValue) {
      // 날짜 디테일 페이지로 이동
      setIsDeatail(true);
    } else {
      console.log(ctValue);
      setToday(ctValue);
    }
  };
  const goCalendar = () => setIsDeatail(false);

  return (
    <div className="calendar_packed">
      {/* selectRange: 여러개 선택하도록 true,false 값  */}
      {isDeatail ? (
        <BookingDetail today={today} goCalendar={goCalendar} />
      ) : (
        <Calendar
          onChange={setValue}
          value={value}
          defaultView="month"
          formatShortWeekday={(locale, date) =>
            new Intl.DateTimeFormat('ko', { weekday: 'short' }).format(new Date(date))
          }
          formatDay={(locale, date) => new Intl.DateTimeFormat('ko', { day: 'numeric' }).format(new Date(date))}
          minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          maxDetail="month"
          next2Label={null}
          prev2Label={null}
          prevLabel={<BsFillCaretLeftFill />}
          nextLabel={<BsFillCaretRightFill />}
          onClickDay={ClickDay}
          tileClassName="class_tile"
          view="month"
          navigationLabel={({ date }) => {
            return new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(date));
          }}
        />
      )}
    </div>
  );
}

export default Booking;
