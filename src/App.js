import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import history from './appHistory';
import Loadable from 'react-loadable';
import './App.scss';
import logo from './logo.svg';
import DefaultLayout from "./containers/DefaultLayout"

const loading = () => <div className="">Loading...</div>;

// Containers
/*const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});*/

function App() {
  return (
      <Router history={history}>
          <Switch>
              <Route path="/" name="Home" component={DefaultLayout}/>
          </Switch>
      </Router>
  );
}

export default App;
