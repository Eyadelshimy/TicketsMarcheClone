import axios from "axios";

export const auth = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const events = axios.create({
  baseURL: "http://localhost:5000/api/v1/events",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const users = axios.create({
  baseURL: "http://localhost:5000/api/v1/users",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const bookings = axios.create({
  baseURL: "http://localhost:5000/api/v1/bookings",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
