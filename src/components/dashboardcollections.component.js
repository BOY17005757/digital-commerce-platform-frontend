//import packages
import React, { Component } from 'react';
import Moment from 'moment';
import {Link} from 'react-router-dom';

//import styles
import "../styles/tailwind.generated.css";

//import component
import Spinner from "./spinner.component";

//import services
import AuthenticationService from "../services/authentication.service";
import CollectionService from '../services/collection.service';

//define dashboard collections class
export default class DashboardCollections extends Component {

    //dashboard collections constructor
    constructor(props) {

        //allow access to props within constructor
        super(props);

        //assign default state
        this.state = {

            currentUser: AuthenticationService.getCurrentUser(),
            collections: {},
            redirect: null,
            loading: false

        };

    }

    //invoked after component is mounted
    componentDidMount() {

        //call get collections function
        this.getCollections();

    }

    //get all collections
    getCollections() {

        var self = this;

        if (self.state.currentUser) {

            self.setState({
                loading: true
            });

            CollectionService.getCollections()
            .then(function (collections) {

                self.setState({

                    collections: collections.data,
                    loading: false

                });

                console.log(collections.data)

            })
            .catch(function (error) {

                self.setState({

                    message: "No collections found.",
                    // showInvalidPost: true,
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

    //delete collection
    removeCollection(collectionid) {

        var self = this;

        CollectionService.removeCollection(collectionid)
            .then(function (collection) {

                self.getCollections();

            })
            .catch(function (error) {

                console.error(error);

            });

    }

    //loop and generate collections html
    getCollectionHtml() {

        var self = this;

        return Object.entries(self.state.collections).map(([key, value]) => {
        
            return <tr key={key}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{Moment(value.dateTimeFrom).format("DD/MM/YYYY HH:mm:ssa")}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{Moment(value.dateTimeTo).format("DD/MM/YYYY HH:mm:ssa")}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => this.removeCollection(value._id)} className="text-red-600 hover:text-red-800">
                        Remove
                    </button>
                </td>
            </tr>;
        });

    }

    //render dashboard collections component
    render() {

        return (
            <div>
                <div className="flex flex-col mx-auto w-40 mt-4">
                    <Link to="/dashboard/collections/create" className="m-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base text-white bg-indigo-600 hover:bg-indigo-700">
                    Create Collection
                    </Link>
                </div>
                <div className="flex flex-col">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 my-4">Collections</h1>
                {this.state.loading && (

                    <Spinner />

                )}
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-indigo-200">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Collection ID</th>    
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Date & Time From</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Date & Time To</th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Remove</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-white divide-y divide-gray-200">
                            {this.getCollectionHtml()}
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