import axios from 'axios';

let axiosInstance = axios.create({
  baseURL: 'https://localhost:5001/api'
});


export default axiosInstance;
