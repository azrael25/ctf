import React from 'react';
import Router from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import './index.css';

const App = () =><Router>
    <Switch>
        <Route component={NotFound} />
    </Switch>
</Router>;

export default App;
