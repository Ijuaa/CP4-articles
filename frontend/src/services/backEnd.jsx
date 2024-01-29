import axios from "axios";

const backEnd = axios.create({
  baseURL: "http://localhost:3310/api",
});

export default backEnd;
