import React, { useState, useEffect } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import DisplayMovies from "./displayMovies";
import apiConnect from './services/apiConnect';
import './categoryMovies.scss';

function CategoryMovies(props) {
    const objCategory = {mas_valoradas: 'top_rated', popular: 'popular', estrenos: 'upcoming'};
    const objTitle = {mas_valoradas: 'Más valoradas', popular: 'Popular', estrenos: 'Estrenos'};
    let category = objCategory[props.match.params.category];
    let title = objTitle[category];
    let [getMovies, setMovies] = useState([]);
    let [getPage, setPage] = useState(1);
    let [getHasMore, setHasMore] = useState(true);
    
    useEffect(() => {
        async function fetchData() {
            let response = await apiConnect.getCategory(category);
            setMovies(response.data);
            setHasMore(1 < response.total_pages ? true : false);
        }
        fetchData();
    }, [category]);

    async function nextPage() {
        setPage(++getPage);
        let response = await apiConnect.getCategory(category);
        setMovies([...getMovies, ...response.data]);
        setHasMore(getPage < response.total_pages ? true : false);
    }

    return (
        <div className="movies-category">
            {getMovies.length > 0 &&
                <InfiniteScroll
                    dataLength={0} 
                    next={nextPage}
                    hasMore={getHasMore}
                    loader={<h4>Cargando...</h4>}
                    endMessage={
                        <p style={{textAlign: 'center'}}><b>Ya no hay más películas</b></p>
                    }
                >
                    <div>
                        <h1>{title}</h1>
                        <DisplayMovies films={getMovies} />
                    </div>
                </InfiniteScroll>
            }
        </div>
    )
}

export default CategoryMovies;









// import React from 'react';
// import { Link } from 'react-router-dom';

// import DisplayMovies from "./displayMovies";
// import apiConnect from './services/apiConnect';
// import './categoryMovies.scss';

// class CategoryMovies extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             pelis: []
//         }
//         this.categoryTitle = "";
//         this.objCategory = {top_rated: 'Más valoradas', popular: 'Popular', upcoming: 'Estrenos'};
//         this.getMovies();
//     }

//     async getMovies() {
//         this.setState({
//             pelis: await apiConnect.getCategory('top_rated')
//         });
//         if (this.props.match.params.category !== "top_rated") {
//             window.history.replaceState([], 'Más valoradas', '/movies/top_rated');
//         }
//         categoryTitle = objCategory["top_rated"];
//     }
    
//     async componentDidUpdate(prevProps) {
//         const category = this.props.match.params.category;
//         if (prevProps && prevProps.match.params.category !== category) {
//             this.setState({
//                 pelis: await apiConnect.getCategory(category)
//             })
//         }
//         this.categoryTitle = this.objCategory[this.category];
//     }

//     render(){
//         return (

//             <div className="movies-category">
//                 <h1>{this.categoryTitle}</h1>
//                 <DisplayMovies films={this.state.pelis} />
//                 <Link id="toSearchMovies" to={'/movies/top_rated'}></Link>
//             </div>
//         )
//     }
// }

// export default CategoryMovies;