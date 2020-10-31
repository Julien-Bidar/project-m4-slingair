import React from "react";
import { useState } from "react";
import Confirmation from "./Confirmation";
import styled from "styled-components";

import { themeVars } from "./GlobalStyles";

const Reservation = () => {
  const [reservation, setReservation] = useState([]);
  const [value, setValue] = useState("");
  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch(`/reservations/${value}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReservation(data.reservation);
      });
    //setValue("");
  };
  const handleInput = (ev) => {
    const id = ev.target.value;
    setValue(id);
  };
  return (
    <>
      <form>
        <input
          onChange={handleInput}
          value={value}
          type="text"
          placeholder="enter your reservation number"
        />
        ;
        <button onClick={handleSubmit} type="submit">
          retrieve reservation
        </button>
      </form>
      {reservation.length === 1 && <Confirmation />} 
    </>
  );
};

export default Reservation;
