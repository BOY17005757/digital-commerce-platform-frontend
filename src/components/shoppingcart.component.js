//import packages
import React, { Component } from 'react';

import "../styles/tailwind.generated.css";

import { Helmet } from "react-helmet";

import {Link} from "react-router-dom";

import { Redirect } from "react-router-dom";

import Moment from 'moment';

import WarningAlert from './warningalert.component';

//import services
import AuthenticationService from '../services/authentication.service';
import ShoppingCartService from '../services/shoppingcart.service';
import CollectionService from '../services/collection.service';
import OrderService from '../services/order.service';

//define login class
export default class ShoppingCart extends Component {

    //administrator constructor
    constructor(props) {

        //allow access to props within constructor
        super(props);

        //assign default state
        this.state = {

            currentUser: AuthenticationService.getCurrentUser(),
            redirect: null,
            products: {},
            subTotal: 0,
            taxTotal: 0,
            total: 0,
            showWarningAlert: false,
            message: '',
            instructions: '',
            toggleCart: true,
            toggleOrder: false,
            toggleFinalise: false,
            toggleOrderSuccess: false,
            collection: null,
            orderType: '',
            delivery: null,
            firstName: '',
            lastName: '',
            emailAddress: '',
            country: '',
            streetAddress: '',
            city: '',
            county: '',
            postalCode: ''

        };

    }

    //invoked after component is mounted
    componentDidMount() {

        if(this.state.currentUser === null) {

            this.setState({

            redirect: '/'

            });

        } else {

            this.getShoppingCartProducts();

        }

    }

