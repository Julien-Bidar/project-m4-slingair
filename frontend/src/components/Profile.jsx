import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Form from "./SeatSelect/Form";
import { themeVars } from "./GlobalStyles";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [status, setStatus] = useState("");
  const [resInformation, setResInformation] = useState({});
  const [toDelete, setToDelete] = useState();
  const [update, setUpdate] = useState();
  const [formData, setFormData] = useState(resInformation);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    value === "" ? setDisabled(true) : setDisabled(false);
  }, [value, setValue]);

  const handleInput = (ev) => {
    setEmail("");
    const id = ev.target.value;
    setValue(id);
  };

  //cancel button when asked to confirm flight delete
  const handleCancel = () => {
    setStatus("ok");
  };

  //first delete button that appears on each reservation information
  const handleDelete = (e) => {
    const id = e.id;
    setToDelete(id);
    setStatus("deleteConf");
  };

  // button that deletes a chosen reservation
  const handleConfDelete = (e) => {
    fetch(`/reservations/${toDelete}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setStatus("deleted");
    fetch(`/profiles/${email}`)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        const resInfo = data.reservations;
        setResInformation(resInfo);
      })
      .catch((err) => {
        console.log(err);
        setStatus("err");
      });
  };
  //-------------Update attempt----based on index.js----------
  const handleUpdate = (e) => {
    const flight = e.flight;
    const id = e.id;
    setToDelete(id);
    setUpdate(flight);
    setStatus("update");
  };

  const handleSubmitUpdate = (e) => {
    fetch(`/reservations/${toDelete}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    });
    // .then((res) => {
    //   res.json();
    // })
    // .then((json) => {
    //   console.log(json);
    //   const { status, error, reservation } = json;
    //   // if 201, add reservation id (received from server) to localStorage
    //   if (status === 201) {
    //   } else {
    //     // if error from server, show error to user (stretch goal)
    //     setErrMessage(error);
    //     console.log(errMessage);
    //   }
    // });
    setStatus("updated");
  };

  const handleDoneUpdating = () => {
    fetch(`/profiles/${email}`)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        const resInfo = data.reservations;
        setResInformation(resInfo);
      })
      .catch((err) => {
        console.log(err);
        setStatus("err");
      });
    setStatus("ok");
  };

  const handleSeatSelect = (seatId) => {
    setFormData({ ...formData, seat: seatId });
  };

  const handleChange = (val, item) => {
    setFormData({ ...formData, [item]: val });
  };

  //check if there is any reservation with matching email
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail(value);
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
              <ResDiv key={el.id}>
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
                  <ButtonRes onClick={() => handleUpdate(el)}>
                    Update reservation
                  </ButtonRes>
                  <ButtonRes onClick={() => handleDelete(el)}>
                    Delete reservation
                  </ButtonRes>
                </ButtonDiv>
                <Line />
              </ResDiv>
            );
          })}
        </Wrapper>
      )}
      {status === "deleteConf" && (
        <Wrapper>
          <div>
            <p>Do you want to delete this reservation?</p>
          </div>
          <ButtonDiv>
            <ButtonRes onClick={handleCancel}>Cancel</ButtonRes>
            <ButtonRes onClick={handleConfDelete}>Delete reservation</ButtonRes>
          </ButtonDiv>
        </Wrapper>
      )}
      {status === "deleted" && (
        <Wrapper>
          <div>
            <p>Reservation deleted!</p>
          </div>
          <ButtonDiv>
            <ButtonRes onClick={handleCancel}>Back to reservation</ButtonRes>
          </ButtonDiv>
        </Wrapper>
      )}
      {status === "updated" && (
        <Wrapper>
          <div>
            <p>Reservation updated!</p>
          </div>
          <ButtonDiv>
            <ButtonRes onClick={handleDoneUpdating}>
              Back to reservation
            </ButtonRes>
          </ButtonDiv>
        </Wrapper>
      )}
      {status === "update" && (
        <Wrapper>
          <div>
            <p>Update your reservation</p>
          </div>
          <Form
            flightNumber={update}
            formData={formData}
            handleChange={handleChange}
            handleSeatSelect={handleSeatSelect}
            handleSubmit={handleSubmitUpdate}
            disabled={false}
            subStatus="idle"
          />
        </Wrapper>
      )}
      {status === "err" && (
        <Wrapper>
          <div>
            <p>we couldn't find any reservation matching your email address</p>
          </div>
        </Wrapper>
      )}
    </>
  );
};

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
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
