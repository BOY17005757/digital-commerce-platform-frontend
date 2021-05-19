export default function authenticationHeader() {

  //get user from browser local storage
  const user = JSON.parse(localStorage.getItem('user'));

  //check user populated
  if(user && user.accessToken) {

    return { 'x-access-token': user.accessToken };

  } else {

    return {};

  }

}