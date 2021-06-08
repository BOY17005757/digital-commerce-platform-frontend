//import packages
import axios from "axios";

//import user access token from local storage
import authenticationHeader from './authentication-header';

//set api url based on production or development build
const API_URL = process.env.NODE_ENV === 'production' ? ("https://digital-commerce-platform-back.herokuapp.com/api/authentication/") : "http://localhost:8080/api/authentication/";

//define authentication service class
class AuthenticationService {

    //api call (POST) signin, pass emailAddress/password via body
    signIn(emailAddress, password) {
        return axios.post(API_URL + "signin", {
                emailAddress,
                password
            })
            .then(function (response) {

                if (response.data.accessToken) {

                    //save user in browser local storage
                    localStorage.setItem("user", JSON.stringify(response.data));

                }

                return response.data;

            })
            .catch(function (error) {

                console.error(error);

                return error.response;

            });
    }

    //remove user from browser local storage
    signOut() {

        localStorage.removeItem("user");

    }

    //api call (POST) signUp, pass username/emailAddress/password via body
    signUp(firstName, lastName, username, emailAddress, password) {
        return axios.post(API_URL + "signup", {
                firstName,
                lastName,
                username,
                emailAddress,
                password
            })
            .then(function (response) {

                return response.data;

            })
            .catch(function (error) {

                console.error(error);

                return error.response;

            });
    }

    //get user from browser local storage
    getCurrentUser() {

        return JSON.parse(localStorage.getItem('user'));

    }

    //api call (DELETE) user, pass userid parameter, and validate access token via header
    removeUser(userid) {

        return axios.delete(API_URL + 'remove/?userId=' + userid, {
            headers: authenticationHeader()
        });

    }

}

export default new AuthenticationService();