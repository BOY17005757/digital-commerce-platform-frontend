//import packages
import axios from 'axios';

//import user access token from local storage
import authenticationHeader from './authentication-header';

//set api url based on production or development build
const API_URL = process.env.NODE_ENV === 'production' ? ("https://digital-commerce-platform-back.herokuapp.com/api/productimage/") : "http://localhost:8080/api/productimage/";

//define product image service class
class ProductImageService {

  //api call (GET) product image
  getProfile(productid) {

    return axios.get(API_URL + '?productId=' + productid, {
    });

  }

  //api call (POST) upload product image, validate access token via header, and pass content via body
  uploadProductImage(productid,image) {

    return axios({
      method: 'POST',
      url: API_URL + 'upload?productId=' + productid,
      headers: authenticationHeader(),
      data: image
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

export default new ProductImageService();