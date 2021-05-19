//import packages
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, Switch, Route, Redirect } from "react-router-dom";

import { createBrowserHistory } from "history";
import { Helmet } from "react-helmet";
import { isExpired } from "react-jwt";

import "./styles/tailwind.generated.css";

import Home from "./components/home.component";
import SignIn from "./components/signin.component";
import SignUp from "./components/signup.component";
// import NavBar from "./components/navbar.component";
import Dashboard from "./components/dashboard.component";
import Product from "./components/product.component";
import Header from "./components/header.component";
import Footer from "./components/footer.component";
import ShoppingCart from "./components/shoppingcart.component";
import About from "./components/about.component";
import Contact from "./components/contact.component";

//import services
import AuthenticationService from "./services/authentication.service";

const history = createBrowserHistory();

//define body class
export default class Body extends Component {

      //body constructor
      constructor(props) {

      //allow access to props within constructor
      super(props);

      //assign default state
      this.state = {

            currentUser: AuthenticationService.getCurrentUser(),
            username: '',
            userid: '',
            displayTitle: '',
            adminUser: false,
            showNoInternetErrorMessage: false

      };

      //bind listeners to functions
      // this.handleUser = this.handleUser.bind(this);
      // this.loginCallBack = this.loginCallBack.bind(this);
      // this.navCallback = this.navCallback.bind(this);
      this.handleTitleChange = this.handleTitleChange.bind(this);

      //validate user logged in
      if (this.state.currentUser != null) {

            //check if JWT is expired
            if (isExpired(this.state.currentUser.accessToken)) {

                  //logout user
                  AuthenticationService.signOut();

            }

      }

      }

  //update display title on page change via helmet
  handleTitleChange(newState) {

      //check if title has changed
      if (newState.title !== this.state.displayTitle) {

            this.setState({

                  displayTitle: newState.title

            });
      }
  
    }
  
  //render body
  render() {

    return (
      <div>
        <Helmet onChangeClientState={this.handleTitleChange}/>
        <Router history={history}>
          {/* <NavBar history={history}/> */}
          <Header history={history}/>
          {/* <div className="flex flex-col h-screen justify-between"> */}
          <Switch>
            <Route exact path="/"
                  component={Home} />
            <Route exact path="/signin"
                  component={SignIn} />
            <Route exact path="/signup"
                  component={SignUp} />
            <Route exact path="/dashboard"
                  component={Dashboard} />
            <Route exact path="/products"
                  component={Product} />
            <Route exact path="/shoppingcart"
                  component={ShoppingCart} />
            <Route exact path="/about"
                  component={About} />
            <Route exact path="/contact"
                  component={Contact} />
            <Route path="/*">
              <Redirect to="/" />
            </Route>
          </Switch>
          <Footer/>
          {/* </div> */}
        </Router>
      </div>
      );

  }

}

//render body class in DOM on page
ReactDOM.render(<Body></Body>, document.getElementById('root'));

//call register service worker
// serviceWorker.register();