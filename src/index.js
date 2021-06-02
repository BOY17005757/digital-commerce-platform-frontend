//import packages
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Helmet } from "react-helmet";
import { isExpired } from "react-jwt";

//import css
import "./styles/tailwind.generated.css";

//import components
import Home from "./components/home.component";
import SignIn from "./components/signin.component";
import SignUp from "./components/signup.component";
import Dashboard from "./components/dashboard.component";
import Product from "./components/product.component";
import Header from "./components/header.component";
import Footer from "./components/footer.component";
import ShoppingCart from "./components/shoppingcart.component";
import About from "./components/about.component";
import Contact from "./components/contact.component";
import ProductDetails from "./components/productdetail.component";

//import services
import AuthenticationService from "./services/authentication.service";
import UserService from "./services/user.service";
import ManifestService from "./services/manifest.service";

//import service worker
import * as serviceWorker from './serviceWorkerRegistration';

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
                  adminUser: false,
                  showNoInternetErrorMessage: false,
                  redirect: null,
                  manifest: {}

            };

            //bind listeners to functions
            this.handleUser = this.handleUser.bind(this);
            this.loginCallBack = this.loginCallBack.bind(this);
            this.navCallback = this.navCallback.bind(this);

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
            this.getManifest();

            this.handleUser();

      }

      getManifest() {

            var self = this;
            
            self.setState({
                  loading: true
            });
            
            ManifestService.getManifest()
            .then(function (manifest) {
            
                  self.setState({
            
                        manifest: manifest.data,
                        loading: false
            
                  });
                        
            })
            .catch(function (error) {
            
                  self.setState({
            
                        message: "No manifest found.",
                        showInvalidPost: true,
                        loading: false
            
                  });
            
                  console.error(error);
            
            })

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

      //handle redirect url
      if(this.state.redirect) {

            return <Redirect to={this.state.redirect} />;

      }

      return (
      <div>
        <Helmet />
        <Router history={history}>
          <Header key={this.state.userid} history={history} user={ this.state.username } userid={ this.state.userid } navCallBack={this.navCallback} adminUser={this.state.adminUser} />
          <Switch>
            <Route exact path="/"
                  render={(props) => <Home {...props} manifest={this.state.manifest} />}
                  />
            <Route exact path="/signin"
                   render={(props) => <SignIn {...props} loginCallBack={this.loginCallBack} manifest={this.state.manifest} />}
                  />
            <Route exact path="/signup"
                   render={(props) => <SignUp {...props} manifest={this.state.manifest} />}
                  />
            <Route path="/dashboard"
                   render={(props) => <Dashboard {...props} username={this.state.username} adminUser={this.state.adminUser} history={history} manifest={this.state.manifest} />}
                  />
            <Route exact path="/products"
                   render={(props) => <Product {...props} manifest={this.state.manifest} />}
                  />
            <Route path="/products/detail"
                   render={(props) => <ProductDetails {...props} manifest={this.state.manifest} />}
                  />
            <Route exact path="/shoppingcart"
                   render={(props) => <ShoppingCart {...props} manifest={this.state.manifest} />}
                  />
            <Route exact path="/about"
                   render={(props) => <About {...props} manifest={this.state.manifest} />}
                  />
            <Route exact path="/contact"
                   render={(props) => <Contact {...props} manifest={this.state.manifest} />}
                  />
            <Route path="/*">
              <Redirect to="/" />
            </Route>
          </Switch>
          <Footer manifest={this.state.manifest}/>
        </Router>
      </div>
      );

  }

}

//render body class in DOM on page
ReactDOM.render(<Body></Body>, document.getElementById('root'));

//call register service worker
serviceWorker.register();