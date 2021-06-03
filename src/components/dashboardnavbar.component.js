//import packages
import React, { Component } from 'react';

import "../styles/tailwind.generated.css";

import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import { Redirect, Link } from "react-router-dom";

const navigation = [
    { name: 'Site Management', href: '/dashboard/site' },
    { name: 'User Management', href: '/dashboard/users' },
    { name: 'Product Management', href: '/dashboard/products' },
    { name: 'Order Management', href: '/dashboard/orders' },
    { name: 'Collection Management', href: '/dashboard/collections' },
    { name: 'Contact Management', href: '/dashboard/contactmessages' }
]
  
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

//define login class
export default class DashboardNavBar extends Component {

  //administrator constructor
  constructor(props) {

    //allow access to props within constructor
    super(props);

    //assign default state
    this.state = {

      activePage: 'User Management'

    };

  }

  onClick(name,e) {

      this.setState({

        activePage: name

      })

  }

  //render login component
  render() {

    //handle redirect url
    if(this.state.redirect) {

      return <Redirect to={this.state.redirect} />;

    }

    return (
        <div>
            <Disclosure as="nav" className="bg-gray-800">
              {({ open }) => (
                <>
                  <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                      <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                        <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                          ) : (
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                          )}
                        </Disclosure.Button>
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        <div className="hidden sm:block sm:ml-6">
                          <div className="flex space-x-4">
                            {navigation.map((item) => (
                              <Link 
                              onClick={(e) => this.onClick(item.name, e)}
                              to={item.href}
                              key={item.name}
                              className={classNames(

                                item.name === this.state.activePage ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium focus:outline-none'
                              )}
                              >
                              {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Disclosure.Panel className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                      {navigation.map((item) => (
                        <Link 
                        onClick={(e) => this.onClick(item.name, e)}
                        to={item.href}
                        key={item.name}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
        </div>
    );

  }

}