import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import decode from 'jwt-decode';
import RouteViews from "./RouteViews";
import Navbar from './Navbar';
import Footer from './Footer';
 
import {store} from '../store';
import { setToken, setCurrentUser, addError } from '../store/action';

if (localStorage.jwtToken) {
    setToken(localStorage.jwtToken);
    try {
      store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
    } catch (err) {
      store.dispatch(setCurrentUser({}));
      store.dispatch(addError(err));
    }
  }


const App = () => (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <RouteViews />
                </Fragment>
            </Router>
        </Provider>
    )

export default App;