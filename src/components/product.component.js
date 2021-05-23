//import packages
import React, { Component } from 'react';

import "../styles/tailwind.generated.css";

import {Link} from 'react-router-dom';

import { Helmet } from "react-helmet";

import Spinner from "./spinner.component";

import AuthenticationService from "../services/authentication.service";

import ProductService from '../services/product.service';

//define login class
export default class Product extends Component {

    //administrator constructor
    constructor(props) {

        //allow access to props within constructor
        super(props);

        //assign default state
        this.state = {

            currentUser: AuthenticationService.getCurrentUser(),
            products: {},
            redirect: null,
            loading: false

        };

    }

    //invoked after component is mounted
    componentDidMount() {

        //call get users function
        this.getProducts();

    }

    //get active products
    getProducts() {

        var self = this;

        self.setState({
            loading: true
        });

        ProductService.getProducts(true)
        .then(function (products) {

            self.setState({

                products: products.data,
                loading: false

            });

        })
        .catch(function (error) {

            self.setState({

                message: "No products found.",
                // showInvalidPost: true,
                loading: false

            });

            console.error(error);

        })

    }

    //loop and generate products
    getProductHtml() {

        var self = this;

        return Object.entries(self.state.products).map(([key, value]) => {
        
            return <div key={key} className="rounded overflow-hidden shadow-lg bg-white w-5/6 mx-auto my-4">
                <Link to={'/products/detail/?productId='+ value._id}>
                    <img className="w-full" src="https://dummyimage.com/200x200" alt="Mountain"/>
                </Link>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{value.name}</div>
                    <p className="text-gray-700 text-base">{value.description}</p>
                    <p className="mt-4 font-bold text-2xl">£{value.price}</p>
                </div>
                <div className="px-6 pb-4">
                    <Link to={'/products/detail/?productId='+ value._id} className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base text-white bg-indigo-600 hover:bg-indigo-700">
                    View
                    </Link>
                </div>
            </div>;
        });

    }

  //render login component
  render() {

    return (<div>
        <Helmet>
            <title>Digital-Commerce | Products</title>
        </Helmet>
        <div className="relative bg-gray-200 overflow-hidden min-h-screen">

        <section className="relative w-full max-w-md px-5 py-4 rounded-md ml-auto mt-4">
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </span>

                <input type="text" className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-md" placeholder="Search"/>
            </div>
        </section>

        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">

        {this.state.loading && (

            <Spinner />

        )}

        {this.getProductHtml()}

        </div>
        </div>
    </div>
    );

  }

}