//import packages
import React, { Component } from 'react';
import Moment from 'moment';

//import styles
import "../styles/tailwind.generated.css";

//import component
import Spinner from "./spinner.component";

//import services
import AuthenticationService from "../services/authentication.service";
import ContactService from '../services/contact.service';

//define dashboard contact class
export default class DashboardContact extends Component {

    //dashboard contact constructor
    constructor(props) {

        //allow access to props within constructor
        super(props);

        //assign default state
        this.state = {

            currentUser: AuthenticationService.getCurrentUser(),
            contactMessages: {},
            redirect: null,
            loading: false

        };

    }

    //invoked after component is mounted
    componentDidMount() {

        //call get contact messages function
        this.getContactMessages();

    }

    //get contact messages
    getContactMessages() {

        var self = this;

        if (self.state.currentUser) {

            self.setState({
                loading: true
            });

            ContactService.getContactMessages()
            .then(function (contact) {

                self.setState({

                    contactMessages: contact.data,
                    loading: false

                });

            })
            .catch(function (error) {

                self.setState({

                    message: "No contact messages found.",
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

    //delete contact message
    removeContactMessage(contactid) {

        var self = this;

        ContactService.removeContactMessage(contactid)
            .then(function (contact) {

                //call contact messages function
                self.getContactMessages();

            })
            .catch(function (error) {

                console.error(error);

            });

    }

    //loop and generate contact messages html
    getContactHtml() {

        var self = this;

        return Object.entries(self.state.contactMessages).map(([key, value]) => {

            return <tr key={key}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value.userId ? value.userId[0].username : null}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="">
                            <div className="text-sm font-medium text-gray-800">{value.name}</div>
                            <div className="text-sm text-gray-500">{value.emailAddress}</div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-800">{value.message}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-800">{Moment(value.createdAt).format("DD/MM/YYYY HH:mm")}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => this.removeContactMessage(value._id)} className="text-red-600 hover:text-red-800">
                        Remove
                    </button>
                </td>
                </tr>;

        });

    }

    //render dashboard contact component
    render() {

        return (
            <div>
                <div className="flex flex-col">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 my-4">Contact Messages</h1>
                {this.state.loading && (
                    <Spinner />
                )}
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-indigo-200">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Contact ID</th>    
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Username</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Message</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Creation Date</th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-white divide-y divide-gray-200">
                            {this.getContactHtml()}
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