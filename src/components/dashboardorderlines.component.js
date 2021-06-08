//import packages
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

//import styles
import "../styles/tailwind.generated.css";

//import component
import Spinner from "./spinner.component";

//import services
import AuthenticationService from "../services/authentication.service";
import OrderService from '../services/order.service';

//define dashboard order lines class
export default class DashboardOrderLines extends Component {

    //dashboard order lines constructor
    constructor(props) {

        //allow access to props within constructor
        super(props);

        //assign default state
        this.state = {

            currentUser: AuthenticationService.getCurrentUser(),
            orderLines: {},
            redirect: null,
            loading: false,
            urlHeaderId: null

        };

    }

    //invoked after component is mounted
    componentDidMount() {

        //call get order lines function
        this.getOrderLines();

    }

    //get associated order lines
    getOrderLines() {

        var self = this;

        let search = window.location.search;
        let params = new URLSearchParams(search);
        let headerid = params.get('headerId');

        if (self.state.currentUser) {

            self.setState({
                loading: true
            });

            OrderService.getOrderLines(headerid)
            .then(function (orderLines) {

                self.setState({

                    orderLines: orderLines.data,
                    loading: false

                });

                console.log(orderLines.data)

            })
            .catch(function (error) {

                self.setState({

                    message: "No order lines found.",
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

    //loop and generate order lines
    getOrderLineHtml() {

        var self = this;

        return Object.entries(self.state.orderLines).map(([key, value]) => {
        
            return <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value.headerId[0]}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value.productId[0].name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value.productId[0].description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value.total}</td>
                    <td className="pr-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => this.removeOrderLine(value._id)} className="text-red-600 hover:text-red-800">
                            Remove
                        </button>
                    </td>
            </tr>;
        });

    }

    //delete order lines
    removeOrderLine(lineid) {

        var self = this;

        OrderService.removeOrderLine(lineid)
            .then(function (order) {

                self.getOrderLines();

            })
            .catch(function (error) {

                console.error(error);

            });

    }

  //render dashboard order lines component
  render() {

    return (
        <div>
            <div className="flex flex-col mx-auto w-40 mt-4">
                <Link to="/dashboard/orders" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Back
                </Link>
            </div>
            <div className="flex flex-col">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 my-4">Order Lines</h1>
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Line ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Product Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Product Description</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Quantity</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Price</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Total</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Remove</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-white divide-y divide-gray-200">
                        {this.getOrderLineHtml()}
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