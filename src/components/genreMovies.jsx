import React from 'react';
import { Link } from 'react-router-dom';

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
            movies: [],
            loading: true
        }
        this.page = 1;
        this.hasMore = true;
        this.genreId = this.props.match.params.id;
        this.nextPage = this.nextPage.bind(this);
    }

    async componentDidMount() {
        let response = await apiConnect.getGenresList();
        if (response) {
            this.setState({ loading: false });
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
                this.setState({ loading: true });
                this.getFilms();
            }
        }
    }

    async getFilms() {
        let response = await apiConnect.getGenreMovies(this.genreId);
        if (response) {
            this.hasMore = 1 < response.total_pages ? true : false;
            this.setState({ loading: false });
            this.setState({ movies: response.data });
            document.getElementById('movies').scrollIntoView({ behavior: 'smooth' });
        } else {
            this.setState({ movies: undefined });
        }
    }

    async nextPage() {
        this.setState({ loading: true });
        let response = await apiConnect.getGenreMovies(this.genreId, ++this.page);
        if (response) {
            this.hasMore = this.page < response.total_pages ? true : false;
            this.setState({ loading: false });
            this.setState({ movies: [...this.state.movies, ...response.data] });
        } else {
            this.setState({ movies: undefined });
        }
    }

    render() {
        if (!this.state.genres !== undefined && this.state.movies !== undefined) {
            return (
                <div className="movies-genre">
                    {this.state.loading &&
                        <Loading></Loading>
                    }
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
                        <DisplayMovies films={this.state.movies} infScrObj={{nextPage: this.nextPage, hasMore: this.hasMore, loader: this.state.loading}}/>
                    }
                </div>
            )
        } else {
            return <NoResultsFound text1={'Parece que el'} text2={'servidor de TMDB'} text3={'está caído'}></NoResultsFound>
        }
    }
}

export default GenreMovies;