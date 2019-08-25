import React, { Component } from 'react';

import apiConnect from "./services/apiConnect";
import DisplayMovies from "./displayMovies";
import NoResultsFound from "./subcomponents/noResultsFound";

class SearchMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            loading: true
        }
        this.query = this.props.match.params.query;
        this.page = 1;
        this.hasMore = true;
        this.noResults = false;
        this.nextPage = this.nextPage.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps) {
            if (prevProps.match.params.query !== this.props.match.params.query) {
                this.setState({ loading: true });
                this.query = this.props.match.params.query;
                this.noResults = false;
                this.fetchData();
            }
        }
    }

    async fetchData() {
        let response = await apiConnect.searchMovies(this.query);
        if (response) {
            if (response.data.length) {
                this.hasMore = 1 < response.total_pages ? true : false;
                this.setState({ loading: false });
                this.setState({ movies: response.data });
            } else {
                this.noResults = true;
                this.setState({ movies: undefined });
            }
        } else {
            this.setState({ movies: undefined });
        }
    }

    async nextPage() {
        this.setState({ loading: true });
        let response = await apiConnect.searchMovies(this.query, ++this.page);
        if (response) {
            this.hasMore = 1 < response.total_pages ? true : false;
            this.setState({ loading: false });
            this.setState({ movies: [...this.state.movies, ...response.data] });
        } else {
            this.setState({ movies: undefined });
        }
    }

    render() {
        if (this.state.movies !== undefined) {
            return <DisplayMovies films={this.state.movies} infScrObj={{nextPage: this.nextPage, hasMore: this.hasMore, loader: this.state.loading}}/>
        } else {
            if (this.noResults) {
                return <NoResultsFound text1={'No se han'} text2={'encontrado'} text3={'resultados'}></NoResultsFound>
            } else {
                return <NoResultsFound text1={'Parece que el'} text2={'servidor de TMDB'} text3={'está caído'}></NoResultsFound>
            }
        }
    }
}

export default SearchMovies;
