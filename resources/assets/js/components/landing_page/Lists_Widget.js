import React, { Component } from 'react';
import LIST_ITEMS from './List_Items';
// import '../../..s/../../node_modules/font-awesome/css/font-awesome.min.css';
// import ReactDOM from 'react-dom';

const LISTS_WIDGET = (props) => {
    let lists = undefined;
    if(props.lists.length > 0) {
        lists = props.lists.map(list => (
            <div 
                key={list.id} 
                id={list.id} 
                className='listItem'
                onClick={props.handleListTitleClick}
            >
                <div className='listHeader'>
                    <p 
                        className="listTitle"
                        id={"title-" + (list.id ? list.id : "new")} 
                        onClick={props.handleListTitleClick}
                    >{list.list_title}</p>
                    <p 
                        className='listDeleteBtn'
                        id={"delete-" + (list.id ? list.id : "new")}
                        onClick={props.handleListDeleteClick}
                    >x</p>
                </div>
                {list.collapsed == 0 && <LIST_ITEMS items={list.items}/>}
            </div>
        ));
    }
    return (
        <div className="dashboardWidget" id="listsWidget">
            <div id="listsWidget-topButtons">
                <p
                    onClick={props.handleNewListBtnClick}
                ><i className="fa fa-plus-square"></i>Create a new list</p>
                <p>edit lists<i className="fa fa-cog"></i></p>
            </div>
            <div id="listsWidget-lists">
                {lists && lists}
            </div>
        </div>
    )
}

export default LISTS_WIDGET;