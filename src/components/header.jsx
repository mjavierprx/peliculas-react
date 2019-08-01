import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';

import './header.scss';

function Header() {
    const [getInputQuery, setInputQuery] = useState("");
    const inputChange = event => {
        setInputQuery(event.target.value);
    }

    const [getWindowSize, setWindowSize] = useState(window.innerWidth);
    const windowSizeChange = () => {
        setWindowSize(window.innerWidth);
    }
    window.addEventListener('resize', windowSizeChange);

    const keyPressed = event => {
        if (event.key === "Enter") {
            search();
        }
    }
    const search = () => {
        console.log("funciona", getInputQuery, getWindowSize);

        // this.router.navigate(['movies/search/' + query]);
        // this.inputQuery = '';

    }
    const [getDropdownShow, setDropdownShow] = useState(false);
    const dropdownShow = event => {
        setDropdownShow(!getDropdownShow);
        event.stopPropagation();
    }
    const elementClicked = () => {
        setDropdownShow(false);
    }
    window.addEventListener('click', elementClicked);

    let cwithBig691 = getWindowSize > 691 ? true : false;

    return (
        <header>
            <div className="logo">
                <NavLink to='movies/top_rated' activeClassName='active'>
                    <img src="img/logo.png" alt="logo"/>
                </NavLink>
            </div>
            {
                cwithBig691 &&
                <nav className="normal">
                    <NavLink to='/movies/top_rated' activeClassName='active'>Más valoradas</NavLink>
                    <NavLink to='/movies/popular' activeClassName='active'>Popular</NavLink>
                    <NavLink to='/movies/upcoming' activeClassName='active'>Estrenos</NavLink>
                    <NavLink to='/movies/genre/0' activeClassName='active'>Géneros</NavLink>
                </nav>
            }
            <div className="searchCont">
                <input type="text" value={getInputQuery} placeholder="Buscar" className="search" onChange={inputChange} onKeyPress={keyPressed}/>
                <img src="img/search.png" className="btnSearch" alt="Buscar" onClick={search}/>
            </div>
            {
                !cwithBig691 &&
                <nav className="button">
                    <img src={getDropdownShow ? 'img/bmenuc.png' : 'img/bmenu.png'} alt="Menu" onClick={dropdownShow}/>
                    {
                        getDropdownShow &&
                        <div className="dropdown">
                            <NavLink to='/movies/top_rated' activeClassName='active'>Más valoradas</NavLink>
                            <NavLink to='/movies/popular' activeClassName='active'>Popular</NavLink>
                            <NavLink to='/movies/upcoming' activeClassName='active'>Estrenos</NavLink>
                            <NavLink to='/movies/genre/0' activeClassName='active'>Géneros</NavLink>
                        </div>
                    }
                </nav>
            }
        </header>
    )
}

export default Header;