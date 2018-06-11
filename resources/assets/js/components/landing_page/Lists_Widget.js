import React, { Component } from 'react';
import LIST_ITEMS from './List_Items';
// import '../../..s/../../node_modules/font-awesome/css/font-awesome.min.css';
// import ReactDOM from 'react-dom';

const LISTS_WIDGET = (props) => {
    const lists = props.lists.map(list => (
        <div 
            key={list.id} 
            id={list.id} 
            className='listItem'
            onClick={props.handleListTitleClick}
        >
            <p 
                className="listTitle"
                id={list.id} 
                onClick={props.handleListTitleClick}
            >{list.title}</p>
            {!list.collapsed && <LIST_ITEMS items={list.items}/>}
        </div>
    ));
    return (
        <div className="dashboardWidget" id="listsWidget">
            <div id="listsWidget-topButtons">
                <p><i className="fa fa-plus-square"></i>Create a new list</p>
                <p>edit lists<i className="fa fa-cog"></i></p>
            </div>
            <div id="listsWidget-lists">
                {lists}
            </div>
        </div>
    )
}

export default LISTS_WIDGET;