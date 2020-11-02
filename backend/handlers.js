"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//  Use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");

const getFlights = (req, res) => {
  const flightsAr = Object.keys(flights);
  res.status(200).json({ status: 200, flightsAr });
};

const getFlight = (req, res) => {
  const id = req.params.id;
  const flightSeats = flights[id];
  //const seat = flightSeats.find((el) => el.id === id);
  if (flightSeats) {
    res.status(200).json({ status: 200, seating: flightSeats });
  } else {
    res.status(404).json({ status: 404, message: `params sent: ${id}` });
  }
};

const addReservations = (req, res) => {
  const data = req.body;
  const id = uuidv4();
  data.id = id;
  const flightNum = data.flight;
  const chosenSeat = data.seat;
  const seats = flights[flightNum];
  const updatedSeat = seats.find((seat) => seat.id === chosenSeat);
  if (updatedSeat && updatedSeat.isAvailable === true) {
    updatedSeat.isAvailable = false;
    reservations.push(data);
    res
      .status(201)
      .json({ status: 201, message: "reservation added", data: data });
  } else {
    res.status(400).json({
      status: 400,
      message: `body sent: ${data}`,
    });
  }
};

const getReservations = (req, res) => {
  res.status(200).json({ status: 200, reservations: reservations });
};

const getSingleReservation = (req, res) => {
  const id = req.params.id;
  const reservation = reservations.filter((res) => {
    return res.id === id;
  });
  if (reservation.length === 1) {
    res.status(200).json({ status: 200, reservation: reservation });
  } else {
    res.status(400).json({ status: 400, message: `params sent: ${id}` });
  }
};

const deleteReservation = (req, res) => {
  const id = req.params.id;
  let index = undefined;
  let seat = "";
  let flight = "";
  reservations.forEach((reservation) => {
    if (id === reservation.id) {
      index = reservations.indexOf(reservation);
      seat = reservation.seat;
      flight = reservation.flight;
    }
  });
  if (index >= 0) {
    reservations.splice(index, 1);
    const seats = flights[flight];
    const updatedSeat = seats.find((el) => el.id === seat);
    updatedSeat.isAvailable = true;
    res
      .status(200)
      .json({ status: 200, message: "reservation deleted successfully" });
  } else {
    res.status(400).json({ status: 400, message: `params sent: ${id}` });
  }
};

const updateReservation = (req, res) => {
  const id = req.params.id;
  let index = undefined;
  let seat = "";
  let flight = "";
  let foundReservation = {};
  const updatedData = req.body;
  reservations.forEach((reservation) => {
    if (reservation.id === id) {
      index = reservations.indexOf(reservation);
      seat = reservation.seat;
      flight = reservation.flight;
      foundReservation = reservation;
    }
  });
  if (foundReservation) {
    console.log("previous " + seat);
    console.log("updated to " + updatedData.seat);
    if (updatedData.seat !== seat) {
      //occupying the updated seat
      const seats = flights[flight];
      const occSeat = seats.find((el) => el.id === updatedData.seat);
      occSeat.isAvailable = false;
      //freeing the previous seat
      const freeSeat = seats.find((el) => el.id === seat);
      freeSeat.isAvailable = true;
    }
    foundReservation = { ...foundReservation, ...updatedData };
    reservations.splice(index, 1, foundReservation);

    res.status(201).json({
      status: 201,
      message: "reservation updated",
      reservation: foundReservation,
    });
  } else {
    res.status(400).json({
      status: 400,
      message: `params sent: ${id} body sent: ${updatedData}`,
    });
  }
};

const getUserReservations = (req, res) => {
  const email = req.params.id;
  const foundReservations = reservations.filter((el) => el.email === email);
  if (foundReservations.length > 0) {
    res.status(200).json({ status: 200, reservations: foundReservations });
  } else {
    res.status(400).json({ status: 400, message: `params sent: ${email}` });
  }
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
  getUserReservations,
};
