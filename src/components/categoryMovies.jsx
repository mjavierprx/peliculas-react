import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import DisplayMovies from "./displayMovies";
import apiConnect from './services/apiConnect';
import NoResultsFound from "./subcomponents/noResultsFound";
import Loading from "./subcomponents/loading";
import './categoryMovies.scss';

class CategoryMovies extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            movies: []
        }
        this.objCategory = {mas_valoradas: 'top_rated', popular: 'popular', estrenos: 'upcoming'};
        this.objTitle = {mas_valoradas: 'Más valoradas', popular: 'Popular', estrenos: 'Estrenos'};
        this.category = '';
        this.title = '';
        this.loading = true;
        this.page = 1;
        this.hasMore = true;
        this.nextPage = this.nextPage.bind(this);
    }

    async componentDidMount() {
        this.getMovies();
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps && prevProps.match.params.category !== this.props.match.params.category) {
            this.loading = true;
            this.getMovies();
        }
    }

    async getMovies() {
        this.category = this.props.match.params.category;
        let response = await apiConnect.getCategoryMovies(this.objCategory[this.category]);
        this.title = this.objTitle[this.category];
        if (response) {
            this.loading = false;
            this.setState({ movies: response.data });
        } else {
            this.setState({ movies: undefined });
        }
    }

    async nextPage() {
        this.loading = true;
        let response = await apiConnect.getCategoryMovies(this.objCategory[this.category], ++this.page);
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
                <div className="movies-category">
                    <InfiniteScroll
                        dataLength={this.state.movies.length} 
                        next={this.nextPage}
                        hasMore={this.hasMore}
                        loader={<h4>Cargando...</h4>}
                        endMessage={
                            <p style={{textAlign: 'center'}}><b>Ya no hay más películas</b></p>
                        }
                    >
                        <div>
                            <h1>{this.title}</h1>
                            <DisplayMovies films={this.state.movies} />
                        </div>
                    </InfiniteScroll>
                </div>
            )
        } else if (this.state.movies === undefined) {
            return <NoResultsFound text1={'Parece que el'} text2={'servidor de TMDB'} text3={'está caído'}></NoResultsFound>
        } else {
            return <Loading></Loading>
        }
    }
}

export default CategoryMovies;
