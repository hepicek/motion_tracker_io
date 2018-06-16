import React, { Component } from 'react';
import LIST_ITEMS from './lists_widget_components/List_Items';
import LISTS_HEADER from './lists_widget_components/Lists_Widget_Header';
import New_List from './lists_widget_components/New_List';
import LIST_MENU_BTN from './lists_widget_components/List_Menu_Btn';

const LISTS_WIDGET = (props) => {
    let lists = undefined;

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
                    <LIST_MENU_BTN 
                        listId = {list.id}
                        handleListDeleteClick = {props.handleListDeleteClick}
                        handleListMenuBtnClick = {props.handleListMenuBtnClick}
                        handleRenameListClick = {props.handleRenameListClick}
                    />
                </div>
                {list.collapsed == 0 && <LIST_ITEMS items={list.items}/>}
            </div>
        ));
    }
    return (
        <div className="dashboardWidget" id="listsWidget">
            <LISTS_HEADER handleNewListBtnClick={props.handleNewListBtnClick}/>
            <div id="listsWidget-lists">
                {props.newList && <New_List saveNewList={props.saveNewList}/>}
                {lists && lists}
            </div>
        </div>
    )
}

export default LISTS_WIDGET;

// <p 
//                         className='listDeleteBtn'
//                         id={"delete-" + (list.id ? list.id : "new")}
//                         onClick={props.handleListDeleteClick}
//                     >x</p>