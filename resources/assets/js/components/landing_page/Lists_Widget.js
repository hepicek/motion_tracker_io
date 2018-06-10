import React, { Component } from 'react';
// import '../../..s/../../node_modules/font-awesome/css/font-awesome.min.css';
// import ReactDOM from 'react-dom';

const LISTS_WIDGET = (props) => {
    const lists = props.lists.map(list => {
        <div className='listItem'>
            <img src='/img/list_placeholder.jpg' />
        </div>
    })
    return (
        <div className="dashboardWidget" id="listsWidget">
            <div id="listsWidget-topButtons">
                <p><i className="fa fa-plus-square"></i>Create a new list</p>
                <p>edit lists<i class="fa fa-cog"></i></p>
            </div>
            <div id="listsWidget-lists">
                {lists}
            </div>
        </div>
    )
}

export default LISTS_WIDGET;