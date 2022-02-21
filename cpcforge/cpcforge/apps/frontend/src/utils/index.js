import axios from 'axios';

const api = axios.create({ baseUrl: process.env.BASE_URL });

export default api;
