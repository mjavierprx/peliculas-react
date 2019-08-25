import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';

import StarsRate from "./subcomponents/starsRate";
import Loading from "./subcomponents/loading";
import './displayMovies.scss';

function DisplayMovies(props) {
    const pathImg = 'http://image.tmdb.org/t/p/w185';
    let [getbuttonUp, setButtonUp] = useState(false);

    window.addEventListener("scroll", buttonUp);
    function buttonUp(e) {
        setButtonUp(window.scrollY > 100 ? true : false);
    }

    function scrollUp() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    
    useEffect(() => {
        return () => {
            window.removeEventListener('scroll', buttonUp);
        }
    });

    return (
        <InfiniteScroll
            dataLength={props.films.length}
            next={props.infScrObj.nextPage}
            hasMore={props.infScrObj.hasMore}
            loader={props.infScrObj.loader && <Loading></Loading>}
            endMessage={
                <p style={{ textAlign: 'center' }}><b>Ya no hay más películas</b></p>
            }
        >
            <section className="movies">
                {props.films.map((film, i) => {
                    return (
                        <Link to={`/peliculas/detalle/${film.id}`} className="movieCard" key={i} style={{'backgroundImage': 'url(' + pathImg + film.poster_path + ')'}}>
                            <h2>{film.title}</h2>
                            <div className="stars">
                                <StarsRate rate={film.vote_average}></StarsRate>
                            </div>
                        </Link>
                    )
                })}
                {getbuttonUp &&
                    <button className="btnFixed" onClick={scrollUp}>
                        <img src="/img/up.png" alt="arriba" />
                    </button>
                }
            </section>
        </InfiniteScroll>
    )
}

export default DisplayMovies;