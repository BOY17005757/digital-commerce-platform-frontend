//import packages
import axios from 'axios';

//import user access token from local storage
import authenticationHeader from './authentication-header';

//set api url based on production or development build
const API_URL = "http://localhost:8080/api/shoppingcart/";
//process.env.NODE_ENV === 'production' ? ("https://social-link-backend.herokuapp.com/api/access/") : "http://localhost:8080/api/access/";

//define product service class
class ShoppingCart {

    //api call (GET) shopping cart product
    getShoppingCartProducts(userId) {

        return axios.get(API_URL + '?userId=' + userId, {
            headers: authenticationHeader()
        });

    }

    //api call (POST) new shopping cart product, validate access token via header, and pass userid/content via body
    addShoppingCartProduct(userid, productid, quantity) {

        return axios({
            method: 'POST',
            url: API_URL + 'add',
            headers: authenticationHeader(),
            data: {
                userId: userid,
                productId: productid,
                quantity: quantity
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

    //api call (POST) decrement shopping cart product, validate access token via header, and pass userid/content via body
    decrementShoppingCartProduct(userid, productid, quantity) {

        return axios({
            method: 'POST',
            url: API_URL + 'decrement',
            headers: authenticationHeader(),
            data: {
                userId: userid,
                productId: productid,
                quantity: quantity
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

    //api call (DELETE) shopping cart product, pass userid parameter, and validate access token via header
    removeShoppingCartProduct(userid,productid) {

        return axios.delete(API_URL + 'remove', {
            headers: authenticationHeader(),
            data: {
                userId: userid,
                productId: productid,
            }
        });

    }

}

export default new ShoppingCart();