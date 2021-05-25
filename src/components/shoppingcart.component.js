//import packages
import React, { Component } from 'react';

import "../styles/tailwind.generated.css";

import { Helmet } from "react-helmet";

import {Link} from "react-router-dom";

import { Redirect } from "react-router-dom";

import WarningAlert from './warningalert.component';

//import services
import AuthenticationService from '../services/authentication.service';
import ShoppingCartService from '../services/shoppingcart.service';

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
            toggleDelivery: false

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

                console.log(this.state.products)

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
                <th className="lg:text-right text-left pl-5 lg:pl-0">
                <span className="lg:hidden" title="Quantity">Qtd</span>
                <span className="hidden lg:inline">Quantity</span>
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
                <th className="lg:text-right text-left pl-5 lg:pl-0">
                <span className="lg:hidden" title="Quantity">Qtd</span>
                <span className="hidden lg:inline">Quantity</span>
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
                    <button onClick={() => this.toggleDelivery()}
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

    toggleDelivery() {

        this.setState({
            toggleDelivery: (this.state.toggleDelivery ? false : true),
            toggleOrder: (this.state.toggleOrder ? false : true)
        })

    }

    deliveryHtml() {



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
                    {this.state.toggleDelivery && (
                        this.deliveryHtml()
                    )}
                    </div>
                </div>
            </div>
        );

    }

}