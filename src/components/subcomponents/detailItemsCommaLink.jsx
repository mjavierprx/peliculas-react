import React from 'react';
import { Link } from 'react-router-dom';

function ItemsCommaLink(props) {
    let list = props.list;
    return (
        <span>
            {list.length > 0 && list.map((item, i) => {
                return (
                    <span key={i}>
                        <Link to={`${props.path}${item.id}`}>
                            {item.name}
                        </Link>
                        {i + 1 < list.length &&
                            <span>, </span>
                        }
                    </span>
                )
            })}
        </span>
    )
}

export default ItemsCommaLink;