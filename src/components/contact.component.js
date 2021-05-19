//import packages
import React, { Component } from 'react';

import "../styles/tailwind.generated.css";

import { Helmet } from "react-helmet";

//define login class
export default class Login extends Component {

  //render login component
  render() {

    return (
        <div>
        <Helmet>
            <title>Digital-Commerce | Contact</title>
        </Helmet>
        <div className="relative bg-gray-200 overflow-hidden">

        <section className="bg-gray-100 dark:bg-gray-900 lg:py-12 lg:flex lg:justify-center">
                <div className="bg-white lg:shadow-lg lg:rounded-lg py-8">

        {/* <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto bg-white"> */}
            <div class="flex flex-col text-center w-full mb-12">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
            </div>
            <div class="lg:w-1/2 md:w-2/3 mx-auto px-6">
            <div class="flex flex-wrap -m-2">
                <div class="p-2 w-1/2">
                    <div class="relative">
                        <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text" id="name" name="name" class="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                    </div>
                 </div>
                <div class="p-2 w-1/2">
                <div class="relative">
                    <label for="email" class="leading-7 text-sm text-gray-600">Email Address</label>
                    <input type="email" id="email" name="email" class="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
                </div>
                <div class="p-2 w-full">
                <div class="relative">
                    <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
                    <textarea id="message" name="message" class="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                </div>

                <div class="p-2 w-full">
                <button class="flex mx-auto text-white bg-indigo-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-700 rounded text-lg my-6">Submit</button>
                </div>
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    <p class="flex flex-col items-center px-4 py-3 text-gray-700 rounded-md dark:text-gray-200 hover:bg-blue-200 dark:hover:bg-blue-500">
                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                        </svg>

                        <span class="mt-2">121 Street, NY</span>
                    </p>

                    <p class="flex flex-col items-center px-4 py-3 text-gray-700 rounded-md dark:text-gray-200 hover:bg-blue-200 dark:hover:bg-blue-500">
                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>

                        <span class="mt-2">+2499999666600</span>
                    </p>

                    <p class="flex flex-col items-center px-4 py-3 text-gray-700 rounded-md dark:text-gray-200 hover:bg-blue-200 dark:hover:bg-blue-500">
                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>

                        <span class="mt-2">example@example.com</span>
                    </p>
                </div>
                </div>

            </div>
            </div>
        </div>
        </section>
        </div>
        </div>
    );

  }

}