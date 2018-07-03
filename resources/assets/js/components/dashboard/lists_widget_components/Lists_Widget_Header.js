import React, { Component } from 'react';

const LISTS_HEADER = (props) => {
    return (
        <div id="listsWidget-topButtons">
        <p
            onClick={props.handleNewListBtnClick}
        ><i className="fa fa-plus-square"/>Create a new list</p>
       
    </div> 
    )
}

export default LISTS_HEADER;

// <p>edit lists<i className="fa fa-cog"></i></p>