//import packages
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Moment from 'moment';

//import styles
import "../styles/tailwind.generated.css";
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChartBarIcon, MenuIcon, XIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';

//import services
import AuthenticationService from "../services/authentication.service";

//define products propdown
const products = [
    {
      name: 'All Products',
      description: 'View all products available.',
      href: '/products',
      icon: ChartBarIcon,
    },
  ]

//generate class names
function classNames(...classes) {

  return classes.filter(Boolean).join(' ')

}

//define header class
export default class Header extends Component {

  //header constructor
  constructor(props) {

    //allow access to props within constructor
    super(props);

    //assign default state
    this.state = {

      currentDate: new Date(),
      timestamp: Moment(new Date()).format("HH:mm:ssa"),
      redirect: null

    };

    //bind listeners
    this.signOut = this.signOut.bind(this);

  }

  //sign out user
  signOut() {

    //logout user
    AuthenticationService.signOut();

    this.setState({

      redirect: '/signin'

    }, function () {

      //prop callback to update navbar
      this.props.navCallBack();

    });

  }

  //render header component
  render() {

    //handle redirect url
    if(this.state.redirect) {

      return <Redirect to={this.state.redirect} />;

    }

    return (
    <Popover className="relative bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center border-gray-100 py-6 md:justify-start md:space-x-10">
                <Link to="/">
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="./logo.png"
                    alt=""
                  />
              </Link>
              <Link to="/" className="text-base font-medium text-white hover:text-gray-400">
                Home
              </Link>
              <div className="-mr-2 -my-2 md:hidden">
                <Popover.Button className="bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <Popover.Group as="nav" className="hidden md:flex space-x-10">
                <Popover className="relative z-40">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? 'text-gray-500' : 'text-white',
                          'group rounded-md inline-flex items-center text-base font-medium hover:text-gray-400 focus:outline-none'
                        )}
                      >
                        <span>Products</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? 'text-gray-500' : 'text-white',
                            'ml-2 h-5 w-5 group-hover:text-black'
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel
                          static
                          className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                        >
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative grid gap-6 bg-gray-800 px-5 py-6 sm:gap-8 sm:p-8">
                              {products.map((item) => (
                                <Link key={item.href}
                                      to={item.href}
                                      className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-900"
                                >
                                <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true"/>
                                <div className="ml-4">
                                <p className="text-base font-medium text-white">{item.name}</p>
                                <p className="mt-1 text-sm text-white">{item.description}</p>
                                </div>

                                </Link>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
                <Link to="/about" className="text-base font-medium text-white hover:text-gray-400">
                    About
                </Link>
                <Link to="/contact" className="text-base font-medium text-white hover:text-gray-400">
                    Contact
                </Link>
              </Popover.Group>
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                {this.props.adminUser && (

                  <Link to="/dashboard/users" className="whitespace-nowrap text-base font-medium text-white hover:text-gray-400">
                    Dashboard
                  </Link>

                )}
                {!this.props.user && (
                  <Link to="/signin" className="whitespace-nowrap text-base font-medium text-white hover:text-gray-400">
                    Sign in
                  </Link>
                )}
                {!this.props.user && (
                  <Link to="/signup" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Sign up
                  </Link>
                )}
                {this.props.user && (
                  <Link to="/shoppingcart" className="whitespace-nowrap text-base font-medium text-white hover:text-gray-400 flex items-center">
                      <ShoppingCartIcon className="flex-shrink-0 h-8 w-8 text-indigo-600 ml-8" aria-hidden="true" />
                      <span className="ml-2 text-base font-medium text-white hover:text-gray-400">Shopping Cart</span>
                  </Link>
                )}
                {this.props.user && (
                  <button onClick={this.signOut} className="whitespace-nowrap text-base font-medium text-white hover:text-gray-400 mx-8">
                    Sign out
                  </button>
                )}
              </div>
            </div>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              static
              className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-40"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-gray-800 divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between">
                    <Link to="/">
                      <img
                        className="h-8 w-auto"
                        src="./logo.png"
                        alt=""
                      />
                    </Link>
                    <div className="-mr-2">
                      <Popover.Button className="bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-400 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-8">
                      {products.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-900"
                        >
                          <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                          <span className="ml-3 text-base font-medium text-white hover:text-gray-400">{item.name}</span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5 space-y-6">
                  <div className="grid grid-cols-1 gap-y-4 gap-x-8">
                    <Link to="/about" className="whitespace-nowrap text-base font-medium text-white hover:text-gray-400 hover:bg-gray-900 p-2">
                        About
                    </Link>
                    <Link to="/contact" className="whitespace-nowrap text-base font-medium text-white hover:text-gray-400 hover:bg-gray-900 p-2">
                        Contact
                    </Link>                
                    {this.props.adminUser && (
                    <Link to="/dashboard/users" className="whitespace-nowrap text-base font-medium text-white hover:text-gray-400 hover:bg-gray-900 p-2">
                      Dashboard
                    </Link>
                    )}
                    {this.props.user && (
                    <Link to="/shoppingcart" className="whitespace-nowrap text-base font-medium text-white hover:text-gray-400 flex items-center p-2">
                        <ShoppingCartIcon className="flex-shrink-0 h-8 w-8 text-indigo-600" aria-hidden="true" />
                        <span className="ml-2 text-base font-medium text-white hover:text-gray-400">Shopping Cart</span>
                    </Link>
                    )}
                    {this.props.user && (
                    <>
                    <button onClick={this.signOut} className="whitespace-nowrap text-base font-medium text-white hover:text-gray-400 hover:bg-gray-900 p-2">
                      Sign out
                    </button>
                    </>
                    )}
                  </div>
                  <div>
                  {!this.props.user && (
                  <Link to="/signup"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Sign up
                  </Link>
                  )}
                  {!this.props.user && (
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?{' '}
                    <Link to="/signin" className="text-indigo-600 hover:text-indigo-500">
                      Sign in
                    </Link>
                  </p>
                  )}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
    );

  }

}