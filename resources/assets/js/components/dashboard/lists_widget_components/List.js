import React, { Component } from 'react';
import {DropTarget} from 'react-dnd'
import LIST_ITEMS from './List_Items';
import LIST_MENU_BTN from './List_Menu_Btn';
import {Collapse} from 'reactstrap';

const listTarget = {
    drop(props, monitor, component){
       let movie_id = monitor.getItem().id;
       let list_id = props.list.id;
       component.state.collapsed && component.handleListTitleClick();
       props.handleDragItemDrop(movie_id, list_id);

    },
    hover(props, monitor, component) {
        
        return {
            hover: "border: 2px solid red"
        }
    }
}

function collect(connect, monitor){
    return {
        connectDropTarget: connect.dropTarget(),
        // highlighted: monitor.canDrop(),
        hovered: monitor.isOver()
    }
}

class LIST extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: this.props.list.collapsed,
        }
        this.handleListTitleClick = this.handleListTitleClick.bind(this);
    }
    handleListTitleClick(e) {
        
        let items = Object.keys(this.props.list.items).map(key => this.props.list.items[key]);
        
        if(items.length > 0) {
            let collapsed = this.state.collapsed === 0 ? 1 : 0;
            this.setState({
                collapsed
            });
            axios.put('userLists/' + this.props.list.id, {
                collapsed
            }).catch(err => {
                console.log(err);
            });
        }      
    }
    render() {
       
        const {connectDropTarget, hovered} = this.props;
        let {props} = this;
        let {list} = props;

        return connectDropTarget(
            <div 
                id={list.id ? list.id : "new-" + index} 
                className='listItem'
                onClick={props.handleListTitleClick}
                style={{border: hovered && "2px solid red"}}
            >
                <div className='listHeader d-flex w-100 align-items-center justify-content-between bg-light my-2 p-1'>
                
                    {(list.id && props.renameList != list.id) && 
                        <h5 
                            className="m-0"
                            style={{cursor: "pointer"}}
                            id={"title-" + (list.id ? list.id : "new")} 
                            onClick={this.handleListTitleClick}
                        >
                            {list.list_title}
                        </h5>
                    }
                    {(list.id && props.renameList == list.id) && 
                        <input
                            className=""
                            id={"renameInput-" + (list.id ? list.id : "new")} 
                            onChange={props.handleRenameListInputChange}
                            onKeyUp={props.handleRenameListInputKeyUp}
                            value={props.renameListInputValue}
                            autoFocus
                    />}
                    {(list.id && props.renameList != list.id) && 
                    <LIST_MENU_BTN 
                        listId = {list.id}
                        handleListDeleteClick = {props.handleListDeleteClick}
                        handleListMenuBtnClick = {props.handleListMenuBtnClick}
                        handleRenameListClick = {props.handleRenameListClick}
                    />}
                </div>
                <Collapse isOpen={!!this.state.collapsed}>
                    <LIST_ITEMS 
                        items={list.items}
                        handleDeleteListItem={props.handleDeleteListItem}
                    />
                </Collapse>
            </div>
            
        )
    }
}

export default DropTarget('list', listTarget, collect)(LIST);


