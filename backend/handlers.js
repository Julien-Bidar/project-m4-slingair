"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//  Use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");

const getFlights = (req, res) => {
  res.status(200).json({ status: 200, flights });
};

const getFlight = (req, res) => {
  const id = req.params.id;
  const key = Object.keys(flights);
  const targetedFlight = key[0];
  const flightSeats = flights[targetedFlight];
  const seat = flightSeats.find((el) => el.id === id);
  if (seat) {
    res.status(200).json({ status: 200, seating: seat });
  } else {
    res.status(404).json({ status: 404, message: "seat number not found" });
  }
};

const addReservations = (req, res) => {
  const data = req.body;
  const id = uuidv4();
  data.id = id;
  reservations.push(data);
  res
    .status(201)
    .json({ status: 201, message: "reservation added", data: data });
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
    res
      .status(400)
      .json({ status: 400, message: "are you sure you typed the correct id?" });
  }
};

const deleteReservation = (req, res) => {
  const id = req.params.id;
  let index = undefined;
  reservations.forEach((res) => {
    if (id === res.id) {
      index = reservations.indexOf(res);
    }
  });
  if (index >= 0) {
    reservations.splice(index, 1);
    res
      .status(200)
      .json({ status: 200, message: "reservation deleted successfully" });
  } else {
    res
      .status(400)
      .json({ status: 400, message: "something went wrong with the id" });
  }
};

const updateReservation = (req, res) => {};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
