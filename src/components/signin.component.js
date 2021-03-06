//import packages
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Helmet } from "react-helmet";
import {Redirect} from 'react-router-dom';

//import styles
import "../styles/tailwind.generated.css";
import { LockClosedIcon } from '@heroicons/react/solid';

//import component
import ErrorAlert from "./erroralert.component";

//import service
import AuthenticationService from '../services/authentication.service';

//define sign in class
export default class SignIn extends Component {

  //sign in constructor
  constructor(props) {

    //allow access to props within constructor
    super(props);

    //assign default state
    this.state = {

      username: '',
      emailAddress: '',
      password: '',
      loading: false,
      showErrorAlert: false,
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

  //handle form entry
  handleChange(event) {

    this.setState({

      [event.target.id]: event.target.value

    });

  }

  //form submit on login
  onSubmit(event) {

    //prevent browser refresh after submit
    event.preventDefault();

    var self = this;

    self.setState({

      message: '',
      loading: true

    });

    AuthenticationService.signIn(self.state.emailAddress, self.state.password)
      .then(function (user) {

        if (!user.emailAddress) {

          self.setState({

            showErrorAlert: true,
            message: user.data.message

          });

        } else {

          self.setState({

            showErrorAlert: false,
            redirect: '/'

          });

          self.props.loginCallBack();

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

  //render sign in component
  render() {

    //handle redirect url
    if (this.state.redirect) {

      return <Redirect to = {
        this.state.redirect
      }
      />;

    }

    return (
      <div>
      <Helmet>
        <title>{`${this.props.manifest.name}`} | Sign in to your Account</title>
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
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <form onSubmit={this.onSubmit.bind(this)} className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="emailAddress" className="sr-only">
                  Email address
                </label>
                <input
                  id="emailAddress"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-4"
                  placeholder="Email address"
                  value={this.state.emailAddress}
                  onChange={this.handleChange.bind(this)}
                  autoFocus
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
                  value={this.state.password}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
            </div>
            {this.state.showErrorAlert && (

              <ErrorAlert message={this.state.message} />

            )}
            <div className="flex items-center justify-between">
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
      </div>
      </div>
    );
  }
}