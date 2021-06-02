//import packages
import React, { Component } from 'react';

import "../styles/tailwind.generated.css";

import Moment from 'moment';

import {Link} from 'react-router-dom';

import Spinner from "./spinner.component";

import AuthenticationService from "../services/authentication.service";
import OrderService from '../services/order.service';

//define dashboard orders class
export default class DashboardOrders extends Component {

    //administrator constructor
    constructor(props) {

        //allow access to props within constructor
        super(props);

        //assign default state
        this.state = {

            currentUser: AuthenticationService.getCurrentUser(),
            orders: {},
            redirect: null,
            loading: false

        };

    }

    //invoked after component is mounted
    componentDidMount() {

        //call get users function
        this.getOrders();

    }

    //get all orders
    getOrders() {

        var self = this;

        if (self.state.currentUser) {

            self.setState({
                loading: true
            });

            OrderService.getOrders()
            .then(function (orders) {

                self.setState({

                    orders: orders.data,
                    loading: false

                });

                console.log(orders.data)

            })
            .catch(function (error) {

                self.setState({

                    message: "No orders found.",
                    showInvalidPost: true,
                    loading: false

                });

                console.error(error);

            })

        } else {

            self.setState({

                redirect: '/login'

            });

        }

    }

    //delete order
    removeOrder(headerid) {

        var self = this;

        OrderService.removeOrder(headerid)
            .then(function (order) {

                self.getOrders();

            })
            .catch(function (error) {

                console.error(error);

            });

    }

    //loop and generate orders
    getOrderHtml() {

        var self = this;

        return Object.entries(self.state.orders).map(([key, value]) => {
        
            return <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value.userId[0].username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="">
                                <div className="text-sm font-medium text-gray-800">{value.userId[0].firstName + ' ' + value.userId[0].lastName}</div>
                                <div className="text-sm text-gray-500">{value.userId[0].emailAddress}</div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="">
                                <div className="text-sm font-medium text-gray-800">{value.firstName + ' ' + value.lastName}</div>
                                <div className="text-sm text-gray-500">{value.emailAddress}</div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value.collectionId ? Moment(value.collectionId[0].dateTimeFrom).format("DD/MM/YYYY HH:mm:ssa") + ' - ' + Moment(value.collectionId[0].dateTimeTo).format("DD/MM/YYYY HH:mm:ssa") : null}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value.delivery}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value.instructions}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value.country}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value.streetAddress}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value.county}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value.postalCode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value.status}</td>
                    <td className="whitespace-nowrap text-right text-sm font-medium px-4">
                        <Link to={'/dashboard/orders/lines/?headerId='+value._id} className="text-indigo-600 hover:text-indigo-800">
                            View Lines
                        </Link>
                    </td>
                    <td className="pr-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => this.removeOrder(value._id)} className="text-red-600 hover:text-red-800">
                            Remove
                        </button>
                    </td>
            </tr>;
        });

    }

    //render login component
    render() {

        return (
            <div>
                {/* <div className="flex flex-col mx-auto w-40 mt-4">
                    <Link to="/dashboard/users/create" className="m-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base text-white bg-indigo-600 hover:bg-indigo-700">
                    Create User
                    </Link>
                </div> */}

                <div className="flex flex-col">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 my-4">Order Headers</h1>

                {this.state.loading && (

                    <Spinner />

                )}

                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-indigo-200">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Order ID</th>    
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Username</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Full Name/Email Address</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Billing Full Name/Email Address</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">dateTimeFrom - dateTimeTo</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Delivery</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Instructions</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Country</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Street Address</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">City</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">County</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Postal Code</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Total</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Status</th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">View Lines</span>
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Remove</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-white divide-y divide-gray-200">
                            {this.getOrderHtml()}
                        </tbody>
                        </table>                        
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );

    }

}