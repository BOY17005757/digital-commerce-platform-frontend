//import packages
import axios from 'axios';

//import user access token from local storage
import authenticationHeader from './authentication-header';

//set api url based on production or development build
const API_URL = process.env.NODE_ENV === 'production' ? ("https://digital-commerce-platform-back.herokuapp.com/api/collections/") : "http://localhost:8080/api/collections/";

//define collection service class
class CollectionService {

    //api call (GET) collections
    getCollections() {

        return axios.get(API_URL, {
            headers: authenticationHeader()
        });

    }

    //api call (POST) new collection, validate access token via header, and pass content via body
    createCollection(datetimefrom,datetimeto) {

        return axios({
                method: 'POST',
                url: API_URL + 'create',
                headers: authenticationHeader(),
                data: {
                    dateTimeFrom: datetimefrom,
                    dateTimeTo: datetimeto
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

     //api call (DELETE) collection, pass collectionid parameter, and validate access token via header
     removeCollection(collectionId) {

        return axios.delete(API_URL + 'delete/?collectionId=' + collectionId, {
            headers: authenticationHeader()
        });

    }

}

export default new CollectionService();