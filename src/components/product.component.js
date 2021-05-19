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
            <title>Social-Link | Products</title>
        </Helmet>
        <div className="relative bg-gray-200 overflow-hidden min-h-screen">

        <section class="relative w-full max-w-md px-5 py-4 rounded-md ml-auto mt-4">
            <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </span>

                <input type="text" class="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-md" placeholder="Search"/>
            </div>

            {/* <div class="absolute inset-x-0 px-6 py-3 mx-5 mt-4 overflow-y-auto bg-white border border-gray-300 rounded-md max-h-72 dark:bg-gray-800 dark:border-transparent">
                <a href="#" class="block py-1">
                    <h3 class="font-medium text-gray-700 dark:text-gray-100 hover:underline">Software engineer</h3>
                    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">02/04/2020</p>
                </a>
            </div> */}
        </section>

        <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            <div class="rounded overflow-hidden shadow-lg bg-white">
                <img class="w-full" src="https://dummyimage.com/420x260" alt="Mountain"/>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Mountain</div>
                    <p class="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                    <p class="mt-4 font-bold text-2xl">£16.00</p>
                </div>
                <div class="px-6 pb-4">
                    <Link to="/products/1" className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                    View
                    </Link>
                </div>
            </div>

            <div class="rounded overflow-hidden shadow-lg bg-white">
                <img class="w-full" src="https://dummyimage.com/420x260" alt="River"/>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">River</div>
                    <p class="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                    <p class="mt-4 font-bold">£16.00</p>
                </div>
                {/* <div class="px-6 pt-4 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#summer</span>
                </div> */}
            </div>

            <div class="rounded overflow-hidden shadow-lg bg-white">
                <img class="w-full" src="https://dummyimage.com/420x260" alt="Forest"/>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Forest</div>
                    <p class="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                    <p class="mt-4 font-bold">£16.00</p>
                </div>
                {/* <div class="px-6 pt-4 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#fall</span>
                </div> */}
            </div>

            <div class="rounded overflow-hidden shadow-lg bg-white">
                <img class="w-full" src="https://dummyimage.com/420x260" alt="Forest"/>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Forest</div>
                    <p class="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                    <p class="mt-4 font-bold">£16.00</p>
                </div>
                {/* <div class="px-6 pt-4 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#fall</span>
                </div> */}
            </div>

            <div class="rounded overflow-hidden shadow-lg bg-white">
                <img class="w-full" src="https://dummyimage.com/420x260" alt="Forest"/>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Forest</div>
                    <p class="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                    v
                </div>
                {/* <div class="px-6 pt-4 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#fall</span>
                </div> */}
            </div>

            <div class="rounded overflow-hidden shadow-lg bg-white">
                <img class="w-full" src="https://dummyimage.com/420x260" alt="Forest"/>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Forest</div>
                    <p class="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                    <p class="mt-4 font-bold">£16.00</p>
                </div>
                {/* <div class="px-6 pt-4 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#fall</span>
                </div> */}
            </div>
        </div>
        </div>
    </div>
    );

  }

}