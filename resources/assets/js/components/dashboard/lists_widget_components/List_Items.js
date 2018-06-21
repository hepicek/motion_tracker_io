import React, { Component } from 'react';

const LIST_ITEMS = (props) => {

    //convert to Array of Objects
    let itemsArray = Object.keys(props.items).map(key => props.items[key]);

    let items = itemsArray ? itemsArray.map(item => (
        <div className="userListItem" key={item.id} id={"listItem-" + item.id}>
            <p>{item.name} - {item.year}</p>
            <i 
                className="fa fa-times"
                onClick={props.handleDeleteListItem}
            ></i>
        </div>
       )) : undefined;
   return (
    <div className="expandedListItems" >
       {items}
    </div>
    )
};

export default LIST_ITEMS;