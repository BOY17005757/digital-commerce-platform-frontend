//import packages
import React, { Component } from 'react';

import { LockClosedIcon } from '@heroicons/react/solid';
import "../styles/tailwind.generated.css";

import {Link} from 'react-router-dom';
import { Helmet } from "react-helmet";

import ErrorAlert from "./erroralert.component";

//import service
import AuthenticationService from '../services/authentication.service';

//define login class
export default class SignIn extends Component {

  //login constructor
  constructor(props) {

    //allow access to props within constructor
    super(props);

    //assign default state
    this.state = {

      username: '',
      password: '',
      loading: false,
      showInvalidCredMessage: false,
      showErrorMessage: false,
      message: '',
      currentUser: AuthenticationService.getCurrentUser(),
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

  //form submit on login
  onSubmit(event) {

    //prevent browser refresh after submit
    event.preventDefault();

    var self = this;

    this.setState({

      message: '',
      loading: true

    });

    AuthenticationService.login(this.state.username, this.state.password)
      .then(function (user) {

        if (!user.username) {

          self.setState({

            showInvalidCredMessage: true,
            message: user.data.message

          });

        } else {

          self.setState({

            showErrorMessage: false,
            showInvalidCredMessage: false,
            redirect: '/'

          });

          self.props.loginCallBack();

        }

      })
      .catch(function (error) {

        console.error(error);

        self.setState({

          showErrorMessage: true

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

    return (
      <div>
      <Helmet>
            <title>Digital-Commerce | Sign in to your Account</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg py-16 px-20">

        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="./templateLogo.png"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-4"
                  placeholder="Email address"
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
                  className="appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <ErrorAlert/>

            <div className="flex items-center justify-between">
              {/* <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div> */}

              <div className="text-sm">
                <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Don't have an account? Click here
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
        </div>
        {/* </section> */}
      </div>
      </div>
    );
  }
}