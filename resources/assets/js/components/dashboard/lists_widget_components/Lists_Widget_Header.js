import React, { Component } from 'react';

const LISTS_HEADER = (props) => {
    return (
        <div 
            id="listsWidget-topButtons"
            style={{userSelect: "none"}}
        >
        <p
            className="m-0"
            onClick={props.handleNewListBtnClick}
            style={{cursor: "pointer"}}
        ><i className="fa fa-plus-square mr-1"/>New list</p>
       <hr className="m-1" />
    </div> 
    )
}

export default LISTS_HEADER;

// <p>edit lists<i className="fa fa-cog"></i></p>