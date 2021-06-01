//import packages
import axios from 'axios';

//import user access token from local storage
import authenticationHeader from './authentication-header';

//set api url based on production or development build
const API_URL = "http://localhost:8080/api/orders/";
//process.env.NODE_ENV === 'production' ? ("https://social-link-backend.herokuapp.com/api/access/") : "http://localhost:8080/api/access/";

//define order service class
class OrderService {

    //api call (GET) orders
    getOrders() {

        return axios.get(API_URL + 'headers', {
            headers: authenticationHeader()
        });

    }

    //api call (POST) create order, validate access token via header, and pass userid/content via body
    createOrder(userid,collectionid,delivery,instructions,type,firstname,lastname,emailaddress,country,streetaddress,city,county,postalcode,total,products) {

        return axios({
            method: 'POST',
            url: API_URL + 'create',
            headers: authenticationHeader(),
            data: {
                userId: userid,
                collectionId: collectionid,
                delivery: delivery,
                instructions: instructions,
                type: type,
                firstName: firstname,
                lastName: lastname,
                emailAddress: emailaddress,
                country: country,
                streetAddress: streetaddress,
                city: city,
                county: county,
                postalCode: postalcode,
                total: total,
                products: products
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

}

export default new OrderService();