import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import tombstone from "../assets/tombstone.png";
import { themeVars } from "./GlobalStyles";

const Reservation = () => {
  const [value, setValue] = useState("");
  const [resInformation, setResInformation] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    value === "" ? setDisabled(true) : setDisabled(false);
  }, [value, setValue]);

  const handleInput = (ev) => {
    const id = ev.target.value;
    setValue(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue("");
    fetch(`/reservations/${value}`)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        const resInfo = data.reservation[0];
        console.log(resInfo);
        setResInformation(resInfo);
        setStatus("ok");
      })
      .catch((err) => {
        console.log(err);
        setStatus("err");
      });
  };

  return (
    <>
      <FormWrapper>
        <InpBtn>
          <form>
            <Input
              onChange={handleInput}
              value={value}
              type="text"
              placeholder="enter your reservation number"
            />
            <Button onClick={handleSubmit} type="submit" disabled={disabled}>
              check status
            </Button>
          </form>
        </InpBtn>
      </FormWrapper>
      {status === "ok" && (
        <>
          <Wrapper>
            <ConfWrap>
              <TextConf>
                Here is the information for your reservation
                <Line />
              </TextConf>
              <p>
                {" "}
                <ResInfo>Reservation #: </ResInfo>
                {resInformation.id}
              </p>
              <p>
                {" "}
                <ResInfo>Flight #: </ResInfo>
                {resInformation.flight}
              </p>
              <p>
                {" "}
                <ResInfo>Seat #: </ResInfo>
                {resInformation.seat}
              </p>
              <p>
                <ResInfo>Name: </ResInfo> {resInformation.givenName}{" "}
                {resInformation.surname}
              </p>
              <p>
                <ResInfo>Email: </ResInfo>
                {resInformation.email}
              </p>
            </ConfWrap>
          </Wrapper>
          <ImgWrapper>
            <Img src={tombstone} alt="" />
          </ImgWrapper>
        </>
      )}
      {status === "err" && (
        <>
          <Wrapper>
            <ConfWrap>
              <TextConf>
                We couldn't find your reservation number
                <Line />
              </TextConf>
            </ConfWrap>
          </Wrapper>
        </>
      )}
    </>
  );
};

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const InpBtn = styled.div`
  position: relative;
`;

const Input = styled.input`
  font-size: 18px;
  width: 300px;
  margin-right: 15px;
`;

const Button = styled.button`
  font-size: 18px;
  font-family: sans-serif;
  height: 42px;
  border-radius: 5px;
  border: none;
  background-color: #aa001e;
  position: absolute;
  top: 0;
  /* right: 0; */

  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

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

export default Reservation;
