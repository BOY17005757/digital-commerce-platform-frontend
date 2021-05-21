//import packages
import axios from 'axios';

//import user access token from local storage
import authenticationHeader from './authentication-header';

//set api url based on production or development build
const API_URL = "http://localhost:8080/api/access/";
//process.env.NODE_ENV === 'production' ? ("https://social-link-backend.herokuapp.com/api/access/") : "http://localhost:8080/api/access/";

//define user service class
class UserService {

  //api call (GET) user profile, pass userid parameter, and validate access token via header
  getProfile(userId) {

    return axios.get(API_URL + 'profile/?userid=' + userId, {
      headers: authenticationHeader()
    });

  }

  //api call (GET) search results, pass content parameter, and validate access token via header
  // getSearch(content, searchfilter) {

  //   //check selected search filter
  //   if (searchfilter === 'user') {

  //     return axios.get(API_URL + 'search/?username=' + content, {
  //       headers: authenticationHeader()
  //     });

  //   } else {

  //     return axios.get(API_URL + 'search/?content=' + content, {
  //       headers: authenticationHeader()
  //     });

  //   }
  // }

  //get public content
  getPublicContent() {

    return axios.get(API_URL + 'public');

  }

  //api call (GET) user feed, pass userid/friends parameters, and validate access token via header
  // getUserFeed(userid, friends) {

  //   return axios.get(API_URL + 'user/?userId=' + userid + '&friends=' + friends, {
  //     headers: authenticationHeader()
  //   });

  // }

  //api call (GET) moderator content, and validate access token via header
  // getModeratorBoard() {

  //   return axios.get(API_URL + 'moderator', {
  //     headers: authenticationHeader()
  //   });

  // }

  //api call (GET) admin content, and validate access token via header
  getAdmin() {

    return axios.get(API_URL + 'administrator', {
      headers: authenticationHeader()
    });

  }

}

export default new UserService();