import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/header';
import SearchMovies from './components/searchMovies';
import CategoryMovies from './components/categoryMovies';
import GenreMovies from './components/genreMovies';

const routes = (
    <BrowserRouter>
        <Header />
        <Switch>
            <Route path = '/movies/search/:query' component={SearchMovies} />
            {/* <Route path = '/movies/detail/:id' component={DetailMovie} /> */}
            <Route path = '/movies/genre/:id' component={GenreMovies} />
            <Route path = '/movies/:category' component={CategoryMovies} />
            <Route component={CategoryMovies} />

            <Route path = '*' Redirect to='/movies/top_rated' />

        </Switch>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('root'));

serviceWorker.unregister();
