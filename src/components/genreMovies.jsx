import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';

import apiConnect from './services/apiConnect';
import DisplayMovies from "./displayMovies";
import './genreMovies.scss';

function GenreMovies(props) {
    const genreId = props.match.params.id;
    const [getGenres, setGenres] = useState([]);
    const [getFilms, setFilms] = useState([]);
    let [getPage, setPage] = useState(1);
    const [getHasMore, setHasMore] = useState(true);
    
    useEffect(() => {
        async function fetchDataList() {
            setGenres(await apiConnect.getGenresList());
        }
        fetchDataList();
        setFilms([]);
    }, []);

    useEffect(() => {
        if(genreId !== '0') {
            async function fetchDataFilms() {
                let response = await apiConnect.getGenreMovies(genreId);
                setFilms(response.data);
                setHasMore(1 < response.total_pages ? true : false);
                document.getElementById('movies').scrollIntoView({ behavior: 'smooth' });
            }
            fetchDataFilms();
        }
    }, [genreId]);

    async function nextPage() {
        setPage(++getPage);
        let response = await apiConnect.getGenreMovies(genreId);
        setFilms([...getFilms, ...response.data]);
        setHasMore(getPage < response.total_pages ? true : false);
    }

    function pageUno() {
        setPage(1);
    }

    return (
        <div className="movies-genre">
            <h1>Géneros películas</h1>
            <div className="genres">
                {getGenres.map((g, i) => {
                    return (
                        <span className="genre" key={i}>
                            <Link to={`/peliculas/generos/${g.id}`} className={g.id === genreId ? 'selected' : 'noSelected'} onClick={pageUno}>
                                {g.name}
                            </Link>
                        </span>
                    )
                })}
            </div>
            <div id="movies"></div>
            {getFilms && getFilms.length > 0 &&
                <InfiniteScroll
                    dataLength={getFilms.length} 
                    next={nextPage}
                    hasMore={getHasMore}
                    loader={<h4>Cargando...</h4>}
                    endMessage={
                        <p style={{textAlign: 'center'}}><b>Ya no hay más películas</b></p>
                    }
                >
                    <div>
                        <DisplayMovies films={getFilms} />
                    </div>
                </InfiniteScroll>
            }
        </div>
    )
}

export default GenreMovies;