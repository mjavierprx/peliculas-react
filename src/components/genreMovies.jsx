import React from 'react';
import { Link } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';

import apiConnect from './services/apiConnect';
import DisplayMovies from "./displayMovies";
import NoResultsFound from "./subcomponents/noResultsFound";
import Loading from "./subcomponents/loading";
import './genreMovies.scss';

class GenreMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            movies: []
        }
        this.loading = true;
        this.page = 1;
        this.hasMore = true;
        this.genreId = this.props.match.params.id;
        this.nextPage = this.nextPage.bind(this);
    }

    async componentDidMount() {
        let response = await apiConnect.getGenresList();
        if (response) {
            this.loading = false;
            this.setState({ genres: response });
            if (this.genreId !== '0') {
                this.getFilms();
            }
        } else {
            this.setState({ genres: undefined });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps) {
            this.genreId = this.props.match.params.id;
            if (prevProps.match.params.id !== this.genreId && this.genreId !== '0') {
                this.loading = true;
                this.getFilms();
            }
        } 
    }

    async getFilms() {
        let response = await apiConnect.getGenreMovies(this.genreId);
        if (response) {
            this.hasMore = 1 < response.total_pages ? true : false;
            this.loading = false;
            this.setState({ movies: response.data });
            document.getElementById('movies').scrollIntoView({ behavior: 'smooth' });            
        } else {
            this.setState({ movies: undefined });
        }
    }

    async nextPage() {
        this.loading = true;
        let response = await apiConnect.getGenreMovies(this.genreId, ++this.page);
        if (response) {
            this.hasMore = this.page < response.total_pages ? true : false;
            this.loading = false;
            this.setState({ movies: [...this.state.movies, ...response.data] });
        } else {
            this.setState({ movies: undefined });
        }
    }

    render() {
        if (!this.loading) {
            return (
                <div className="movies-genre">
                    <h1>Géneros películas</h1>
                    <div className="genres">
                        {this.state.genres.map((g, i) => {
                            return (
                                <span className="genre" key={i}>
                                    <Link to={`/peliculas/generos/${g.id}`} className={g.id.toString() === this.genreId ? 'selected' : 'noSelected'}>
                                        {g.name}
                                    </Link>
                                </span>
                            )
                        })}
                    </div>
                    <div id="movies"></div>
                    {this.state.movies.length > 0 &&
                        <InfiniteScroll
                            dataLength={this.state.movies.length}
                            next={this.nextPage}
                            hasMore={this.hasMore}
                            loader={<h4>Cargando...</h4>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}><b>Ya no hay más películas</b></p>
                            }
                        >
                            <div>
                                <DisplayMovies films={this.state.movies} />
                            </div>
                        </InfiniteScroll>
                    }
                </div>
            )
        } else if (this.loading) {
            return <Loading></Loading>
        } else {
            return <NoResultsFound text1={'Parece que el'} text2={'servidor de TMDB'} text3={'está caído'}></NoResultsFound>
        }
    }
}

export default GenreMovies;