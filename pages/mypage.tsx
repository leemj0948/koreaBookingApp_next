import React from 'react';
import styled from 'styled-components';
import ScheduleCardList from '@src/utility/ScheduleCardList';

const MyPage = () => {
  return (
    <BodyZone>
      <Profile>
        <ProfileImg>
          <img
            className="profile_img"
            src="https://i0.wp.com/newdoorfiji.com/wp-content/uploads/2018/03/profile-img-1.jpg?ssl=1"
            alt="profileImg"
          />
        </ProfileImg>

        <ProfileText>
          <p className="name">Rachel</p>
          <p className="class">Prepaid 10 Class</p>
          <p className="booked">3 class booked</p>
        </ProfileText>
      </Profile>
      <h1 className="booking_list">Booking List</h1>
      <ScheduleCardList />
    </BodyZone>
  );
};
const BodyZone = styled.section`
  margin: 0;
  max-width: 375px;
  height: 542px;
  overflow: scroll;
  .booking_list {
    font-size: 2.5rem;
    color: #7fdfab;
    text-align: center;
  }
`;
const Profile = styled.div`
  display: grid;
  grid-template-columns: 35% auto;
  margin: 1.5rem auto;
  border-radius: 32px;
  width: 320px;
  height: 110px;
  background-color: #c4ebd6;
`;
const ProfileImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 74px;
    height: 74px;
    border-radius: 37px;
  }
`;
const ProfileText = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 33% 33% 33%;
  p {
    margin: 0;
  }
  padding: 15px;
  font-size: 20px;
  font-family: Brandon Grotesque, Regular;
`;

export default MyPage;
