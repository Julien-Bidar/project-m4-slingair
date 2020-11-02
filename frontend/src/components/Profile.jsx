import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { themeVars } from "./GlobalStyles";

const Profile = () => {
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [status, setStatus] = useState("");
  const [resInformation, setResInformation] = useState({});

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
    fetch(`/profiles/${value}`)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        const resInfo = data.reservations;
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
              placeholder="enter your email address"
            />
            <Button onClick={handleSubmit} type="submit" disabled={disabled}>
              check reservation
            </Button>
          </form>
        </InpBtn>
      </FormWrapper>
      {status === "ok" && (
        <Wrapper>
          <H2>Reservations</H2>
          {resInformation.map((el) => {
            return (
              <ResDiv>
                <div>
                  <p>
                    <ResInfo>confirmation #: </ResInfo> {el.id}{" "}
                  </p>
                  <p>
                    <ResInfo>flight #: </ResInfo> {el.flight}{" "}
                  </p>
                  <p>
                    <ResInfo>seat #: </ResInfo> {el.seat}{" "}
                  </p>
                  <p>
                    <ResInfo>Name : </ResInfo> {el.givenName} {el.surname}{" "}
                  </p>
                </div>
                <ButtonDiv>
                  <ButtonRes>Update reservation</ButtonRes>
                  <ButtonRes>Delete reservation</ButtonRes>
                </ButtonDiv>
                <Line />
              </ResDiv>
            );
          })}
        </Wrapper>
      )}
    </>
  );
};

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const H2 = styled.h2`
  margin-bottom: 25px;
`;

const ResDiv = styled.div`
  margin: 15px auto;
`;

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

  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #ffb82f;
  border: 3px solid ${themeVars.alabamaCrimson};
  border-radius: 5px;
  margin: auto;
  padding: 30px;
`;

const ButtonRes = styled.button`
  font-size: 14px;
  font-family: sans-serif;
  height: 25px;
  border-radius: 5px;
  border: none;
  background-color: #aa001e;
  justify-content: space-around;

  &:hover {
    cursor: pointer;
  }
`;

const Line = styled.hr`
  border: 1px solid #aa001e;
`;

const ResInfo = styled.span`
  font-weight: 600;
`;

export default Profile;
