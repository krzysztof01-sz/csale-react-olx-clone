import React from 'react';
import './App.scss';
import SplashScreen from './components/splashScreen/SplashScreen';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../src/components/login/Login';
import Registration from '../src/components/registration/Registration';
import Dashboard from './components/dashboard/Dashboard';
import notFound from './components/404/notFound';
import NoticePage from './components/noticePage/NoticePage';
import { connect } from 'react-redux';
import AddNoticeForm from './components/addNotice/AddNoticeForm';

const App = ({ isUserLogged }) => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {isUserLogged ? <Redirect to="/dashboard" /> : <SplashScreen />}
          </Route>
          <Route path="/login">{isUserLogged ? <Redirect to="/dashboard" /> : <Login />}</Route>
          <Route path="/signup">{isUserLogged ? <Redirect to="/dashboard" /> : <Registration />}</Route>
          <Route path="/dashboard">{isUserLogged ? <Dashboard /> : <Redirect to="/" />}</Route>
          <Route path="/notice/:id">{isUserLogged ? <NoticePage /> : <Redirect to="/" />}</Route>
          <Route path="/add">{isUserLogged ? <AddNoticeForm /> : <Redirect to="/" />}</Route>
          <Route component={notFound} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = state => {
  console.log('state from app: ', state);
  return {
    isUserLogged: state.firebase.auth.uid,
  };
};

export default connect(mapStateToProps)(App);
