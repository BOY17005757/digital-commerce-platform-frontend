//import packages
import React, { Component } from 'react';

import "../styles/tailwind.generated.css";

import { LockClosedIcon } from '@heroicons/react/solid';

import ErrorAlert from "./erroralert.component";

import {Link} from 'react-router-dom';

import { Redirect } from "react-router-dom";

//import service
import AuthenticationService from '../services/authentication.service';
import ProductService from '../services/product.service';


//define login class
export default class DashboardCreateProduct extends Component {

    //register constructor
  constructor(props) {

    //allow access to props within constructor
    super(props);

    //assign default state
    this.state = {
        name: '',
        description: '',
        price: '',
        status: 'Active',
        loading: false,
        showErrorAlert: false,
        message: '',
        currentUser: AuthenticationService.getCurrentUser(),
        redirect: null

    };

  }

  //invoked after component is mounted
  componentDidMount() {

    // if(!this.props.adminUser) {

    //   this.setState({

    //     redirect: '/'

    //   });

    // }

  }

  //handle form entry
  handleChange(event) {

    console.log(event.target.value);

      this.setState({

          [event.target.id]: event.target.value

      });

  }

//form submit on register
onSubmit(event) {

    //prevent browser refresh after submit
    event.preventDefault();

    var self = this;

    self.setState({

        message: '',
        loading: true

    });

    var boolStatus;

    this.state.status === 'Active' ? boolStatus = true : boolStatus = false;

    ProductService.createProduct(this.state.name, this.state.description, this.state.price, boolStatus)
    .then(function (product) {

        if (!product) {

            self.setState({

                showErrorAlert: true,
                message: product.data.message

            });

        } else {

            self.setState({

                showErrorAlert: false,
                redirect: '/dashboard/products'

            });

        }

    })
    .catch(function (error) {

        console.error(error);

        self.setState({

            showErrorAlert: true

        });

    })
    .finally(function () {

        self.setState({

            loading: false

        });

    });

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
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Product</h2>
                </div>

                <form onSubmit={this.onSubmit.bind(this)} className="mt-8 space-y-6">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="name" className="sr-only">
                        Name
                        </label>
                        <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-4"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleChange.bind(this)}
                        autoFocus
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="sr-only">
                        Description
                        </label>
                        <textarea
                        id="description"
                        name="description"
                        type="text"
                        required
                        className="appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-4"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="sr-only">
                        Price
                        </label>
                        <input
                        id="price"
                        name="price"
                        type="number"
                        autoComplete="price"
                        required
                        className="appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-4"
                        placeholder="Price"
                        value={this.state.price}
                        onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <label className="block mt-4">
                        <label htmlFor="status" className="sr-only">
                            Status
                        </label>
                        <select id="status"
                            name="status"
                            type="text"
                            value={this.state.status}
                            onChange={this.handleChange.bind(this)}
                            className="form-select mt-1 block w-full appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-4">
                            <option>Active</option>
                            <option>Disabled</option>
                        </select>
                    </label>
                    </div>
                    {this.state.showErrorAlert && (

                        <ErrorAlert message={this.state.message} />

                    )}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create
                        </button>
                    </div>
                    <div className="">
                        <Link to="/dashboard/products" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Back
                        </Link>
                    </div>
                </form>
                </div>
        </div>
      </div>
    );

  }

}