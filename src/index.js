import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/header';
import SearchMovies from './components/searchMovies';
import CategoryMovies from './components/categoryMovies';
import GenreMovies from './components/genreMovies';
import DetailMovie from './components/detailMovie';
import DetailPerson from './components/detailPerson';

const routes = (
    <BrowserRouter>
        <Header />
        <Switch>
            <Route path = '/peliculas/buscar/:query' component={SearchMovies} />
            <Route path = '/peliculas/detalle/:id' component={DetailMovie} />
            <Route path = '/peliculas/generos/:id' component={GenreMovies} />
            <Route path = '/peliculas/:person/:id' component={DetailPerson} />
            <Route path = '/peliculas/:category' component={CategoryMovies} />
            <Redirect to='/peliculas/mas_valoradas' />
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('root'));

serviceWorker.unregister();
