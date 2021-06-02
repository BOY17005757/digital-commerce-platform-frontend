//import packages
import axios from 'axios';

//import user access token from local storage
import authenticationHeader from './authentication-header';

//set api url based on production or development build
const API_URL = "http://localhost:8080/api/manifest/";
//process.env.NODE_ENV === 'production' ? ("https://social-link-backend.herokuapp.com/api/access/") : "http://localhost:8080/api/access/";

//define manifest service class
class ManifestService {

    //api call (GET) manifest
    getManifest() {

        return axios.get(API_URL, {
        });

    }

    //api call (POST) create order, validate access token via header, and pass userid/content via body
    editManifest(content) {

        return axios({
            method: 'POST',
            url: API_URL + 'edit',
            headers: authenticationHeader(),
            data: {
               content: content
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

export default new ManifestService();