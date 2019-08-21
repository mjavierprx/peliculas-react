import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import apiConnect from './services/apiConnect';
import DisplayMovies from "./displayMovies";
import StarsRate from "./subcomponents/starsRate";
import FormatDate from "./subcomponents/formatDate";
import ItemsComma from "./subcomponents/detailItemsComma";
import ItemsCommaLink from "./subcomponents/detailItemsCommaLink";
import ItemsCommaLinkAct from "./subcomponents/detailItemsCommaLinkAct";
import ItemsLinkVideo from "./subcomponents/detailItemsLinkVideo";
import NoResultsFound from "./subcomponents/noResultsFound";
import Loading from "./subcomponents/loading";
import './detailMovie.scss';

class DetailMovie extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            movie: null,
            bigBackdrop: false,
            bigPoster: false,
            similars: [],
            windowSize: window.innerWidth
        }
        this.directors = [];
        this.writing = [];
        this.music = [];
        this.cast = [];
        this.page = 1;
        this.hasMore = true;
        this.pathImgSmall = 'http://image.tmdb.org/t/p/w300';
        this.pathImgBig = 'http://image.tmdb.org/t/p/w1280';
        this.cwithBig691 = this.state.windowSize > 691 ? true : false;
        this.cwithBig820 = this.state.windowSize > 820 ? true : false;
        this.windowSizeChange = this.windowSizeChange.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    componentDidMount() {
        this.getMovie();
        window.addEventListener('resize', this.windowSizeChange);
    }

    componentDidUpdate(prevProps) {
        if (prevProps && prevProps.match.params.id !== this.props.match.params.id) {
            this.getMovie();
        }
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.windowSizeChange);
    }

    async getMovie() {
        this.setState({ movie: null });
        let filmId = this.props.match.params.id;
        let response = await apiConnect.getDetailMovie(filmId);
        if (response) {
            for (let elem of response.credits.crew) {
                if (elem.job === 'Director') {
                    this.directors = [...this.directors, { name: elem.name, id: elem.id }];
                }
                if (elem.job === 'Writer' || elem.job === 'Novel') {
                    this.writing = [...this.writing, { name: elem.name }];
                }
                if (elem.job === 'Original Music Composer') {
                    this.music = [...this.music, { name: elem.name }];
                }
            }
            this.setState({ movie: response });
            response = await apiConnect.getSimilarMovies(filmId);
            this.setState({ similars: response.data });
            this.hasMore = 1 < response.total_pages ? true : false;
            window.scrollTo({top: 0, behavior: 'smooth'});
        } else {
            this.setState({ movie: undefined });
        }
    }

    resizeBackdrop(big) {
        if (this.state.movie) {
            if (this.cwithBig691) {
                this.setState({ bigBackdrop: big });
            }
            if (this.cwithBig820) {
                if (big) {
                    document.getElementById('bigImg').scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.scrollTo(0, 0);
                }
            }
        }
    }
    
    resizePoster(big) {
        if (this.state.movie) {
            if (this.cwithBig691) {
                this.setState({ bigPoster: big });
            }
            if (this.cwithBig820) {
                if (big) {
                    document.getElementById('bigImg').scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.scrollTo(0, 0);
                }
            }
        }
    }

    windowSizeChange() {
        this.setState({ windowSize: window.innerWidth });
        this.cwithBig691 = this.state.windowSize > 691 ? true : false;
        this.cwithBig820 = this.state.windowSize > 820 ? true : false;
    }
    
    async nextPage() {
        let response = await apiConnect.getSimilarMovies(this.props.match.params.id, ++this.page);
        this.setState({ similars: [...this.state.similars, ...response.data] });
        this.hasMore = this.page < response.total_pages ? true : false;
    }

    render() {
        if (this.state.movie) {
            return (
                <div>
                    <div className="movie">
                        <div>
                            <div className="title">
                                <div className="col1">Título:</div>
                                <h1 className="col2">{this.state.movie.title}</h1>
                            </div>
                            <div>
                                <div className="col1">Título original:</div>
                                <div className="col2">{this.state.movie.original_title}</div>
                            </div>
                            <div>
                                <div className="col1">Valoración:</div>
                                <span className="col2 vote"><StarsRate rate={this.state.movie.vote_average}></StarsRate><span className="numVote">{this.state.movie.vote_average}</span></span>
                            </div>      
                            <div>
                                <div className="col1">Votos:</div>
                                <div className="col2">{this.state.movie.vote_count}</div>
                            </div>
                            <div>
                                <div className="col1">Fecha lanzamiento:</div>
                                <div className="col2"><FormatDate date={this.state.movie.release_date}></FormatDate></div>
                            </div>
                            <div>
                                <div className="col1">País:</div>
                                <div className="col2">
                                    <ItemsComma list={this.state.movie.production_countries}></ItemsComma>
                                </div>
                            </div>
                            <div>
                                <div className="col1">Productora:</div>
                                <div className="col2">
                                    <ItemsComma list={this.state.movie.production_companies}></ItemsComma>
                                </div>
                            </div>
                            <div>
                                <div className="col1">Dirección:</div>
                                <div className="col2">
                                    <ItemsCommaLink list={this.directors} path={'/peliculas/director/'}></ItemsCommaLink>
                                </div>
                            </div>
                            {this.writing.length > 0 &&
                                <div>
                                    <div className="col1">Guión:</div>
                                    <div className="col2">
                                        <ItemsComma list={this.writing}></ItemsComma>
                                    </div>
                                </div> 
                            }
                            {this.music.length > 0 &&
                                <div>
                                    <div className="col1">Música:</div>
                                    <div className="col2">
                                        <ItemsComma list={this.music}></ItemsComma>
                                    </div>
                                </div>
                            }                          
                            {this.state.movie.credits.cast && this.state.movie.credits.cast.length > 0 &&
                                <div>
                                    <div className="col1">Reparto:</div>
                                    <div className="col2">
                                        <ItemsCommaLinkAct list={this.state.movie.credits.cast} path={'/peliculas/'}></ItemsCommaLinkAct>
                                    </div>
                                </div>
                            }
                            <div>
                                <div className="col1">Género:</div>
                                <div className="col2">
                                    <ItemsCommaLink list={this.state.movie.genres} path={'/peliculas/generos/'}></ItemsCommaLink>
                                </div>
                            </div>
                            {this.state.movie.overview &&
                                <div>
                                    <div className="col1">Sinopsis:</div>
                                    <div className="col2">{this.state.movie.overview}</div>
                                </div>
                            }
                            {this.state.movie.videos && this.state.movie.videos.results.length > 0 &&
                                <div>
                                    <div className="col1">Vídeos:</div>
                                    <div className="col2">
                                        <ItemsLinkVideo list={this.state.movie.videos.results}></ItemsLinkVideo>
                                    </div>
                                </div>
                            }
                            {this.state.movie.homepage &&
                                <div>
                                    <div className="col1">Página oficial:</div>
                                    <a className="col2" href={this.state.movie.homepage} target="_blank" rel="noopener noreferrer">aquí</a>
                                </div>
                            }
                        </div>
                        <div className={`${this.state.bigBackdrop || this.state.bigPoster ? 'hideSmallImg' : 'showSmallImg'}`}>
                            {this.state.movie.backdrop_path &&
                                <div className="smallBackdrop" onClick={()=>this.resizeBackdrop(true)} style={{ 'backgroundImage': 'url(' + this.pathImgSmall + this.state.movie.backdrop_path + ')' }}>
                                </div>
                            }
                            {this.state.movie.poster_path &&
                                <div className="smallPoster" onClick={()=>this.resizePoster(true)} style={{ 'backgroundImage': 'url(' + this.pathImgSmall + this.state.movie.poster_path + ')' }}>
                                </div>
                            }
                        </div>
                    </div>
                    <div id="bigImg">
                        {this.cwithBig691 &&
                            <div className={`bigImg ${this.state.bigBackdrop ? 'show' : 'hide'}`} onClick={()=>this.resizeBackdrop(false)}>
                                <img src={`${this.pathImgBig}${this.state.movie.backdrop_path}`} alt={this.state.movie.title} />
                            </div>
                        }
                        {this.cwithBig691 &&
                            <div className={`bigImg ${this.state.bigPoster ? 'show' : 'hide'}`} onClick={()=>this.resizePoster(false)}>
                                <img src={`${this.pathImgBig}${this.state.movie.poster_path}`} alt={this.state.movie.title} />
                            </div>
                        }
                    </div>
                    <div>
                        <InfiniteScroll
                            dataLength={this.state.similars.length} 
                            next={this.nextPage}
                            hasMore={this.hasMore}
                            loader={<h4>Cargando...</h4>}
                            endMessage={this.state.similars.length > 0 &&
                                <p style={{textAlign: 'center'}}><b>Ya no hay más películas</b></p>
                            }
                        >
                            <div>
                                <DisplayMovies films={this.state.similars} />
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
            )
        } else if (this.state.movie === undefined) {
            return <NoResultsFound></NoResultsFound>
        } else {
            return <Loading></Loading>
        }
    }
}

export default DetailMovie;