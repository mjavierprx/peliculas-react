import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import apiConnect from './services/apiConnect';
import DisplayMovies from "./displayMovies";
import FormatDate from "./subcomponents/formatDate";
import NoResultsFound from "./subcomponents/noResultsFound";
import Loading from "./subcomponents/loading";
import './detailPerson.scss';

class DetailPerson extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            person: null,
            bigImg: false,
            movies: [],
            windowSize: window.innerWidth
        }
        this.page = 1;
        this.hasMore = true;
        this.pathImgSmall = 'http://image.tmdb.org/t/p/w300';
        this.pathImgBig = 'http://image.tmdb.org/t/p/w1280';
        this.cwithBig691 = this.state.windowSize > 691 ? true : false;
        this.cwithBig820 = this.state.windowSize > 820 ? true : false;
        this.arrPerson = ['actor', 'actriz', 'director'];
        this.personType = '';
        this.windowSizeChange = this.windowSizeChange.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    componentDidMount() {
        this.getPerson();
        window.addEventListener('resize', this.windowSizeChange);
    }

    componentDidUpdate(prevProps) {
        if (prevProps && prevProps.match.params.id !== this.props.match.params.id) {
            this.getPerson();
        }
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.windowSizeChange);
    }

    async getPerson() {
        this.setState({ person: null });
        this.personType = this.props.match.params.person;
        if (this.arrPerson.indexOf(this.personType) > -1) {
            let personId = this.props.match.params.id
            let response = await apiConnect.getDetailPerson(personId);
            if (response) {
                this.setState({ person: response });
                if (this.personType === 'director') {
                    response = await apiConnect.getDirectorMovies(personId);
                } else {
                    response = await apiConnect.getActMovies(personId);
                }
                this.setState({ movies: response.data });
                this.hasMore = 1 < response.total_pages ? true : false;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                this.setState({ person: undefined });
            }
        } else {
            window.location.href = "/peliculas/mas_valoradas";
        }
    }

    resizeImg(big) {
        if (this.cwithBig691) {
            this.setState({ bigImg: big });
        }
        if (this.cwithBig820) {
            if (big) {
                document.getElementById('bigImg').scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo(0, 0);
            }
        }
    }
    
    windowSizeChange() {
        this.setState({ windowSize: window.innerWidth });
        this.cwithBig691 = this.state.windowSize > 691 ? true : false;
        this.cwithBig820 = this.state.windowSize > 820 ? true : false;
    }
    
    async nextPage() {
        let response;
        if (this.personType === 'director') {
            response = await apiConnect.getDirectorMovies(this.props.match.params.id, ++this.page);
        } else {
            response = await apiConnect.getActMovies(this.props.match.params.id, ++this.page);
        }
        this.setState({ movies: [...this.state.movies, ...response.data] });
        this.hasMore = this.page < response.total_pages ? true : false;
    }

    render() {
        if (this.state.person) {
            return (
                <div>
                    <div className="person">
                        <div>
                            <div className="name">
                                <div className="col1">Nombre:</div>
                                <h1 className="col2">{this.state.person.name}</h1>
                            </div>
                            <div>
                                <div className="col1">Fecha nacimiento:</div>
                                <div className="col2"><FormatDate date={this.state.person.birthday}></FormatDate></div>
                            </div>
                            <div>
                                <div className="col1">Lugar nacimiento:</div>
                                <div className="col2">{this.state.person.place_of_birth}</div>
                            </div>
                            {this.state.person.biography &&
                                <div>
                                    <div className="col1">Biografía:</div>
                                    <div className="col2">{this.state.person.biography}</div>
                                </div>
                            }
                            {this.state.person.homepage &&
                                <div>
                                    <div className="col1">Página oficial:</div>
                                    <a className="col2" href={this.state.person.homepage} target="_blank" rel="noopener noreferrer">aquí</a>
                                </div>
                            }
                        </div>
                        <div className={`${this.state.bigImg ? 'hideSmallImg' : 'showSmallImg'}`}>
                            {this.state.person.profile_path &&
                                <div className="smallImg" onClick={()=>this.resizeImg(true)} style={{ 'backgroundImage': 'url(' + this.pathImgSmall + this.state.person.profile_path + ')' }}>
                                </div>
                            }
                        </div>
                    </div>
                    <div id="bigImg">
                        {this.cwithBig691 &&
                            <div className={`bigImg ${this.state.bigImg ? 'show' : 'hide'}`} onClick={()=>this.resizeImg(false)}>
                                <img src={`${this.pathImgBig}${this.state.person.profile_path}`} alt={this.state.person.name} />
                            </div>
                        }
                    </div>
                    <div>
                        <InfiniteScroll
                            dataLength={this.state.movies.length} 
                            next={this.nextPage}
                            hasMore={this.hasMore}
                            loader={<h4>Cargando...</h4>}
                            endMessage={this.state.movies.length > 0 &&
                                <p style={{textAlign: 'center'}}><b>Ya no hay más películas</b></p>
                            }
                        >
                            <div>
                                <DisplayMovies films={this.state.movies} />
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
            )
        } else if (this.state.person === undefined) {
            return <NoResultsFound></NoResultsFound>
        } else {
            return <Loading></Loading>
        }
    }
}

export default DetailPerson;