//import packages
import React, { Component } from 'react';

import WelcomeBanner from "./welcomebanner.component";

import "../styles/tailwind.generated.css";

import { Helmet } from "react-helmet";

//define login class
export default class Dashboard extends Component {

  //render login component
  render() {

    return (
        <div>
          <Helmet>
                <title>Social-Link | Dashboard</title>
            </Helmet>
            <WelcomeBanner/>
            <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8"></div>
        </div>
            
    );

  }

}