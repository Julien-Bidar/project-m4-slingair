import React from "react";
import styled from "styled-components";

import { themeVars } from "./GlobalStyles";
import tombstone from "../assets/tombstone.png";

// const stringReservation = localStorage.getItem("session");
// const reservation = JSON.parse(stringReservation);
// const { id, flight, seat, email, givenName, surname } = reservation;

const Confirmation = ({ userReservation }) => {
  const { id, flight, seat, email, givenName, surname } = userReservation;
  return (
    <>
      <Wrapper>
        <ConfWrap>
          <TextConf>
            Your flight is confirmed
            <Line />
          </TextConf>
          <p>
            {" "}
            <ResInfo>Reservation #: </ResInfo>
            {id}
          </p>
          <p>
            {" "}
            <ResInfo>Flight #: </ResInfo>
            {flight}
          </p>
          <p>
            {" "}
            <ResInfo>Seat #: </ResInfo>
            {seat}
          </p>
          <p>
            <ResInfo>Name: </ResInfo> {givenName} {surname}
          </p>
          <p>
            <ResInfo>Email: </ResInfo>
            {email}
          </p>
        </ConfWrap>
      </Wrapper>
      <ImgWrapper>
        <Img src={tombstone} alt="" />
      </ImgWrapper>
    </>
  );
};

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  border: 3px solid ${themeVars.alabamaCrimson};
  border-radius: 5px;
  margin: auto;
  padding: 30px;
`;

const ConfWrap = styled.div``;

const TextConf = styled.p`
  font-size: 24px;
  color: #aa001e;
  font-weight: 600;
`;

const Line = styled.hr`
  border: 1px solid #aa001e;
`;

const ResInfo = styled.span`
  font-weight: 600;
`;

const Img = styled.img`
  width: 250px;
  height: auto;
`;

export default Confirmation;
