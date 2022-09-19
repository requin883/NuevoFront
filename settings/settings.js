import axios from "axios";

const API_AXIOS = axios.create({
    baseURL: 'http://localhost:8888/',
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
  });

  
  export default API_AXIOS;