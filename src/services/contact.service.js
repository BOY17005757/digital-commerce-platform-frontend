//import packages
import axios from 'axios';

//import user access token from local storage
import authenticationHeader from './authentication-header';

//set api url based on production or development build
const API_URL = process.env.NODE_ENV === 'production' ? ("https://digital-commerce-platform-back.herokuapp.com/api/contact/") : "http://localhost:8080/api/contact/";

//define contact service class
class ContactService {

    //api call (GET) contact messages
    getContactMessages() {

        return axios.get(API_URL, {
            headers: authenticationHeader()
        });

    }

    //api call (POST) new contact message, validate access token via header, and pass content via body
    createContactMessage(name,emailAddress,message,userId) {

        return axios({
                method: 'POST',
                url: API_URL + 'new',
                headers: authenticationHeader(),
                data: {
                    name: name,
                    emailAddress: emailAddress,
                    message: message,
                    userId: userId
                }
                })
                .then(function (response) {

                    return response.data;

                })
                .catch(function (error) {

                    console.error(error);

                    return error.response;

                });
    }

     //api call (DELETE) contact message, pass contactid parameter, and validate access token via header
     removeContactMessage(contactid) {

        return axios.delete(API_URL + 'remove/?contactId=' + contactid, {
            headers: authenticationHeader()
        });

    }
    
}

export default new ContactService();