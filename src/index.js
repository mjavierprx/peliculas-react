import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/header';

const routes = (
    <BrowserRouter>
        <Header />
        <Switch>


        </Switch>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('root'));

serviceWorker.unregister();
