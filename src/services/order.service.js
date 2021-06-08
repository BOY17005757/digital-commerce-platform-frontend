//import packages
import axios from 'axios';

//import user access token from local storage
import authenticationHeader from './authentication-header';

//set api url based on production or development build
const API_URL = process.env.NODE_ENV === 'production' ? ("https://digital-commerce-platform-back.herokuapp.com/api/orders/") : "http://localhost:8080/api/orders/";

//define order service class
class OrderService {

    //api call (GET) order headers, validate access token via header,
    getOrders() {

        return axios.get(API_URL + 'headers', {
            headers: authenticationHeader()
        });

    }

    //api call (GET) order lines, validate access token via header,
    getOrderLines(headerid) {

        return axios.get(API_URL + 'lines/?headerId=' + headerid, {
            headers: authenticationHeader()
        });

    }

    //api call (POST) create order, validate access token via header, and pass content via body
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

    //api call (DELETE) order header and lines, pass headerid parameter, and validate access token via header
    removeOrder(headerId) {

        return axios.delete(API_URL + 'delete/?headerId=' + headerId, {
            headers: authenticationHeader()
        });

    }

    //api call (DELETE) order line, pass lineid parameter, and validate access token via header
    removeOrderLine(lineId) {

        return axios.delete(API_URL + 'lines/delete/?lineId=' + lineId, {
            headers: authenticationHeader()
        });

    }

}

export default new OrderService();