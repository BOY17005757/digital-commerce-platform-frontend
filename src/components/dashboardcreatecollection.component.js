//import packages
import React, { Component, useState } from 'react';

import "../styles/tailwind.generated.css";

import { LockClosedIcon } from '@heroicons/react/solid';

import ErrorAlert from "./erroralert.component";

import {Link} from 'react-router-dom';

import { Redirect } from "react-router-dom";

import DateTimePicker from 'react-datetime-picker';

//import service
import AuthenticationService from '../services/authentication.service';
import ProductService from '../services/product.service';
import CollectionService from '../services/collection.service';

//define login class
export default class DashboardCreateCollection extends Component {

    //register constructor
    constructor(props) {

        //allow access to props within constructor
        super(props);

        //assign default state
        this.state = {
            loading: false,
            showErrorAlert: false,
            message: '',
            currentUser: AuthenticationService.getCurrentUser(),
            redirect: null,
            dateTimeFrom: new Date(),
            dateTimeTo: new Date()

        };

    }

    handleDateTimeFrom(value) {

        console.log(value)

        this.setState({
            dateTimeFrom: value
        })

    }

    handleDateTimeTo(value) {

        this.setState({
            dateTimeTo: value
        })

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

        CollectionService.createCollection(self.state.dateTimeFrom, self.state.dateTimeTo)
            .then(function (collection) {

                if (!collection) {

                    self.setState({

                        showErrorAlert: true,
                        message: collection.data.message

                    });

                } else {

                    self.setState({

                        showErrorAlert: false,
                        redirect: '/dashboard/collections'

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
            <div className="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg py-16 px-10 w-full">
                <div className="max-w-md w-full space-y-8 mx-auto">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Collection</h2>
                </div>

                <form onSubmit={this.onSubmit.bind(this)} className="mt-8">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm">

                    <p className="leading-relaxed font-bold">Date & Time From</p>
                    <div>
                    <DateTimePicker
                        onChange={this.handleDateTimeFrom.bind(this)}
                        value={this.state.dateTimeFrom}
                        minDate={new Date()}
                        autofocus
                        showLeadingZeros={true}
                        required
                        className="w-full my-4 bg-white"
                        calendarClassName="z-40"
                        clockClassName="z-40"
                    />
                    </div>

                    <div>
                    <p className="leading-relaxed font-bold">Date & Time To</p>
                    <DateTimePicker
                        onChange={this.handleDateTimeTo.bind(this)}
                        value={this.state.dateTimeTo}
                        minDate={this.state.dateTimeFrom}
                        showLeadingZeros={true}
                        required
                        className="w-full my-4"
                        calendarClassName="z-40"
                        clockClassName="z-40"
                    />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-4"
                        >
                            Create
                        </button>
                    </div>
                    <div className="">
                        <Link to="/dashboard/collections" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-4">
                        Back
                        </Link>
                    </div>
                    </div>
                </form>
                </div>
        </div>
      </div>
    );

  }

}