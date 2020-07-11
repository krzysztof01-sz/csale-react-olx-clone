import React from 'react';
import './App.scss';
import SplashScreen from './components/splashScreen/SplashScreen';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../src/components/login/Login';
import Registration from '../src/components/registration/Registration';
import Dashboard from './components/dashboard/Dashboard';
import notFound from './components/404/notFound';
import NoticePage from './components/noticePage/NoticePage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={SplashScreen} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Registration} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/notice/:id" component={NoticePage} />
          <Route component={notFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