    //get active products
    getShoppingCartProducts() {

        var self = this;

        self.setState({
            loading: true
        });

        ShoppingCartService.getShoppingCartProducts(this.state.currentUser.id)
        .then(function (products) {

            self.setState({

                products: products.data,
                loading: false,
                subTotal: 0,
                taxTotal: 0,
                total: 0

            }, function() {

                this.orderDetails();

                if(Object.keys(self.state.products).length === 0) {

                    self.setState({
                        showWarningAlert: true
                    })

                }

            });

        })
        .catch(function (error) {

            self.setState({

                message: "No products found.",
                loading: false

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

    increaseQuantity(productId) {

        var self = this;

        ShoppingCartService.addShoppingCartProduct(this.state.currentUser.id,productId,1)
        .then(function (product) {

            self.getShoppingCartProducts();

        })
        .catch(function (error) {

            console.error(error);

        })

    }

    decreaseQuantity(productId,quantity) {

        var self = this;

        if(quantity === 1) {

            //remove from cart
            self.removeProduct(productId);

        } else {

            ShoppingCartService.decrementShoppingCartProduct(this.state.currentUser.id,productId,1)
            .then(function (product) {

                self.getShoppingCartProducts();

            })
            .catch(function (error) {

                console.error(error);

            })

        }

    }

    removeProduct(productId) {

        var self = this;

        ShoppingCartService.removeShoppingCartProduct(this.state.currentUser.id,productId)
        .then(function (product) {

            self.getShoppingCartProducts();

        })
        .catch(function (error) {

            console.error(error);

        })

    }

    orderDetails() {

        var self = this;

        var subTotal = 0;

        Object.entries(self.state.products).map(([key, value]) => {

            subTotal = subTotal + (value.quantity * Number(value.productId[0].price));

            return true;

        });

        var taxTotal = (20 / 100) * subTotal;
        var total = subTotal + taxTotal;

        self.setState({
            subTotal: subTotal.toFixed(2),
            taxTotal: taxTotal.toFixed(2),
            total: total.toFixed(2)
        })

    }

    getShoppingCartHtml() {

        var self = this;

        return Object.entries(self.state.products).map(([key, value]) => {

            return <tr key={key}>
                <td className="hidden pb-4 md:table-cell">
                <Link to={'/products/detail/?productId=' + value.productId[0]._id}>
                    <img src="https://dummyimage.com/200x200" className="w-20 rounded" alt="Thumbnail"/>
                </Link>
                </td>
                <td>
                <Link to={'/products/detail/?productId=' + value.productId[0]._id}>
                    <p className="mb-2 font-medium">{value.productId[0].name}</p>
                </Link>
                    <button className="text-red-500 hover:text-red-700"
                            onClick={() => this.removeProduct(value.productId[0]._id)}>
                        <small>Remove item</small>
                    </button>
                </td>
                <td className="justify-center md:justify-end md:flex mt-6">
                <div className="w-20 h-10">
                    <div className="relative flex flex-row w-full h-8">
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold hover:text-white px-2 border border-blue rounded"
                                onClick={() => this.decreaseQuantity(value.productId[0]._id,value.quantity)}>
                            -
                            </button>
                    <p className="mx-2 mt-1 font-medium">{value.quantity}</p>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold hover:text-white px-2 border border-blue rounded"
                                onClick={() => this.increaseQuantity(value.productId[0]._id)}>
                        +
                        </button>
                    </div>
                </div>
                </td>
                <td className="hidden text-right md:table-cell">
                <span className="text-sm lg:text-base font-medium">
                    £{value.productId[0].price}
                </span>
                </td>
                <td className="text-right">
                <span className="text-sm lg:text-base font-medium">
                    £{(value.quantity * value.productId[0].price).toFixed(2)}
                </span>
                </td>
            </tr>;
        })

    }

    getOrderHtml() {

        var self = this;

        return Object.entries(self.state.products).map(([key, value]) => {

            return <tr key={key}>
                <td className="hidden pb-4 md:table-cell">
                <Link to={'/products/detail/?productId=' + value.productId[0]._id}>
                    <img src="https://dummyimage.com/200x200" className="w-20 rounded" alt="Thumbnail"/>
                </Link>
                </td>
                <td>
                <Link to={'/products/detail/?productId=' + value.productId[0]._id}>
                    <p className="mb-2 font-medium">{value.productId[0].name}</p>
                </Link>
                </td>
                <td className="justify-center md:justify-end md:flex mt-6">
                <div className="w-20 h-10">
                    <div className="relative flex flex-row w-full h-8">
                    <p className="mx-2 mt-1 font-medium">{value.quantity}</p>
                    </div>
                </div>
                </td>
                <td className="hidden text-right md:table-cell">
                <span className="text-sm lg:text-base font-medium">
                    £{value.productId[0].price}
                </span>
                </td>
                <td className="text-right">
                <span className="text-sm lg:text-base font-medium">
                    £{(value.quantity * value.productId[0].price).toFixed(2)}
                </span>
                </td>
            </tr>;
        })

    }

    toggleCart() {

      this.setState({
        toggleCart: (this.state.toggleCart ? false : true),
        toggleOrder: (this.state.toggleOrder ? false : true)
      })

    }


    isCheckoutButtonDisabled() {

      return Object.keys(this.state.products).length === 0 ? true : false;

    }

    toggleOrder() {

      this.setState({
        toggleOrder: (this.state.toggleOrder ? false : true),
        toggleCart: (this.state.toggleCart ? false : true)
      })

    }

    checkoutProductsHtml() {

        return <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5 lg:shadow-lg lg:rounded-lg py-8 my-10">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 mx-auto mb-6">Shopping Cart</h1>
        <div className="flex-1">
        <table className="w-full text-sm lg:text-base" cellSpacing="0">
            <thead>
            <tr className="h-12 uppercase">
                <th className="hidden md:table-cell"></th>
                <th className="text-left">Product</th>
                <th className="lg:text-right text-left lg:pl-0">
                <span className="text-left">Quantity</span>
                </th>
                <th className="hidden text-right md:table-cell">Unit price</th>
                <th className="text-right">Total price</th>
            </tr>
            </thead>
            <tbody>
              {this.getShoppingCartHtml()}
            </tbody>
        </table>
        {this.state.showWarningAlert && (
            <WarningAlert message="You have no products in your Shopping Cart." />
        )}
        <div className="my-4 -mx-2 lg:flex">
            <div className="lg:px-2 lg:w-1/2">
            <div className="p-4 bg-gray-200 rounded-full">
                <h1 className="ml-2 font-bold uppercase">Instructions for seller</h1>
            </div>
            <div className="p-4">
                <textarea id="instructions"
                          name="instructions"
                          type="text"
                          value={this.state.instructions}
                          onChange={this.handleChange.bind(this)}
                          className="w-full h-28 p-2 bg-white focus:ring-2 focus:ring-indigo-800 text-gray-900 rounded"
                          placeholder="If you have some information for the seller, please enter it here.">
                </textarea>
            </div>
            </div>
            <div className="lg:px-2 lg:w-1/2">
            <div className="p-4 bg-gray-200 rounded-full">
                <h1 className="ml-2 font-bold uppercase">Order Details</h1>
            </div>
            <div className="p-4">
                <div className="flex justify-between border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                    Subtotal
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                    £{this.state.subTotal}
                    </div>
                    </div>
                    <div className="flex justify-between pt-4 border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                        Tax
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                    £{this.state.taxTotal}
                    </div>
                    </div>
                    <div className="flex justify-between pt-4 border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                        Total
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                        £{this.state.total}
                    </div>
                    </div>
                    <button onClick={() => this.toggleOrder()}
                          className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-indigo-600 rounded-full shadow item-center hover:bg-indigo-700 focus:shadow-outline focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                          disabled={this.isCheckoutButtonDisabled()}>
                        <span className="ml-2 mt-5px ">Review Order</span>
                    </button>
            </div>
            </div>
        </div>
        </div>
        </div>;
        
    }

    reviewOrderHtml() {

        return <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5 lg:shadow-lg lg:rounded-lg py-8 my-10">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 mx-auto mb-6">Review Order</h1>
        <div className="flex-1">
        <table className="w-full text-sm lg:text-base" cellSpacing="0">
            <thead>
            <tr className="h-12 uppercase">
                <th className="hidden md:table-cell"></th>
                <th className="text-left">Product</th>
                <th className="lg:text-right text-left lg:pl-0">
                <span className="text-left">Quantity</span>
                </th>
                <th className="hidden text-right md:table-cell">Unit price</th>
                <th className="text-right">Total price</th>
            </tr>
            </thead>
            <tbody>
              {this.getOrderHtml()}
            </tbody>
        </table>
        {this.state.showWarningAlert && (
            <WarningAlert message="You have no products in your Shopping Cart." />
        )}
        <div className="my-4 -mx-2 lg:flex">
            <div className="lg:px-2 lg:w-1/2">
            <div className="p-4 bg-gray-200 rounded-full">
                <h1 className="ml-2 font-bold uppercase">Instructions for seller</h1>
            </div>
            <div className="p-4">
                <textarea className="w-full h-28 p-2 bg-white focus:ring-2 focus:ring-indigo-800 text-gray-900 rounded disabled:opacity-50 disabled:pointer-events-none"
                          value={this.state.instructions} disabled>
                </textarea>
            </div>
            </div>
            <div className="lg:px-2 lg:w-1/2">
            <div className="p-4 bg-gray-200 rounded-full">
                <h1 className="ml-2 font-bold uppercase">Order Details</h1>
            </div>
            <div className="p-4">
                <div className="flex justify-between border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                    Subtotal
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                    £{this.state.subTotal}
                    </div>
                    </div>
                    <div className="flex justify-between pt-4 border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                        Tax
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                    £{this.state.taxTotal}
                    </div>
                    </div>
                    <div className="flex justify-between pt-4 border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                        Total
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                        £{this.state.total}
                    </div>
                    </div>
                    <button onClick={() => this.toggleFinalise()}
                          className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-indigo-600 rounded-full shadow item-center hover:bg-indigo-700 focus:shadow-outline focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                          disabled={this.isCheckoutButtonDisabled()}>
                        <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"/></svg>
                        <span className="ml-2 mt-5px ">Procceed to checkout</span>
                    </button>
                    <button onClick={() => this.toggleOrder()}
                          className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-red-600 rounded-full shadow item-center hover:bg-red-700 focus:shadow-outline focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
                        <span className="ml-2 mt-5px ">Back</span>
                    </button>
            </div>
            </div>
        </div>
        </div>
        </div>;

    }

    toggleFinalise() {

      this.setState({
          toggleFinalise: (this.state.toggleFinalise ? false : true),
          toggleOrder: (this.state.toggleOrder ? false : true)
      }, function() {

        this.getCollections();

      })

    }

    finaliseHtml() {

        return <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5 lg:shadow-lg lg:rounded-lg py-8 my-10">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 mx-auto mb-6">Finalise Order</h1>
        <div className="flex-1">
        <form onSubmit={this.placeOrder.bind(this)} className="mt-8 space-y-6">
        <div className="my-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Order Summary</h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                <h1 className="ml-2 font-bold">Instructions for seller</h1>
                <div className="p-4">
                    <textarea className="w-full h-28 p-2 bg-white focus:ring-2 focus:ring-indigo-800 text-gray-900 rounded disabled:opacity-50 disabled:pointer-events-none"
                            value={this.state.instructions} disabled>
                    </textarea>
                </div>
                <div className="p-4">
                <div className="flex justify-between border-b">
                <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                    Subtotal
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                    £{this.state.subTotal}
                    </div>
                    </div>
                    <div className="flex justify-between pt-4 border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                        Tax
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                    £{this.state.taxTotal}
                    </div>
                    </div>
                    <div className="flex justify-between pt-4 border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                        Total
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                        £{this.state.total}
                    </div>
                    </div>
                    </div>
                 </div>
              </div>
          </div>
        </div>
      </div>
        <div className="my-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Collection or Delivery</h3>
              <p className="mt-1 text-sm text-gray-600">Please choose your order type.</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                <div className="col-span-6 sm:col-span-3">
                <div class="block pt-3 pb-2 space-x-4" onChange={this.handleChange.bind(this)}>
                  <label>
                    <input
                      type="radio"
                      id="orderType"
                      name="orderType"
                      value="Collection"
                      required
                      class="mr-2 text-indigo-800 border-2 border-gray-300 focus:border-indigo-300 focus:ring-indigo-800"
                    />
                    Collection
                  </label>
                  <label>
                    <input
                      type="radio"
                      id="orderType"
                      name="orderType"
                      value="Delivery"
                      class="mr-2 text-indigo-800 border-2 border-gray-300 focus:border-indigo-300 focus:ring-indigo-800"
                    />
                    Delivery
                  </label>
                </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                  {this.state.orderType === 'Delivery' && (
                    <div>
                      <select
                        id="delivery"
                        name="delivery"
                        value={this.state.delivery}
                        onChange={this.handleChange.bind(this)}
                        className="mt-4 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option></option>
                        <option>Royal Mail Signed For® 1st Class</option>
                        <option>Royal Mail Signed For® 2nd Class</option>
                      </select>
                    </div>
                  )}
                  {this.state.orderType === 'Collection' && (
                    <div>
                        <select
                        id="collection"
                        name="collection"
                        value={this.state.collection}
                        onChange={this.handleChange.bind(this)}
                        className="mt-4 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option></option>
                        {this.getCollectionHtml()}
                      </select>
                    </div>
                  )}
                  </div>
                 </div>
              </div>
          </div>
        </div>
      </div>
        <div className="my-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Billing Information</h3>
              <p className="mt-1 text-sm text-gray-600">Please fill out your billing details.</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={this.state.firstName}
                        onChange={this.handleChange.bind(this)}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={this.state.lastName}
                        onChange={this.handleChange.bind(this)}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="text"
                        name="emailAddress"
                        id="emailAddress"
                        value={this.state.emailAddress}
                        onChange={this.handleChange.bind(this)}
                        autoComplete="email"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={this.state.country}
                        onChange={this.handleChange.bind(this)}
                        autoComplete="country"
                        required
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option></option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                    <div className="col-span-6">
                      <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
                        Street address
                      </label>
                      <input
                        type="text"
                        name="streetAddress"
                        id="streetAddress"
                        value={this.state.streetAddress}
                        onChange={this.handleChange.bind(this)}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={this.state.city}
                        onChange={this.handleChange.bind(this)}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="county" className="block text-sm font-medium text-gray-700">
                        County
                      </label>
                      <input
                        type="text"
                        name="county"
                        id="county"
                        value={this.state.county}
                        onChange={this.handleChange.bind(this)}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        value={this.state.postalCode}
                        onChange={this.handleChange.bind(this)}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Place Order
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
      </form>
      </div>
      </div>;

    }

    getCollections() {

      var self = this;

        self.setState({
            loading: true
        });

        CollectionService.getCollections()
        .then(function (collections) {

            self.setState({

                collections: collections.data,
                loading: false

            });

        })
        .catch(function (error) {

            self.setState({

                message: "No collections found.",
                loading: false

            });

            console.error(error);

        })

    }

    getCollectionHtml() {

      var self = this;

        return Object.entries(self.state.collections).map(([key, value]) => {
        
          return <option value={value._id}>{Moment(value.dateTimeFrom).format("DD/MM/YYYY HH:mm:ssa")} - {Moment(value.dateTimeTo).format("DD/MM/YYYY HH:mm:ssa")}</option>;
        });

    }

    placeOrder(event) {

      event.preventDefault();

      var self = this;

      self.setState({

          message: '',
          loading: true

      });

      OrderService.createOrder(self.state.currentUser.id,self.state.collection,self.state.delivery,self.state.instructions,self.state.orderType,self.state.firstName,self.state.lastName,self.state.emailAddress,self.state.country,self.state.streetAddress,self.state.city,self.state.county,self.state.postalCode,self.state.total,self.state.products)
      .then(function (order) {

          if (!order) {

              self.setState({

                showErrorAlert: true,
                message: order.data.message

              });

          } else {

            self.getShoppingCartProducts();

            self.toggleOrderSuccess();

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

    toggleOrderSuccess() {

      this.setState({
        toggleOrder: false,
        toggleCart: true,
        toggleFinalise: false,
        toggleOrderSuccess: true
    })

    }

    orderSuccessModal() {

      return <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold text-white">
                Order Successful
              </h3>
            </div>
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-white text-lg leading-relaxed">
                Your order has been received and will be processed as soon a possible. Thank you for shopping with us!
              </p>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <a
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                href="/shoppingcart">
                Close
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>;

    }

    //render login component
    render() {

        //handle redirect url
        if(this.state.redirect) {

          return <Redirect to={this.state.redirect} />;
    
        }

        return (
            <div>
              <Helmet>
                <title>Digital-Commerce | Shopping Cart</title>
              </Helmet>
              <div className="relative bg-gray-200 overflow-hidden min-h-screen">
                  <div className="flex justify-center my-12">
                  {this.state.toggleCart && (
                      this.checkoutProductsHtml()
                  )}
                  {this.state.toggleOrder && (
                      this.reviewOrderHtml()
                  )}
                  {this.state.toggleFinalise && (
                      this.finaliseHtml()
                  )}
                  {this.state.toggleOrderSuccess && (
                    this.orderSuccessModal()
                  )}
                  </div>
              </div>
            </div>
        );

    }

}