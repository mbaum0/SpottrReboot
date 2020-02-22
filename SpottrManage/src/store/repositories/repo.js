import axios from "axios";

const baseDomain = "http://localhost";
const port = 8000;

const baseURL = `${baseDomain}:${port}/api`;

export default axios.create({
  baseURL
})