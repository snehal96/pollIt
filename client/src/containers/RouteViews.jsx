import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCurrentPoll } from "../store/action";

import Authpage from '../pages/AuthPage';
import Testpage from '../pages/TestPage';
import Homepage from '../pages/HomePage';
import Pollpage from '../pages/PollPage';
import CreatePollPage from '../pages/CreatePollPage';

const RouteViews = ({auth, getCurrentPoll}) => (<main>
        <Switch>
            <Route exact path="/" render={props => <Homepage {...props} />} />
            <Route exact path="/login" render={() => <Authpage authType='login' isAuthenticated={auth.isAuthenticated} />} />
            <Route exact path="/register" render={() => <Authpage authType='register' isAuthenticated={auth.isAuthenticated} />} />
            <Route exact path="/poll/new" render={() => <CreatePollPage isAuthenticated={auth.isAuthenticated}/>}/>
            <Route exact path="/poll/:id" render={props => (<Pollpage getPoll={id => getCurrentPoll(id)} {...props} />)} />
            <Route exact path="/test" render={() => <Testpage />} />
        </Switch>
    </main>)


export default withRouter(connect(store => ({auth: store.auth}), { getCurrentPoll })(RouteViews));