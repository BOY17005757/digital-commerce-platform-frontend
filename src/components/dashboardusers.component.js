//import packages
import React, { Component } from 'react';

import "../styles/tailwind.generated.css";

import Moment from 'moment';

import {Link} from 'react-router-dom';

import Spinner from "./spinner.component";

import AuthenticationService from "../services/authentication.service";
import UserService from '../services/user.service';

//define login class
export default class DashboardUsers extends Component {

    //administrator constructor
    constructor(props) {

        //allow access to props within constructor
        super(props);

        //assign default state
        this.state = {

            currentUser: AuthenticationService.getCurrentUser(),
            users: {},
            redirect: null,
            loading: false

        };

    }

    //invoked after component is mounted
    componentDidMount() {

        //call get users function
        this.getUsers();

    }

    //get all users
    getUsers() {

        var self = this;

        if (self.state.currentUser) {

            self.setState({
                loading: true
            });

            UserService.getAdmin()
            .then(function (admin) {

                self.setState({

                    users: admin.data,
                    loading: false

                });

            })
            .catch(function (error) {

                self.setState({

                    message: "No users found.",
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

    //delete user
    removeUser(userid) {

        var self = this;

        AuthenticationService.removeUser(userid)
            .then(function (user) {

                self.getUsers();

            })
            .catch(function (error) {

                console.error(error);

            });

    }

    //loop and generate users
    getUserHtml() {

        var self = this;

        return Object.entries(self.state.users).map(([key, value]) => {

            //loop authorities for output
            var authorities = [];

            value.roleNames.forEach(function(element) {
            
                authorities.push(element.roleName);

            })
        
            return <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{value._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-800">{value.firstName + ' ' + value.lastName}</div>
                                <div className="text-sm text-gray-500">{value.emailAddress}</div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-800">{value.username}</div>
                        {/* <div className="text-sm text-gray-500">{person.department}</div> */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {value.status && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                            </span>
                        )}
                        {!value.status && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Disabled
                            </span>
                        )}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{authorities.toString().replace(',',', ')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-800">{Moment(value.createdAt).format("DD/MM/YYYY HH:mm")}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => this.removeUser(value._id)} className="text-red-600 hover:text-red-800">
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
                <div className="flex flex-col mx-auto w-40 mt-4">
                    <Link to="/dashboard/users/create" className="m-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base text-white bg-indigo-600 hover:bg-indigo-700">
                    Create User
                    </Link>
                </div>

                <div className="flex flex-col">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 my-4">Users</h1>

                {this.state.loading && (

                    <Spinner />

                )}

                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-indigo-200">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">User ID</th>    
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Full Name / Email Address</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Username</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Roles</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Creation Date</th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-white divide-y divide-gray-200">
                            {this.getUserHtml()}
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