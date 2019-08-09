import React, { useState, useEffect } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import apiConnect from "./services/apiConnect";
import DisplayMovies from "./displayMovies";
import NoResultsFound from "./subcomponents/noResultsFound";
import './searchMovies.scss';

function SearchMovies(props) {
    let query = props.match.params.query;
    let [getMovies, setMovies] = useState([]);
    let [getPage, setPage] = useState(1);
    let [getHasMore, setHasMore] = useState(true);
    let [getLoading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            let response = await apiConnect.searchMovies(query);
            setMovies(response.data);
            setHasMore(1 < response.total_pages ? true : false);
            setLoading(false);
        }
        fetchData();
    }, [query]);

    async function nextPage() {
        setPage(++getPage);
        let response = await apiConnect.searchMovies(query, getPage);
        setMovies([...getMovies, ...response.data]);
        setHasMore(getPage < response.total_pages ? true : false);
    }

    return (
        <div>
             {getMovies.length > 0 &&
                <InfiniteScroll
                    dataLength={getMovies.length} 
                    next={nextPage}
                    hasMore={getHasMore}
                    loader={<h4>Cargando...</h4>}
                    endMessage={getMovies.length > 0 &&
                        <p style={{textAlign: 'center'}}><b>Ya no hay más películas</b></p>
                    }
                >
                    <div>
                        <DisplayMovies films={getMovies} />
                    </div>
                </InfiniteScroll>
            }
            {!getMovies.length && !getLoading &&
				<NoResultsFound></NoResultsFound>
            }
        </div>
    )
}

export default SearchMovies;
