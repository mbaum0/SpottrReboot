import axios from "axios";

const baseDomain = "http://192.168.1.19";
const port = 8000;

const baseURL = `${baseDomain}:${port}/api`;

export default axios.create({
  baseURL
})