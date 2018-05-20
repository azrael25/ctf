import React from 'react';
import { Provider } from 'react-redux';
import Router from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import store from './models';
import Login from './pages/login/Login.jsx';
import NotFound from './pages/404/NotFound.jsx';
import './index.css';

const App = () => <Provider store={store}>
    <Router>
        <Switch>
            <Route path='/login' component={Login} exact />
            <Route component={NotFound} />
        </Switch>
    </Router>
</Provider>;

export default App;
