import React, { Component } from 'react';
import LIST_ITEMS from './List_Items';
// import '../../..s/../../node_modules/font-awesome/css/font-awesome.min.css';
// import ReactDOM from 'react-dom';

const LISTS_WIDGET = (props) => {
    let lists = undefined;
    let newList =  <input type="text"  placeholder="new list title" className="newListInput"/>
    if(props.lists.length > 0) {
        lists = props.lists.map((list, index) => (
            <div 
                key={list.id ? list.id : "new-" + index} 
                id={list.id ? list.id : "new-" + index} 
                className='listItem'
                onClick={props.handleListTitleClick}
            >
                <div className='listHeader'>
                    {list.id && <p 
                        className="listTitle"
                        id={"title-" + (list.id ? list.id : "new")} 
                        onClick={props.handleListTitleClick}
                    >{list.list_title}</p>}
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
                {props.newList && newList}
                {lists && lists}
            </div>
        </div>
    )
}

export default LISTS_WIDGET;