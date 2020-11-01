import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SeatSelect from "./SeatSelect";
import Confirmation from "./Confirmation";
import Reservation from "./Reservation";
import GlobalStyles, { themeVars } from "./GlobalStyles";

const App = () => {
  const [userReservation, setUserReservation] = useState({});

  const updateUserReservation = (newData) => {
    setUserReservation({ ...userReservation, ...newData });
  };

  useEffect(() => {
    // check localStorage for an id
    // if yes, get data from server and add it to state
    const stringReservation = localStorage.getItem("session");
    const reservation = JSON.parse(stringReservation);

    if (reservation) {
      console.log(reservation.id);
      fetch(`/reservations/${reservation.id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const info = data.reservation;
          updateUserReservation(info[0]);
        });
    }
  }, [setUserReservation]);

  console.log(userReservation);
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <SeatSelect updateUserReservation={updateUserReservation} />
          </Route>
          <Route exact path="/confirmed">
            <Confirmation userReservation={userReservation} />
          </Route>
          <Route exact path="/view-reservation">
            <Reservation userReservation={userReservation} />
          </Route>
          <Route path="">404: Oops!</Route>
        </Switch>
        <Footer />
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div`
  background: ${themeVars.background};
  display: flex;
  flex-direction: column;
  height: calc(100vh - 110px);
`;

export default App;
