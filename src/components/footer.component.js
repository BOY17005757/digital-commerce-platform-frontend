//import packages
import React, { Component } from 'react';

import "../styles/tailwind.generated.css";

import {Link} from 'react-router-dom';

//define login className
export default class Footer extends Component {

  //render login component
  render() {

    return (
        // <footer classNameName="absolute inset-x-0 bottom-0 h-10 bg-blue-500">Footer</footer>

    //     <footer className="inset-x-0 footer-1 py-8 sm:py-12 bg-gray-800">
    //         <div className="container mx-auto px-4">
    //         <div className="sm:flex sm:flex-wrap sm:-mx-4 md:py-4">
    //             <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6">
    //                 <h5 className="text-xl font-bold mb-6 text-white">Products</h5>
    //                 <ul className="list-none footer-links">
    //                 <li className="mb-2">
    //                     <Link to="/" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800 text-white">All Products</Link>
    //                 </li>
    //                 {/* <li className="mb-2">
    //                     <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Random feature</a>
    //                 </li>
    //                 <li className="mb-2">
    //                     <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Team feature</a>
    //                 </li>
    //                 <li className="mb-2">
    //                     <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Stuff for developers</a>
    //                 </li>
    //                 <li className="mb-2">
    //                     <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Another one</a>
    //                 </li>
    //                 <li className="mb-2">
    //                     <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Last time</a>
    //                 </li> */}
    //                 </ul>
    //             </div>
    //             <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 sm:mt-0">
    //                 <h5 className="text-xl font-bold mb-6 text-white">Resources</h5>
    //                 <ul className="list-none footer-links">
    //                 <li className="mb-2">
    //                     <Link href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800 text-white">Resource</Link>
    //                 </li>
    //                 {/* <li className="mb-2">
    //                     <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Resource name</a>
    //                 </li>
    //                 <li className="mb-2">
    //                     <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Another resource</a>
    //                 </li>
    //                 <li className="mb-2">
    //                     <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Final resource</a>
    //                 </li> */}
    //                 </ul>
    //             </div>
    //             <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
    //                 <h5 className="text-xl font-bold mb-6 text-white">About</h5>
    //                 <ul className="list-none footer-links">
    //                 <li className="mb-2">
    //                     <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800 text-white">Team</a>
    //                 </li>
    //                 {/* <li className="mb-2">
    //                     <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Locations</a>
    //                 </li>
    //                 <li className="mb-2">
    //                     <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Privacy</a>
    //                 </li>
    //                 <li className="mb-2">
    //                     <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Terms</a>
    //                 </li> */}
    //                 </ul>
    //             </div>
    //             {/* <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
    //                 <h5 className="text-xl font-bold mb-6">Help</h5>
    //                 <ul className="list-none footer-links">
    //                 <li className="mb-2">
    //                     <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Support</a>
    //                 </li>
    //                 <li className="mb-2">
    //                     <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Help Center</a>
    //                 </li>
    //                 <li className="mb-2">
    //                     <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Contact Us</a>
    //                 </li>
    //                 </ul>
    //             </div>
    //             <div className="px-4 mt-4 sm:w-1/3 xl:w-1/6 sm:mx-auto xl:mt-0 xl:ml-auto">
    //                 <h5 className="text-xl font-bold mb-6 sm:text-center xl:text-left">Stay connected</h5>
    //                 <div className="flex sm:justify-center xl:justify-start">
    //                 <a href="" className="w-8 h-8 border border-2 border-gray-400 rounded-full text-center py-1 text-gray-600 hover:text-white hover:bg-blue-600 hover:border-blue-600">
    //                     <i className="fab fa-facebook"></i>
    //                 </a>
    //                 <a href="" className="w-8 h-8 border border-2 border-gray-400 rounded-full text-center py-1 ml-2 text-gray-600 hover:text-white hover:bg-blue-400 hover:border-blue-400">
    //                     <i className="fab fa-twitter"></i>
    //                 </a>
    //                 <a href="" className="w-8 h-8 border border-2 border-gray-400 rounded-full text-center py-1 ml-2 text-gray-600 hover:text-white hover:bg-red-600 hover:border-red-600">
    //                     <i className="fab fa-google-plus-g"></i>
    //                 </a>
    //                 </div>
    //             </div> */}
    //             </div>

    //             {/* <div className="sm:flex sm:flex-wrap sm:-mx-4 mt-6 pt-6 sm:mt-12 sm:pt-12 border-t">
    //             <div className="sm:w-full px-4 md:w-1/6">
    //                 <strong>FWR</strong>
    //             </div>
    //             <div className="px-4 sm:w-1/2 md:w-1/4 mt-4 md:mt-0">
    //                 <h6 className="font-bold mb-2">Address</h6>
    //                 <address className="not-italic mb-4 text-sm">
    //                 123 6th St.<br>
    //                 Melbourne, FL 32904
    //                 </address>
    //             </div>
    //             <div className="px-4 sm:w-1/2 md:w-1/4 mt-4 md:mt-0">
    //                 <h6 className="font-bold mb-2">Free Resources</h6>
    //                 <p className="mb-4 text-sm">Use our HTML blocks for <strong>FREE</strong>.<br>
    //                 <em>All are MIT License</em></p>
    //             </div>
    //             <div className="px-4 md:w-1/4 md:ml-auto mt-6 sm:mt-4 md:mt-0">
    //                 <button className="px-4 py-2 bg-purple-800 hover:bg-purple-900 rounded text-white">Get Started</button>
    //             </div>
    //             </div> */}
    //     </div>
    // </footer>

    // <footer class="text-white bg-gray-800 body-font absolute inset-x-0 bottom-0 h-10">
    <footer className="inset-x-0 footer-1 py-8 sm:py-1 bg-gray-800">
        <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
            <a class="flex title-font font-medium items-center md:justify-start justify-center text-white">
            <img
                className="h-8 w-auto sm:h-6"
                src="./templateLogo.png"
                alt=""
            />
            <span class="ml-3 text-xl">digital-commerce-platform</span>
            </a>
            <p class="text-sm text-white sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2021 digital-commerce-platform
            {/* <a href="https://twitter.com/knyttneve" class="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@knyttneve</a> */}
            </p>
            {/* <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a class="text-gray-500">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
            </a>
            <a class="ml-3 text-gray-500">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
            </a>
            <a class="ml-3 text-gray-500">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
            </a>
            <a class="ml-3 text-gray-500">
                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
            </a>
            </span> */}
        </div>
    </footer>

    );

  }

}