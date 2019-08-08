import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import './header.scss';

function Header() {
    const [getInputQuery, setInputQuery] = useState("");
    function inputChange (event) {
        setInputQuery(event.target.value);
    }
    function keyPressed(event) {
        if (event.key === "Enter") {
            search();
        }
    }
    function search(e) {
        document.getElementById('toSearchMovies').click();
    }

    const [getWindowSize, setWindowSize] = useState(window.innerWidth);
    function windowSizeChange() {
        setWindowSize(window.innerWidth);
    }
    window.addEventListener('resize', windowSizeChange);

    const [getDropdownShow, setDropdownShow] = useState(false);
    function dropdownShow(event) {
        setDropdownShow(!getDropdownShow);
        event.stopPropagation();
    }
    function elementClicked() {
        setDropdownShow(false);
    }
    window.addEventListener('click', elementClicked);

    let cwithBig691 = getWindowSize > 691 ? true : false;

    return (
        <header>
            <div className="logo">
                <NavLink to='/peliculas/mas_valoradas' activeClassName='active'>
                    <img src="/img/logo.png" alt="logo"/>
                </NavLink>
            </div>
            {cwithBig691 &&
                <nav className="normal">
                    <NavLink to='/peliculas/mas_valoradas' activeClassName='active'>Más valoradas</NavLink>
                    <NavLink to='/peliculas/popular' activeClassName='active'>Popular</NavLink>
                    <NavLink to='/peliculas/estrenos' activeClassName='active'>Estrenos</NavLink>
                    <NavLink to='/peliculas/generos/0' activeClassName='active'>Géneros</NavLink>
                </nav>
            }
            <div className="searchCont">
                <input type="text" value={getInputQuery} placeholder="Buscar" className="search" onChange={inputChange} onKeyPress={keyPressed}/>
                <img src="/img/search.png" className="btnSearch" alt="Buscar" onClick={search}/>
            </div>
            {!cwithBig691 &&
                <nav className="button">
                    <img src={getDropdownShow ? '/img/bmenuc.png' : '/img/bmenu.png'} alt="Menu" onClick={dropdownShow}/>
                    {getDropdownShow &&
                        <div className="dropdown">
                            <NavLink to='/peliculas/mas_valoradas' activeClassName='active'>Más valoradas</NavLink>
                            <NavLink to='/peliculas/popular' activeClassName='active'>Popular</NavLink>
                            <NavLink to='/peliculas/estrenos' activeClassName='active'>Estrenos</NavLink>
                            <NavLink to='/peliculas/generos/0' activeClassName='active'>Géneros</NavLink>
                        </div>
                    }
                </nav>
            }
            <Link id="toSearchMovies" to={`/peliculas/buscar/${getInputQuery}`}></Link>
        </header>
    )
}

export default Header;
