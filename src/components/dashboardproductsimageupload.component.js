//import packages
import React, { Component } from 'react';

import "../styles/tailwind.generated.css";

import {Link, Redirect} from 'react-router-dom';

import FormData from 'form-data'

import AuthenticationService from "../services/authentication.service";
// import UserService from '../services/user.service';
// import ProductService from '../services/product.service';
import ProductImageService from "../services/productimage.service";

//define login class
export default class Login extends Component {

    //administrator constructor
    constructor(props) {

        //allow access to props within constructor
        super(props);

        //assign default state
        this.state = {

            currentUser: AuthenticationService.getCurrentUser(),
            redirect: null,
            image: null,
            urlProductId: null

        };

    }

    componentDidMount() {

      //get product id from url
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let productid = params.get('productId');

      this.setState({

        urlProductId: productid

      })

    }

    //handle form entry
    handleChange(event) {

        this.setState({

            [event.target.id]: event.target.files[0]

        });

    }

    onSubmit(event) {

        //prevent browser refresh after submit
        event.preventDefault();

        var self = this;

        var file = self.state.image;

        console.log(file)

        var formData = new FormData();
        formData.append('image',file)

        console.log(Array.from(formData))

        ProductImageService.uploadProductImage(self.state.urlProductId,formData)
          .then(function (image) {

            self.setState({

              redirect: '/dashboard/products'

            })


          })
          .catch(function (error) {

              console.error(error);

          });

    }

    //render login component
    render() {

    //handle redirect url
    if (this.state.redirect) {

        return <Redirect to = {
            this.state.redirect
        }
        />;

    }

    return (
        <div className="flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg py-16 px-20 w-full">
                <div className="max-w-md w-full space-y-8 mx-auto">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Upload Product Image</h2>
                </div>
                <div className="">
                    <form onSubmit={this.onSubmit.bind(this)} encType="multipart/form-data">
                        <label htmlFor="image" className="font-medium mr-4">Select image:</label>
                        <input type="file"
                               id="image"
                               name="image"
                            //    value={this.state.image}
                               onChange={this.handleChange.bind(this)}
                               accept="image/*"/>
                        <input type="submit"className="mt-4 p-2 border border-transparent rounded-md shadow-sm text-base text-white bg-indigo-600 hover:bg-indigo-700"/>
                    </form>
                </div>
                </div>
        </div>
      </div>
    );

  }

}