//import packages
import React, { Component } from 'react';

import "../styles/tailwind.generated.css";

import {Link, Redirect} from 'react-router-dom';

import AuthenticationService from "../services/authentication.service";
// import UserService from '../services/user.service';
// import ProductService from '../services/product.service';

//define login class
export default class Login extends Component {

    //administrator constructor
    constructor(props) {

        //allow access to props within constructor
        super(props);

        //assign default state
        this.state = {

            currentUser: AuthenticationService.getCurrentUser(),
            redirect: null

        };

    }

//render login component
render() {

    //handle redirect url
    if(this.state.redirect) {

        return <Redirect to={this.state.redirect} />;
  
    }

    return (
        <div className="flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg py-16 px-20 w-full">
                <div className="max-w-md w-full space-y-8 mx-auto">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Upload Product Image</h2>
                </div>
                <div className="">
                    <form action="" enctype="multipart/form-data">
                        <label for="img" className="font-medium mr-4">Select image:</label>
                        <input type="file" id="img" name="img" accept="image/*"/>
                        <input type="submit" className="mt-4 p-2 border border-transparent rounded-md shadow-sm text-base text-white bg-indigo-600 hover:bg-indigo-700"/>
                    </form>
                </div>
                </div>
        </div>
      </div>
    );

  }

}