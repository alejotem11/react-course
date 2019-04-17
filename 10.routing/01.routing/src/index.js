import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN'; // To every request
axios.defaults.headers.post['Content-Type'] = 'application/json'; // To the post requests

axios.interceptors.request.use(reqConfig => {
  console.log(reqConfig);
  // Edit request configuration, e.g. add some header
  return reqConfig;
}, error => { // This function is related to any error that could arise SENDING the request, e.g. network connection errors
  console.log('Error sending the request', error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  return response;
}, error => {
  // console.log('Error in the response', error);
  return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
