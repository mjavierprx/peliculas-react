import React from 'react';
import { Link } from 'react-router-dom';

import './displayMovies.scss';

function DisplayMovies(props) {
    const pathImg = 'http://image.tmdb.org/t/p/w185';

    return (
        <section className="movies">
            {props.films.map((film, i) => {
                return (
                    <Link to={`/movies/detail/${film.id}`} className="movieCard" key={i} style={{'backgroundImage': 'url(' + pathImg + film.poster_path + ')'}}>
                        <h2>{film.title}</h2>
                    </Link>
                )
            })}
        </section>
    )
}

export default DisplayMovies;