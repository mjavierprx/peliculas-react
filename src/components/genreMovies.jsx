import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';

import DisplayMovies from "./displayMovies";
import apiConnect from './services/apiConnect';
import './genreMovies.scss';

function GenreMovies(props) {
    let genreId = props.match.params.id;
    let [getGenres, setGenres] = useState([]);
    let [getMovies, setMovies] = useState([]);
    let [getPage, setPage] = useState(0);
    let [getHasMore, setHasMore] = useState(true);
    
    useEffect(() => {
        if (genreId === '0') {
            async function fetchDataList() {
                setGenres(await apiConnect.getGenresList());
            }
            fetchDataList();
            setMovies([]);
        } else if (getPage === 0) {
            async function fetchDataMovies() {
                let response = await apiConnect.getGenreMovies(genreId);
                setMovies(response.data);
                setHasMore(getPage < response.total_pages ? true : false);
                document.getElementById('movies').scrollIntoView({ behavior: 'smooth' });
            }
            fetchDataMovies();
        }
    }, [genreId, getPage]);

        async function nextPage() {
            setPage(++getPage);
            let response = await apiConnect.getGenreMovies(genreId);
            setMovies([...getMovies, ...response.data]);
            setHasMore(getPage < response.total_pages ? true : false);
        }

        function pageCero() {
            setPage(0);
        }

    return (
        <div className="movies-genre">
            <h1>Géneros películas</h1>
            <div className="genres">
                {getGenres.map((g, i) => {
                    return (
                        <span className="genre" key={i}>
                            <Link to={`/movies/genre/${g.id}`} className={g.id === genreId ? 'selected' : 'noSelected'} onClick={pageCero}>
                                {g.name}
                            </Link>
                        </span>
                    )
                })}
            </div>
            <div id="movies"></div>
            {getMovies.length > 0 &&
                <InfiniteScroll
                    dataLength={getMovies.length} 
                    next={nextPage}
                    hasMore={getHasMore}
                    loader={<h4>Cargando...</h4>}
                    endMessage={
                        <p style={{textAlign: 'center'}}><b>Ya no hay más películas</b></p>
                    }
                >
                    <div>
                        <DisplayMovies films={getMovies} />
                    </div>
                </InfiniteScroll>
            }
            {!getMovies.length && 
                <div className="spacebottom"></div>
            }
        </div>
    )
}

export default GenreMovies;