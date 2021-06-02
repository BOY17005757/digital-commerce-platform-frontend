//import packages
import React, { Component } from 'react';

import { LockClosedIcon } from '@heroicons/react/solid';
import "../styles/tailwind.generated.css";

import ErrorAlert from "./erroralert.component";

import { Helmet } from "react-helmet";

import { Redirect } from "react-router-dom";

//import service
import AuthenticationService from '../services/authentication.service';

//define login class
export default class SignIn extends Component {

  //register constructor
  constructor(props) {

    //allow access to props within constructor
    super(props);

    //assign default state
    this.state = {

        firstName: '',
        lastName:'',
        emailAddress: '',
        username: '',
        password: '',
        loading: false,
        // showInvalidCredMessage: false,
        showErrorAlert: false,
        message: '',
        currentUser: AuthenticationService.getCurrentUser(),
        passwordConfirm: '',
        redirect: null

    };

  }

  //invoked after component is mounted
  componentDidMount() {

    //check user is logged in
    if (this.state.currentUser) {

        this.setState({
            redirect: '/'
        });

    }

  }

  //handle form entry
  handleChange(event) {

      this.setState({

          [event.target.id]: event.target.value

      }, function() {

        if(event.target.id === "passwordConfirm") {

          this.passwordCheck();
    
        }

      });

      

  }

//validate password
passwordCheck() {

  var self = this;

  if (self.state.password.length >= 10) {

      if (self.state.password === self.state.passwordConfirm) {

          self.setState({

            showErrorAlert: false,
            message: null

          });

          return true;

      } else {

          self.setState({

              showErrorAlert: true,
              message: "Passwords do not match.",
              loading: false

          });

          return false;

      }

  } else {

      self.setState({

          showErrorAlert: true,
          message: "Password must be more than 10 characters.",
          loading: false

      });

      return false;

  }

}

//form submit on register
onSubmit(event) {

  //prevent browser refresh after submit
  event.preventDefault();

  var self = this;

  this.setState({

      message: '',
      loading: true

  });

  if (this.passwordCheck()) {

      AuthenticationService.signUp(this.state.firstName, this.state.lastName, this.state.username, this.state.emailAddress, this.state.password)
          .then(function (user) {

              if (!user.username) {

                  self.setState({

                      showErrorAlert: true,
                      message: user.data.message

                  });

              } else {

                  self.setState({

                      showErrorAlert: false,
                      redirect: '/signin'

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
          <title>{`${this.props.manifest.name}`} | Sign up for an Account</title>
        </Helmet>
        <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg py-16 px-20">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="./logo.png"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for an account</h2>
          </div>

          <form onSubmit={this.onSubmit.bind(this)} className="mt-8 space-y-6">
          {/* <form className="mt-8 space-y-6" action="#" method="POST"> */}
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
            <div clasName="my-8">
                <label htmlFor="firstName" className="sr-only">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                //   autoComplete="email"
                  required
                  className="appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-4"
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={this.handleChange.bind(this)}
                  autoFocus
                />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                //   autoComplete="email"
                  required
                  className="appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-4"
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-4"
                  placeholder="Email address"
                  value={this.state.emailAddress}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-4"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-4"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div>
                <label htmlFor="passwordConfirm" className="sr-only">
                  Password
                </label>
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-4"
                  placeholder="Confirm Password"
                  value={this.state.passwordConfirm}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
            </div>

            {this.state.showErrorAlert && (

              <ErrorAlert message={this.state.message} />

            )}

        {/* <div class="relative pt-1">
          <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
            <div style="width:30%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
          </div>
        </div> */}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
      </div>
        
    );

  }

}