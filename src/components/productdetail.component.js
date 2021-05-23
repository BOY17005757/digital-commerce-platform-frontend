//import packages
import React, { Component } from 'react';

import "../styles/tailwind.generated.css";

import { Redirect } from "react-router-dom";

import {Link} from 'react-router-dom';

import WarningAlert from './warningalert.component';

import AuthenticationService from "../services/authentication.service";
import ProductService from '../services/product.service';

//define login class
export default class ProductDetail extends Component {

    //administrator constructor
    constructor(props) {

        //allow access to props within constructor
        super(props);

        //assign default state
        this.state = {

            currentUser: AuthenticationService.getCurrentUser(),
            product: {},
            redirect: null,
            loading: false,
            urlProductId: '',
            quantity: 1

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

            urlUserId: search

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

    //loop and generate product
    getProductHtml() {

        return <div className="mx-auto flex flex-wrap">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{this.state.product.name}</h1>
                    <p className="leading-relaxed">{this.state.product.description}</p>
                    {/* <div className="flex items-center pb-5 border-b-2 border-gray-100 mb-5"/> */}
                    {/* <div className="w-20 h-10 mt-4">
                        <span className="title-font font-bold text-xl text-gray-900">Quantity</span>
                        <div className="relative flex flex-row w-full h-8 mt-2">
                            <form onSubmit={this.onSubmit.bind(this)}>
                                <input type="number"
                                    id="quantity"
                                    name="quantity"
                                    required
                                    value={this.state.quantity}
                                    onChange={this.handleChange.bind(this)}
                                    className="w-full font-medium text-center text-gray-900 bg-gray-200 outline-none" />
                            </form>
                        </div>
                    </div> */}
                    <div className="flex mt-5 items-center pb-5 border-b-2 border-gray-100 mb-5"/>
                        <span className="title-font font-bold text-xl text-gray-900">Price</span>
                        <div className="flex">
                            <span className="title-font text-2xl text-gray-900">£{this.state.product.price}</span>
                        </div>
                        {(this.state.currentUser !== null && (
                            <button className="my-4 flex ml-auto whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base text-white bg-indigo-600 hover:bg-indigo-700">
                                Add to Cart
                            </button>
                        ))}
                        {(this.state.currentUser === null && (
                            <div className="my-5">
                                <WarningAlert message="You must be signed in to add this product to your Shopping Cart." />
                            </div>
                        ))}
                        <div>
                            <Link to="/products" className="flex ml-auto whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base text-white bg-red-600 hover:bg-red-700">
                                        Back
                            </Link>
                        </div>
                </div>
                <img alt="ecommerce" className="object-none object-center rounded" src="https://dummyimage.com/400x400"/>
            </div>
        </div>;

    }

    //handle form entry
    handleChange(event) {

        this.setState({

            [event.target.id]: event.target.value

        });

    }

    //form submit on register
    onSubmit(event) {



    }

  //render login component
  render() {

    //handle redirect url
    if(this.state.redirect) {

        return <Redirect to={this.state.redirect} />;
  
    }

    return (
        <div>
            <section className="bg-gray-100 dark:bg-gray-900 lg:py-12 lg:flex lg:justify-center">
            <div className="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
                <div className="container px-24 py-24 mx-auto">

                    {this.getProductHtml()}

                </div>
                </div>
            </section>
        </div>
    );

  }

}