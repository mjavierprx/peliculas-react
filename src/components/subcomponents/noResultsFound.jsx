import React from 'react';

import './noResultsFound.scss';

function NoResultsFound(props) {
    return (
        <div className="empty">
            <span>{props.text1}</span><span> {props.text2}</span><span> {props.text3}.</span>
        </div>
    )
}

export default NoResultsFound;