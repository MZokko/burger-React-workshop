import axios from 'axios';

const instance = axios.create({baseURL:'https://burger-react-ae741.firebaseio.com/'})

export default instance;