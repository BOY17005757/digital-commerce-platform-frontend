//import packages
import React, { Component } from 'react';

import "../styles/tailwind.generated.css";

import {Link} from 'react-router-dom';

import { Helmet } from "react-helmet";

//define login class
export default class Product extends Component {

  //render login component
  render() {

    return (<div>
        <Helmet>
            <title>Digital-Commerce | Product Details</title>
        </Helmet>
        <div className="relative bg-gray-200 overflow-hidden min-h-screen">

        <section className="relative w-full max-w-md px-5 py-4 rounded-md ml-auto mt-4">
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </span>

                <input type="text" className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-md" placeholder="Search"/>
            </div>
        </section>

        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            <div className="rounded overflow-hidden shadow-lg bg-white">
                <img className="w-full" src="https://dummyimage.com/420x260" alt="Mountain"/>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Mountain</div>
                    <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                    <p className="mt-4 font-bold text-2xl">£16.00</p>
                </div>
                <div className="px-6 pb-4">
                    <Link to="/products/view/1" className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                    View Product
                    </Link>
                </div>
            </div>

            <div className="rounded overflow-hidden shadow-lg bg-white">
                <img className="w-full" src="https://dummyimage.com/420x260" alt="River"/>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">River</div>
                    <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                    <p className="mt-4 font-bold">£16.00</p>
                </div>
            </div>

            <div className="rounded overflow-hidden shadow-lg bg-white">
                <img className="w-full" src="https://dummyimage.com/420x260" alt="Forest"/>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Forest</div>
                    <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                    <p className="mt-4 font-bold">£16.00</p>
                </div>
            </div>

            <div className="rounded overflow-hidden shadow-lg bg-white">
                <img className="w-full" src="https://dummyimage.com/420x260" alt="Forest"/>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Forest</div>
                    <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                    <p className="mt-4 font-bold">£16.00</p>
                </div>
            </div>

            <div className="rounded overflow-hidden shadow-lg bg-white">
                <img className="w-full" src="https://dummyimage.com/420x260" alt="Forest"/>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Forest</div>
                    <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                    v
                </div>
            </div>

            <div className="rounded overflow-hidden shadow-lg bg-white">
                <img className="w-full" src="https://dummyimage.com/420x260" alt="Forest"/>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Forest</div>
                    <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                    <p className="mt-4 font-bold">£16.00</p>
                </div>
            </div>
        </div>
        </div>
    </div>
    );

  }

}