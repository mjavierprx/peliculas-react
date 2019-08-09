import React from 'react';

import './noResultsFound.scss';

function NoResultsFound() {
    return (
        <div className="empty">
            <span>No se han</span><span> encontrado</span><span> resultados.</span>
        </div>
    )
}

export default NoResultsFound;