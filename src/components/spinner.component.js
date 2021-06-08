//import packages
import React, { Component } from 'react';

//import styles
import "../styles/tailwind.generated.css";
import { Ring } from 'react-awesome-spinners';

//define spinner class
export default class Spinner extends Component {

  //render spinner component
  render() {

    return (
      <div className="mx-auto mt-4">
        <Ring color={'#4f46e5'} />
      </div>
    );

  }

}