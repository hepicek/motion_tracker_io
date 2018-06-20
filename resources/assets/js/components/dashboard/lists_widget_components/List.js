import React, { Component } from 'react';
import {DropTarget} from 'react-dnd'
import LIST_ITEMS from './List_Items';
import LIST_MENU_BTN from './List_Menu_Btn';

const listTarget = {
    drop: function (props, monitor){
       let movie_id = monitor.getItem().id;
       let list_id = props.list.id;
       props.handleDragItemDrop(movie_id, list_id);
    }
}

function collect(connect, monitor){
    return {
        connectDropTarget: connect.dropTarget(),
        // highlighted: monitor.canDrop(),
        // hovered: monitor.isOver()
    }
}

class LIST extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: this.props.list.collapsed
        }
        this.handleListTitleClick = this.handleListTitleClick.bind(this);
    }
    handleListTitleClick(e) {
        
        let items = Object.keys(this.props.list.items).map(key => this.props.list.items[key]);
        
        if(items.length > 0) {
            let collapsed = this.state.collapsed === 0 ? 1 : 0   
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
        
        const {connectDropTarget} = this.props;
        let {props} = this;
        let {list} = props;
         
        return connectDropTarget(
            <div 
                id={list.id ? list.id : "new-" + index} 
                className='listItem'
                onClick={props.handleListTitleClick}
            >
                <div className='listHeader'>
                
                    {(list.id && props.renameList != list.id) && 
                        <p 
                            className="listTitle"
                            id={"title-" + (list.id ? list.id : "new")} 
                            onClick={this.handleListTitleClick}
                        >
                            {list.list_title}
                        </p>
                    }
                    {(list.id && props.renameList == list.id) && 
                        <input
                            className="listTitleInput"
                            id={"renameInput-" + (list.id ? list.id : "new")} 
                            onChange={props.handleRenameListInputChange}
                            onKeyUp={props.handleRenameListInputKeyUp}
                            value={props.renameListInputValue}
                    />}
                    {(list.id && props.renameList != list.id) && 
                    <LIST_MENU_BTN 
                        listId = {list.id}
                        handleListDeleteClick = {props.handleListDeleteClick}
                        handleListMenuBtnClick = {props.handleListMenuBtnClick}
                        handleRenameListClick = {props.handleRenameListClick}
                    />}
                </div>
                {this.state.collapsed == 0 && <LIST_ITEMS items={list.items}/>}
            </div>
            
        )
    }
}

export default DropTarget('list', listTarget, collect)(LIST);
// export default LIST;

