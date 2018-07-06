import React, { Component } from 'react';
import LIST_ITEM from './List_Item';

class LIST_ITEMS extends Component {
    constructor(props) {
        super(props)

    }

    render() {
    //convert to Array of Objects
        let props = this.props;
        let itemsArray = Object.keys(props.items).map(key => props.items[key]);

        let items = itemsArray ? itemsArray.map(item => (
            <LIST_ITEM 
                key={item.id} 
                item={item} 
                handleDeleteListItem={props.handleDeleteListItem}
            />
        )) : undefined;
        return (
            <div className="p-2 bg-light" >
                {items}
            </div>
        )
    }
};

export default LIST_ITEMS;