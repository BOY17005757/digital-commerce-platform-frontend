//import packages
import React, { Component } from 'react';

import "../styles/tailwind.generated.css";

import { Helmet } from "react-helmet";

import Notification from './notification.component';

import AuthenticationService from '../services/authentication.service';
import ContactService from '../services/contact.service';

//define login class
export default class Contact extends Component {

    //register constructor
    constructor(props) {

        //allow access to props within constructor
        super(props);

        //assign default state
        this.state = {

            name: '',
            emailAddress: '',
            message: '',
            loading: false,
            showNotification: false,
            notificationCounter: 0,
            currentUser: AuthenticationService.getCurrentUser(),
            redirect: null

        };

        this.tick = this.tick.bind(this);

    }

    //handle form entry
    handleChange(event) {

        this.setState({

            [event.target.id]: event.target.value

        });

    }

    //form submit on 
    onSubmit(event) {

        //prevent browser refresh after submit
        event.preventDefault();

        var self = this;

        self.setState({

            message: '',
            loading: true

        });

        var userid = !self.state.currentUser ? null : this.state.currentUser.id;

        ContactService.createContactMessage(self.state.name, self.state.emailAddress, self.state.message, userid)
            .then(function (contact) {

                self.setState({
                    name: '',
                    emailAddress: '',
                    message: ''
                }, function () {

                    self.showNotification();

                })

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

    //get current date & time
    tick() {

        this.setState({

            notificationCounter: this.state.notificationCounter + 1

        }, function () {

            if (this.state.notificationCounter >= 5) {

                this.setState({

                    showNotification: false,
                    notificationCounter: 0

                }, function () {

                    clearInterval(this.interval);

                })

            }

        });

    }

    showNotification() {

        //set tick interval to 1 second
        this.interval = setInterval(this.tick, 1000);

        this.setState({
            showNotification: true
        })

    }

  //render login component
  render() {

    return (
        <div className="min-h-screen bg-gray-100">
        <Helmet>
            <title>{`${this.props.manifest.name}`} | Contact</title>
        </Helmet>
        <div className="relative bg-gray-200 overflow-hidden">
        {this.state.showNotification && (
            <div className="relative">
                <Notification message="Your message has been sent successfully!"/>
            </div>
        )}
        <section className="bg-gray-100 dark:bg-gray-900 lg:py-12 lg:flex lg:justify-center">
            <div className="bg-white lg:shadow-lg lg:rounded-lg py-8">
                <form onSubmit={this.onSubmit.bind(this)} className="mt-8 space-y-6">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Please fill out your details below, and submit your message.</p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto px-6">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                <input type="text"
                                    id="name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange.bind(this)}
                                    className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                        <div className="relative">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email Address</label>
                            <input type="email"
                                id="emailAddress"
                                name="emailAddress"
                                value={this.state.emailAddress}
                                onChange={this.handleChange.bind(this)}
                                className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                        </div>
                        </div>
                        <div className="p-2 w-full">
                        <div className="relative">
                            <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                            <textarea id="message"
                                    name="message"
                                    value={this.state.message}
                                    onChange={this.handleChange.bind(this)}
                                    className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                        </div>
                    
                        <div className="p-2 w-full">
                        <button className="flex mx-auto text-white bg-indigo-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-700 rounded text-lg my-6">Submit</button>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                            <p className="flex flex-col items-center px-4 py-3 text-gray-700 rounded-md dark:text-gray-200 hover:bg-blue-200 dark:hover:bg-blue-500">
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span className="mt-2">121 Street, NY</span>
                            </p>

                            <p className="flex flex-col items-center px-4 py-3 text-gray-700 rounded-md dark:text-gray-200 hover:bg-blue-200 dark:hover:bg-blue-500">
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <span className="mt-2">+2499999666600</span>
                            </p>

                            <p className="flex flex-col items-center px-4 py-3 text-gray-700 rounded-md dark:text-gray-200 hover:bg-blue-200 dark:hover:bg-blue-500">
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <span className="mt-2">example@example.com</span>
                            </p>
                        </div>
                        </div>

                    </div>
                    </div>
                </form>
            </div>
        </section>
        </div>
        </div>
    );

  }

}