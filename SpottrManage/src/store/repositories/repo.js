import axios from "axios";

const baseDomain = "http://67.247.162.4";
const port = 1771;

const baseURL = `${baseDomain}:${port}/api`;

export default axios.create({
  baseURL
})