import React, { Component } from 'react';

const LIST_ITEMS = (props) => {

    let itemsArray = Object.keys(props.items).map(function(k) { return props.items[k] });

    let items = itemsArray ? itemsArray.map(item => (
        <div key={item.id}>
            <p>{item.name} - {item.year}</p>
        </div>
       )) : undefined;
   return (
    <div className="expandedListItems">
       {items}
    </div>
    )
};

export default LIST_ITEMS;