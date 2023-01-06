import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';

// react-icon
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import { AiFillMail } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
const Footer = () => {
    const goMypage = ():Promise<boolean> =>{
        return (Router.push ('/mypage'));
    }
  return (
    <FooterSection>
      <IconBox>
        <BsFillMenuButtonWideFill className="menu-icon" />
        <AiFillMail className="message" />
        <FaUserCircle
          className="profile"
          onClick={goMypage}
        />
      </IconBox>
    </FooterSection>
  );
};
const FooterSection = styled.section`
  height: 56px;
  background-color: #7fdfab;
`;
const IconBox = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  width: 100%;
  color: #ffffff;
  svg {
    height: 1.5em;
    width: 1.25em;
  }
  .menu-icon {
    size: 24px;
  }
`;

export default Footer;
