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
import ProductDetails from "./components/productdetail.component";
import DashboardCreateUser from "./components/dashboardcreateuser.component";

//import services
import AuthenticationService from "./services/authentication.service";
import UserService from "./services/user.service";

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
            this.handleUser = this.handleUser.bind(this);
            this.loginCallBack = this.loginCallBack.bind(this);
            this.navCallback = this.navCallback.bind(this);
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

      //invoked after component is mounted
      componentDidMount() {

            //call handle user function
            this.handleUser();

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

      //get current user and check if administrator
      handleUser() {

            //call check online function
            // this.checkOnline();

            var self = this;

            self.setState({

                  currentUser: AuthenticationService.getCurrentUser()

            }, function () {

                  if (self.state.currentUser) {

                        self.setState({

                              username: self.state.currentUser.username,
                              userid: self.state.currentUser.id

                        });

                            UserService.getAdmin()
                              .then(function (admin) {

                                if (admin.status === 200) {

                                  self.setState({

                                    adminUser: true

                                  });

                                }

                              })
                              .catch(function (error) {

                                console.error(error);

                              })

                  } else {

                        self.setState({

                              username: '',
                              userid: '',
                              adminUser: false

                        });

                  }

            });

      }

      //callback from nav bar component
      navCallback() {

            //call handle user function
            this.handleUser();

      }

      //callback from login component
      loginCallBack() {

            //call handle user function
            this.handleUser();
      
      }
  
      //render body
      render() {

      return (
      <div>
        <Helmet onChangeClientState={this.handleTitleChange}/>
        <Router history={history}>
          {/* <NavBar history={history}/> */}
          <Header key={this.state.userid} history={history} user={ this.state.username } userid={ this.state.userid } navCallBack={this.navCallback} adminUser={this.state.adminUser} />
          {/* <div className="flex flex-col h-screen justify-between"> */}
          <Switch>
            <Route exact path="/"
                  component={Home} />
            <Route exact path="/signin"
                   render={(props) => <SignIn {...props} loginCallBack={this.loginCallBack} />}
                  // component={SignIn} 
                  />
            <Route exact path="/signup"
                   component={SignUp} />
            <Route exact path="/dashboard"
                   render={(props) => <Dashboard {...props} username={this.state.username} adminUser={this.state.adminUser} />}
                  // component={Dashboard}
                  />
            <Route exact path="/dashboard/create/user"
                   render={(props) => <DashboardCreateUser {...props} username={this.state.username} adminUser={this.state.adminUser} />}
                  //  component={DashboardCreateUser}
                  />
            <Route exact path="/products"
                  component={Product} />
            <Route path="/products/view"
                  component={ProductDetails} />
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