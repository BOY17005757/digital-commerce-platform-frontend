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
export default class DashboardEditProduct extends Component {

    //register constructor
  constructor(props) {

    //allow access to props within constructor
    super(props);

    //assign default state
    this.state = {
        name: '',
        description: '',
        price: '',
        status: true,
        loading: false,
        showErrorAlert: false,
        message: '',
        currentUser: AuthenticationService.getCurrentUser(),
        redirect: null,
        product: {},
        urlProductId: ''
    };

  }

  //invoked after component is mounted
  componentDidMount() {

    //call get users function
    this.getProduct();

}

//get active product
getProduct(productId) {

    var self = this;

    self.setState({
        loading: true
    });

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let productid = params.get('productId');

    self.setState({

        urlProductId: productid

    });

    if(productid === '' || productid === null) {

        self.setState({
            redirect: '/products'
        })

    }

    ProductService.getProduct(false,productid)
    .then(function (product) {

        self.setState({

            product: product.data,
            name: product.data.name,
            description: product.data.description,
            price: product.data.price,
            status: product.data.status ===  true ? 'Active' : 'Disabled',
            loading: false

        });

    })
    .catch(function (error) {

        self.setState({

            message: "No product found.",
            loading: false,
            redirect: '/products'

        });

        console.error(error);

    })

}

  //handle form entry
  handleChange(event) {

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

    ProductService.editProduct(this.state.urlProductId,self.state.name, self.state.description, self.state.price, boolStatus)
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
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Edit Product</h2>
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
                            {this.state.status === 'Active' && (
                                <>
                                <option>Active</option>
                                <option>Disabled</option>
                                </>
                            )}
                            {this.state.status === 'Disabled' && (
                                <>
                                <option>Disabled</option>
                                <option>Active</option>
                                </>
                            )}
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
                            Edit
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