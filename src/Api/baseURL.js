import axios from 'axios';

const baseURL = axios.create({
  baseURL: 'https://gp-saveurkid.up.railway.app',
});
export default baseURL;
