import React, { Component, Fragment } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import history from './config/history';
import { routeCodes } from './constants/routes';
import Home from './components/views/Home'
import Header from './components/global/Header';
import NotFound from './components/views/NotFound';
import Login from './components/views/Login';
import UserRouter from './PrivateRouter/userRoutes';
import AllUsers from './components/views/AllUsers';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Fragment>
          <Header />
          <Switch>
            <Route exact path={routeCodes.HOME} component={Home} />
            <Route path={routeCodes.LOGIN} component={Login} />
            <UserRouter path={routeCodes.ALLUSERS} component={AllUsers} />
            <Route component={NotFound} />
          </Switch>
          <ToastContainer
          position="top-right"
          className="crf-toast"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnHover
          transition={Flip}
        />
        </Fragment>
      </Router>
    );
  }
}

export default App;
