import React from 'react';

function ItemsComma(props) {
    let list = props.list;
    return (
        <span>
            {list.length > 0 && list.map((item, i) => {
                return (
                    <span key={i}>
                        {item.name}
                        {i + 1 < list.length &&
                            <span>, </span>
                        }
                    </span>
                )
            })}
        </span>
    )
}

export default ItemsComma;