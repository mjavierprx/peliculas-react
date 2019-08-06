import React from 'react';
import { Link } from 'react-router-dom';

import StarsRate from "./starsRate";
import './displayMovies.scss';

function DisplayMovies(props) {
    const pathImg = 'http://image.tmdb.org/t/p/w185';

    function scrollUp() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <section className="movies">
            {props.films.map((film, i) => {
                return (
                    <Link to={`/movies/detail/${film.id}`} className="movieCard" key={i} style={{'backgroundImage': 'url(' + pathImg + film.poster_path + ')'}}>
                        <h2>{film.title}</h2>
                        <div className="stars">
                            <StarsRate rate={film.vote_average}></StarsRate>
                        </div>
                    </Link>
                )
            })}
            <button className="btnFixed" onClick={scrollUp}>
                <img src="/img/up.png" alt="arriba" />
            </button>
        </section>
    )
}

export default DisplayMovies;