import React from 'react';

import DisplayMovies from "./displayMovies";
import apiConnect from './services/apiConnect';
import NoResultsFound from "./subcomponents/noResultsFound";
import './categoryMovies.scss';

class CategoryMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            loading: true
        }
        this.objCategory = { mas_valoradas: 'top_rated', popular: 'popular', estrenos: 'upcoming' };
        this.objTitle = { mas_valoradas: 'Más valoradas', popular: 'Popular', estrenos: 'Estrenos' };
        this.category = '';
        this.title = '';
        this.page = 1;
        this.hasMore = true;
        this.nextPage = this.nextPage.bind(this);
    }

    async componentDidMount() {
        this.getMovies();
    }

    componentDidUpdate(prevProps) {
        if (prevProps && prevProps.match.params.category !== this.props.match.params.category) {
            this.setState({ loading: true });
            this.getMovies();
        }
    }

    async getMovies() {
        this.category = this.props.match.params.category;
        let response = await apiConnect.getCategoryMovies(this.objCategory[this.category]);
        this.title = this.objTitle[this.category];
        if (response) {
            this.setState({ loading: false });
            this.setState({ movies: response.data });
        } else {
            this.setState({ movies: undefined });
        }
    }

    async nextPage() {
        this.setState({ loading: true });
        let response = await apiConnect.getCategoryMovies(this.objCategory[this.category], ++this.page);
        if (response) {
            this.hasMore = this.page < response.total_pages ? true : false;
            this.setState({ loading: false });
            this.setState({ movies: [...this.state.movies, ...response.data] });
        } else {
            this.setState({ movies: undefined });
        }
    }

    render() {
        if (this.state.movies !== undefined) {
            return (
                <div className="movies-category">
                    <h1>{this.title}</h1>
                    <DisplayMovies films={this.state.movies} infScrObj={{nextPage: this.nextPage, hasMore: this.hasMore, loader: this.state.loading}}/>
                </div>
            )
        } else {
            return <NoResultsFound text1={'Parece que el'} text2={'servidor de TMDB'} text3={'está caído'}></NoResultsFound>
        }
    }
}

export default CategoryMovies;
