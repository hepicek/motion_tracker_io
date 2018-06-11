import React, { Component } from 'react';

const LIST_ITEMS = (props) => {
    let items = props.items.map(item => (
        <div key={item.id}>
            <p>{item.title} - {item.director} - {item.year}</p>
        </div>
       ))
   return (
       <div className="expandedListItems">
       {items}
        </div>
    )
};

export default LIST_ITEMS;