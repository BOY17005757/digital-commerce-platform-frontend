//import packages
import React, { Component } from 'react';

import WelcomeBanner from "./welcomebanner.component";

import "../styles/tailwind.generated.css";

import { Helmet } from "react-helmet";

import { Redirect } from "react-router-dom";

import DashboardNavBar from "./dashboardnavbar.component";

import DashboardUsers from "./dashboardusers.component";

//import services
import AuthenticationService from '../services/authentication.service';

//define login class
export default class Dashboard extends Component {

  //administrator constructor
  constructor(props) {

    //allow access to props within constructor
    super(props);

    //assign default state
    this.state = {

        currentUser: AuthenticationService.getCurrentUser(),
        redirect: null,
        activePage: 'User Management'

    };

    this.DashboardCallBack = this.DashboardCallBack.bind(this);

  }

  //invoked after component is mounted
  componentDidMount() {

    if(!this.props.adminUser) {

      this.setState({

        redirect: '/'

      });

    }

  }

  DashboardCallBack(pageName) {

    var self = this;

    self.setState({

      activePage: pageName

    });

  }

  //render login component
  render() {

    //handle redirect url
    if(this.state.redirect) {

      return <Redirect to={this.state.redirect} />;

    }

    return (
        <div>
          <Helmet>
                <title>Digital-Commerce | Dashboard</title>
            </Helmet>
            <WelcomeBanner username={this.props.username} />

            <div className="relative bg-gray-200 overflow-hidden min-h-screen">

              <DashboardNavBar DashboardCallBack={this.DashboardCallBack} />

              {this.state.activePage === 'User Management' && (

                <DashboardUsers />

              )}

            </div>

        </div>
            
    );

  }

}