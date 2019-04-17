import axios from 'axios';

export default axios.create({
  baseURL: 'https://react-my-burger-18ba9.firebaseio.com/'
});