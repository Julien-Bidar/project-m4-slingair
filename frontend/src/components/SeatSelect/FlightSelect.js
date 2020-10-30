import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "../GlobalStyles";

//handleFlightSelect is passed from index
const FlightSelect = ({ handleFlightSelect }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    // TODO: fetch the flight numbers
    fetch("/flights")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFlights(data);
      });
  }, []);
  const flightNums = flights.flightsAr; // this is an array

  return (
    <Wrapper>
      {!!flightNums && (
        <form>
          <label htmlFor="flight">Flight Number :</label>
          {/* TODO: Create a dropdown from the flight numbers */}
          <select name="fligthSelect" id="fligthSelect">
            <option value="">select a flight</option>
            {flightNums.map((el) => {
              return <option value={el}>{el}</option>;
            })}
          </select>
        </form>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${themeVars.cadmiumRed};
  height: 80px;
  display: flex;
  align-items: center;
  padding: ${themeVars.pagePadding};
  margin-bottom: ${themeVars.pagePadding};
`;

export default FlightSelect;
