//import packages
import axios from 'axios';

//import user access token from local storage
import authenticationHeader from './authentication-header';

//set api url based on production or development build
const API_URL = "http://localhost:8080/api/products/";
//process.env.NODE_ENV === 'production' ? ("https://social-link-backend.herokuapp.com/api/access/") : "http://localhost:8080/api/access/";

//define product service class
class ProductService {

    //api call (GET) products
    getProducts(active) {

        return axios.get(API_URL + '?active=' + active, {
        });

    }

    //api call (GET) product
    getProduct(active,productId) {

        return axios.get(API_URL + 'detail/?active=' + active + '&productId=' + productId, {

        });

    }

    //api call (POST) new product, validate access token via header, and pass userid/content via body
    createProduct(name,description,price,status) {

        //TODO: check for administrator role

        return axios({
                method: 'POST',
                url: API_URL + 'new',
                headers: authenticationHeader(),
                data: {
                    name: name,
                    description: description,
                    price: price,
                    status: status
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

     //api call (DELETE) product, pass userid parameter, and validate access token via header
     removeProduct(productId) {

        return axios.delete(API_URL + 'remove/?productId=' + productId, {
            headers: authenticationHeader()
        });

    }

    //api call (POST) edit product, validate access token via header, and pass  via body
    editProduct(productid, name, description, price, status) {

        return axios({
                method: 'POST',
                url: API_URL + 'edit',
                headers: authenticationHeader(),
                data: {
                    productId: productid,
                    name: name,
                    description: description,
                    price: price,
                    status: status
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

export default new ProductService();