//import packages
import React, { Component } from 'react';

import "../styles/tailwind.generated.css";

import { Helmet } from "react-helmet";

//define login class
export default class About extends Component {

  //render login component
  render() {

    return (
        <div>
        <Helmet>
            <title>{`${this.props.manifest.name}`} | About</title>
        </Helmet>
        <div className="relative bg-gray-200 overflow-hidden">
            <section className="bg-gray-100 dark:bg-gray-900 lg:py-12 lg:flex lg:justify-center">
                <div className="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
                    <div className="lg:w-1/2">
                        <img
                            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                            src="https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80"
                            alt=""
                            />
                    </div>

                    <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl">What is <span className="text-indigo-600 dark:text-indigo-400">{this.props.manifest.name}?</span></h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem modi reprehenderit vitae exercitationem aliquid dolores ullam temporibus enim expedita aperiam mollitia iure consectetur dicta tenetur, porro consequuntur saepe accusantium consequatur.</p>
                        
                        {/* <div className="mt-8">
                            <a href="#" className="px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700">Start Now</a>
                        </div> */}
                    </div>
                </div>
            </section>

            <section className="bg-gray-100 dark:bg-gray-900 lg:py-12 lg:flex lg:justify-center">
                <div className="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg py-8 px-6">
                <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline-block w-8 h-8 text-gray-400 mb-8" viewBox="0 0 975.036 975.036">
                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="leading-relaxed text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim sit amet venenatis urna cursus eget nunc. A pellentesque sit amet porttitor eget dolor morbi non arcu. Consequat interdum varius sit amet mattis. Risus commodo viverra maecenas accumsan lacus. Ut porttitor leo a diam sollicitudin tempor id eu. Vel elit scelerisque mauris pellentesque pulvinar. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Elit ut aliquam purus sit amet luctus venenatis lectus.</p>
                <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6"></span>
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">HOLDEN CAULFIELD</h2>
                <p className="text-gray-500">Senior Product Designer</p>
                </div>
            </div>
            </section>
        </div>
        </div>
    );

  }

}