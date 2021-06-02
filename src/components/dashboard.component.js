//import packages
import React, { Component } from 'react';

import WelcomeBanner from "./welcomebanner.component";

import "../styles/tailwind.generated.css";

import { Helmet } from "react-helmet";

import { Redirect } from "react-router-dom";

import DashboardNavBar from "./dashboardnavbar.component";

import DashboardUsers from "./dashboardusers.component";
import DashboardProducts from "./dashboardproducts.component";
import DashboardOrders from "./dashboardorders.component";
import DashboardCollections from "./dashboardcollections.component";

import DashboardCreateUser from "./dashboardcreateuser.component";
import DashboardCreateProduct from "./dashboardcreateproduct.component";
import DashboardEditProduct from "./dashboardeditproduct.component";
import DashboardProductImageUpload from "./dashboardproductsimageupload.component";
import DashbordCreateCollection from "./dashboardcreatecollection.component";
import DashboardSite from "./dashboardsite.component";
import DashboardOrderLines from "./dashboardorderlines.component";

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
        redirect: null

    };

  }

  //invoked after component is mounted
  componentDidMount() {

    if(!this.props.adminUser) {

      this.setState({

        redirect: '/'

      });

    }

  }

  renderManagement() {

    var pathName = this.props.history.location.pathname;

    if(pathName.includes("/dashboard/products/edit")) {

      return <DashboardEditProduct />;

    }

    if(pathName.includes("/dashboard/products/upload")) {

      return <DashboardProductImageUpload />;

    }

    if(pathName.includes("/dashboard/orders/lines")) {

      return <DashboardOrderLines />;

    }

    switch(pathName) {
      case '/dashboard/users':
        return <DashboardUsers />;
      case '/dashboard/users/create':
        return <DashboardCreateUser />;
      case '/dashboard/products':
        return <DashboardProducts />;
      case '/dashboard/products/create':
        return <DashboardCreateProduct />;
      case '/dashboard/orders':
        return <DashboardOrders />;
      case '/dashboard/collections':
        return <DashboardCollections />;
      case '/dashboard/collections/create':
       return <DashbordCreateCollection />;
       case '/dashboard/site':
        return <DashboardSite manifest={this.props.manifest} />;
      default:
        return null;

    }

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
                <title>{`${this.props.manifest.name}`} | Dashboard</title>
            </Helmet>
            <WelcomeBanner username={this.props.username} />

            <div className="relative bg-gray-200 overflow-hidden min-h-screen">

              <DashboardNavBar />

              {this.renderManagement()}

            </div>

        </div>
            
    );

  }

}