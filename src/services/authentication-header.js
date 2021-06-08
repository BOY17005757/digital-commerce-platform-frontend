export default function authenticationHeader() {

  //get current user from browser local storage
  const user = JSON.parse(localStorage.getItem('user'));

  //check if user populated
  if(user && user.accessToken) {

    //return prepared header access token
    return { 'x-access-token': user.accessToken };

  } else {

    return {};

  }

}