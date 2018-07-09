import axios from 'axios';

let axiosInstance = axios.create({
  baseURL: 'https://localhost:44369/api'
});


export default axiosInstance;
