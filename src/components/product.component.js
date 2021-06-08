//import packages
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Helmet } from "react-helmet";

//import styles
import "../styles/tailwind.generated.css";
import Spinner from "./spinner.component";
import Notification from './notification.component';

//import services
import AuthenticationService from "../services/authentication.service";
import ProductService from '../services/product.service';
import ShoppingCartService from '../services/shoppingcart.service';

//define product class
export default class Product extends Component {

    //product constructor
    constructor(props) {

        //allow access to props within constructor
        super(props);

        //assign default state
        this.state = {

            currentUser: AuthenticationService.getCurrentUser(),
            products: {},
            filteredProducts: {},
            redirect: null,
            loading: false,
            showNotification: false,
            notificationCounter: 0,
            search: ''

        };

        //bind listener
        this.tick = this.tick.bind(this);

    }

    //invoked after component is mounted
    componentDidMount() {

        //call get products function
        this.getProducts();

    }

    //handle form entry, update filtered products array based on search form entry
    handleSearch(event) {

        this.setState({

            [event.target.id]: event.target.value

        }, function() {

            this.setState({

                filteredProducts: Object.values(this.state.products).filter(user => user.name.toLowerCase().includes(this.state.search.toLowerCase()))
    
            })

        });

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
                filteredProducts: products.data,
                loading: false

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

    //add product to users shopping cart
    addToShoppingCart(productId) {

        var self = this;

        ShoppingCartService.addShoppingCartProduct(self.state.currentUser.id,productId,1)
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

        var self = this;
        
        return Object.entries(self.state.filteredProducts)
                     .map(([key, value]) => {
        
            return <div key={key} className="rounded overflow-hidden shadow-lg bg-white w-5/6 mx-auto my-4">
                <Link to={'/products/detail/?productId='+ value._id}>
                    <img className="w-full" src={'https://digital-commerce-platform-back.herokuapp.com/api/productimage?productId='+value._id} alt=""/>
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
                    {(this.state.currentUser !== null && (
                        <button onClick={() => this.addToShoppingCart(value._id)} className="my-4 flex ml-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-indigo-700 bg-indigo-200 hover:bg-indigo-300">
                            Add to Cart
                        </button>
                    ))}
                </div>
            </div>;
        });

    }

  //render product component
  render() {

    return (<div>
        <Helmet>
            <title>{`${this.props.manifest.name}`} | Products</title>
        </Helmet>
        <div className="relative bg-gray-200 overflow-hidden min-h-screen">
        {this.state.showNotification && (
            <div className="relative">
                <Notification message="Added to Shopping Cart!"/>
            </div>
        )}
        <section className="relative w-full max-w-md px-5 pt-4 rounded-md ml-auto mt-4">
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </span>
                <input type="text"
                       id="search"
                       name="search"
                       value={this.state.search}
                       onChange={this.handleSearch.bind(this)}
                       className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-md"
                       placeholder="Search"/>
            </div>
        </section>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
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