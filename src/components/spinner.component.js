//import packages
import React, { Component } from 'react';

import { Ring } from 'react-awesome-spinners';

import "../styles/tailwind.generated.css";

//define login class
export default class Spinner extends Component {

  //render login component
  render() {

    return (
      <div className="mx-auto mt-4">
        <Ring color={'#4f46e5'} />
      </div>
    );

    }

}