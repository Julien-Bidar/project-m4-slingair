import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "../GlobalStyles";

//handleFlightSelect is passed from index
const FlightSelect = ({ handleFlightSelect }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    // fetch the flight numbers
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
        <div>
          <label htmlFor="flight">Flight Number :</label>
          {/* TODO: Create a dropdown from the flight numbers */}
          <select
            onChange={(el) => handleFlightSelect(el)}
            name="fligthSelect"
            id="fligthSelect"
          >
            <option value="" disabled selected>
              select a flight
            </option>
            {flightNums.map((el) => {
              return (
                <option key={el} value={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
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
