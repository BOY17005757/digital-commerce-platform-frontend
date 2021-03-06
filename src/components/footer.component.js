//import packages
import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Moment from 'moment';

//import styles
import "../styles/tailwind.generated.css";

//define footer class
export default class Footer extends Component {

  //footer constructor
  constructor(props) {

    //allow access to props within constructor
    super(props);

    //assign default state
    this.state = {

      currentDate: new Date()

    };

  }

  //render footer component
  render() {

    return (
      <footer className="inset-x-0 footer-1 py-8 sm:py-1 bg-gray-800">
          <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
              <Link to="/" className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                <img className="h-8 w-auto sm:h-6"
                    src="./logo.png"
                    alt=""
                />
                <span className="ml-3 text-xl">{this.props.manifest.name}</span>
              </Link>
              <p className="text-sm text-white sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">&copy; {Moment(this.state.currentDate).format("YYYY")} {this.props.manifest.name}
              </p>
          </div>
      </footer>
    );

  }

}