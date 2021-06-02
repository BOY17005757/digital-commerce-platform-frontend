//import packages
import axios from 'axios';

//import user access token from local storage
import authenticationHeader from './authentication-header';

//set api url based on production or development build
const API_URL = process.env.NODE_ENV === 'production' ? ("https://digital-commerce-platform-back.herokuapp.com/api/access/") : "http://localhost:8080/api/access/";

//define user service class
class UserService {

  //api call (GET) user profile, pass userid parameter, and validate access token via header
  getProfile(userId) {

    return axios.get(API_URL + 'profile/?userid=' + userId, {
      headers: authenticationHeader()
    });

  }

  //api call (GET) admin content, and validate access token via header
  getAdmin() {

    return axios.get(API_URL + 'administrator', {
      headers: authenticationHeader()
    });

  }

}

export default new UserService();