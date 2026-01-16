import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gestao-financeira-api-l6uu.onrender.com'
});

export default api;