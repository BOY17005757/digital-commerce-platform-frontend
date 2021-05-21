//import packages
import React, { Component } from 'react';

import "../styles/tailwind.generated.css";

//define login class
export default class Login extends Component {

  //render login component
  render() {

    return (
        <div>
            <section className="bg-gray-100 dark:bg-gray-900 lg:py-12 lg:flex lg:justify-center">
            <div className="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:py-6 mt-6 lg:mt-0">
                        {/* <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2> */}
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Sample Product</h1>
                        <p className="leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus.</p>
                        <div className="flex items-center pb-5 border-b-2 border-gray-100 mb-5"/>
                        <div className="w-20 h-10 mt-4">
                            <span className="title-font font-bold text-xl text-gray-900">Quantity</span>
                            <div className="relative flex flex-row w-full h-8 mt-2">
                                <input type="number" value="1" class="w-full font-medium text-center text-gray-900 bg-gray-200 outline-none" />
                            </div>
                        </div>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"/>
                        <span className="title-font font-bold text-xl text-gray-900">Price</span>
                        <div className="flex">
                            <span className="title-font font-medium text-2xl text-gray-900">£16.00</span>
                            <button className="flex ml-auto whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded lg:pl-10 " src="https://dummyimage.com/400x400"/>
                    </div>
                </div>
                </div>
            </section>
        </div>
    );

  }

}