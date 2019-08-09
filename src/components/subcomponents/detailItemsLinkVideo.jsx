import React from 'react';
import { Link } from 'react-router-dom';

function ItemsLinkVideo(props) {
    let list = props.list;
    return (
        <span>
            {list.length > 0 && list.map((item, i) => {
                return (
                    <div key={i}>
                        <Link to={`https://www.youtube.com/watch?v={v.key}`} target="_blank" rel="noopener noreferrer">
                            {item.site} - {item.name}
                        </Link>
                    </div>
                )
            })}
        </span>
    )
}

export default ItemsLinkVideo;
