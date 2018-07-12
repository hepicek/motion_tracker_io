import React, { Component } from 'react';
import LIST from './lists_widget_components/List'
import LISTS_HEADER from './lists_widget_components/Lists_Widget_Header';
import New_List from './lists_widget_components/New_List';
import LISTS_WELCOME from './lists_widget_components/Lists_Welcome';


class LISTS_WIDGET extends Component  {
    constructor(props) {
        super(props)
        this.lists = undefined;
        
    }
    
    render() {
        let props = this.props;
        
        if(props.lists.length > 0) {
            
            this.lists = props.lists.map((list, index) => {
                
                return(
                <LIST 
                    key={list.id}
                    list={list}
                    handleRenameListInputChange={props.handleRenameListInputChange}
                    handleRenameListInputKeyUp={props.handleRenameListInputKeyUp}
                    renameListInputValue={props.renameListInputValue}
                    handleListDeleteClick = {props.handleListDeleteClick}
                    handleRenameListClick = {props.handleRenameListClick}
                    renameList={props.renameList}
                    renameListInputValue={props.renameListInputValue}
                    handleDragItemDrop={props.handleDragItemDrop}
                    handleDeleteListItem={props.handleDeleteListItem}
                />
            )
        });
        }
        return (
            <div className="dashboardWidget bg-white p-2" id="listsWidget"
                style={{
                    position: "-webkit-sticky",
                    position: "sticky",
                    top: "117px"
                }}
            >
                <LISTS_HEADER handleNewListBtnClick={props.handleNewListBtnClick}/>
                <div id="listsWidget-lists">
                    {props.newList && <New_List saveNewList={props.saveNewList}/>}
                    {this.lists && this.lists}
                    {(!this.lists && !this.props.loadingLists) && <LISTS_WELCOME />}
                </div>
            </div>
        )
    }    
}


export default LISTS_WIDGET;