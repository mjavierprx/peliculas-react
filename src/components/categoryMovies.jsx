import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import DisplayMovies from "./displayMovies";
import apiConnect from './services/apiConnect';
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
        this.page = 1;
        this.hasMore = true;
        this.nextPage = this.nextPage.bind(this);
    }

    async componentDidMount() {
        this.getMovies();
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps && prevProps.match.params.category !== this.props.match.params.category) {
            this.getMovies();
        }
    }

    async getMovies() {
        this.category = this.props.match.params.category;
        let response = await apiConnect.getCategoryMovies(this.objCategory[this.category]);
        this.setState({ movies: response.data });
        this.title = this.objTitle[this.category];
    }

    async nextPage() {
        let response = await apiConnect.getCategory(this.category, ++this.page);
        this.setState({ movies: [...this.state.movies, ...response.data] });
        this.hasMore = this.page < response.total_pages ? true : false;
    }

    render() {
        return (
            <div className="movies-category">
            {this.state.movies.length > 0 &&
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
            }
        </div>
        )
    }
}

export default CategoryMovies;
