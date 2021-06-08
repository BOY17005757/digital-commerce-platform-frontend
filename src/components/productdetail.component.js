//import packages
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import {Link} from 'react-router-dom';

//import styles
import "../styles/tailwind.generated.css";
import WarningAlert from './warningalert.component';
import Notification from './notification.component';

//import services
import AuthenticationService from "../services/authentication.service";
import ProductService from '../services/product.service';
import ShoppingCartService from '../services/shoppingcart.service';

//define product detail class
export default class ProductDetail extends Component {

    //product detail constructor
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
            quantity: 1,
            showNotification: false,
            notificationCounter: 0

        };

        //bind listener
        this.tick = this.tick.bind(this);

    }

    //invoked after component is mounted
    componentDidMount() {

        //call get products function
        this.getProduct();

    }

    //get active product
    getProduct() {

        var self = this;

        self.setState({
            loading: true
        });

        //get productid from query parameter
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let productid = params.get('productId');

        self.setState({

            urlProductId: productid

        });

        //redirect page if query parameter not present
        if (productid === '' || productid === null) {

            self.setState({

                redirect: '/products'

            })

        }

        ProductService.getProduct(false, productid)
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

    //add product to users shopping cart
    onClick(event) {

        var self = this;

        ShoppingCartService.addShoppingCartProduct(this.state.currentUser.id, this.state.urlProductId, 1)
            .then(function (product) {

                //call added to shopping cart notification
                self.showNotification();

            })
            .catch(function (error) {

                console.error(error);

            })

    }

    //loop and generate product html
    getProductHtml() {

        return <div className="mx-auto flex flex-wrap">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{this.state.product.name}</h1>
                    <p className="leading-relaxed">{this.state.product.description}</p>
                    <div className="flex mt-5 items-center pb-5 border-b-2 border-gray-100 mb-5"/>
                        <span className="title-font font-bold text-xl text-gray-900">Price</span>
                        <div className="flex">
                            <span className="title-font text-2xl text-gray-900">£{this.state.product.price}</span>
                        </div>
                        {(this.state.currentUser !== null && (
                            <button onClick={this.onClick.bind(this)} className="my-4 flex whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-indigo-700 bg-indigo-200 hover:bg-indigo-300">
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
                <img alt="" className="object-contain object-center rounded" src={'https://digital-commerce-platform-back.herokuapp.com/api/productimage?productId='+this.state.product._id}/>
            </div>
        </div>;

    }

    //handle form entry
    handleChange(event) {

        this.setState({

            [event.target.id]: event.target.value

        });

    }

    //initiate tick for added to shopping cart notification
    tick() {

        this.setState({

            notificationCounter: this.state.notificationCounter + 1

        }, function() {

            //clear interval and hide notification after 5 seconds
            if(this.state.notificationCounter >= 5) {

                this.setState({

                    showNotification: false,
                    notificationCounter: 0

                }, function() {

                    clearInterval(this.interval);

                })

            }

        });
        
    }

    //display added to shopping cart notification
    showNotification() {

        //set tick interval to 1 second
        this.interval = setInterval(this.tick, 1000);

        this.setState({
            showNotification: true
        })

    }

  //render product detail component
  render() {

    //handle redirect url
    if(this.state.redirect) {

        return <Redirect to={this.state.redirect} />;
  
    }

    return (
        <div>
        {this.state.showNotification && (
            <div className="relative">
                <Notification message="Added to Shopping Cart!"/>
            </div>
        )}
        <div className="min-h-screen bg-gray-100">
            <section className="bg-gray-100 dark:bg-gray-900 lg:py-12 lg:flex lg:justify-center">
            <div className="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg mt-20">
                <div className="container lg:p-24 p-10 mx-auto">
                    {this.getProductHtml()}
                </div>
                </div>
            </section>
        </div>
        </div>
    );
  }
}