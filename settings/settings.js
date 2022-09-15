import axios from "axios";

const API_AXIOS = axios.create({
    baseURL: 'https://tangerine-medovik-80d056.netlify.app',
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
  });

  
  export default API_AXIOS;