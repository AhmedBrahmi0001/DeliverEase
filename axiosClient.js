// resources/js/axios.js

import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://192.168.1.38:8000/api/", // Replace with your API base URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
