import axios from 'axios';
import { baseURL } from '../config';

const server = axios.create({
  baseURL
});

export default server;