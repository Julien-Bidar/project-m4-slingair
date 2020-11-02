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
        <Div>
          <label htmlFor="flight">Flight Number :</label>
          {/* Done: Create a dropdown from the flight numbers */}
          <Select
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
          </Select>
        </Div>
      )}
    </Wrapper>
  );
};

const Select = styled.select`
  border-radius: 5px;
  margin-left: 15px;
  height: 28px;
  background-color: #fdbb01;
  color: #aa001e;
  font-weight: bold;
  font-style: italic;
  font-family: "'Kosugi', Arial, Helvetica, sans-serif";
  font-size: 18px;
`;

const Div = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Wrapper = styled.div`
  background: ${themeVars.cadmiumRed};
  height: 80px;
  display: flex;
  align-items: center;
  padding: ${themeVars.pagePadding};
  margin-bottom: ${themeVars.pagePadding};
`;

export default FlightSelect;
