import React from 'react';

const LIST_BTN_OPTIONS = (props) => {
    return (
        <div>
            <div 
                id={"renameListItem-" + props.listId}
                onClick={props.handleRenameListClick}
            >
                <p className="py-1 px-2 m-0">Rename List</p>
            </div>
            <div 
                id={"deleteListItem-" + props.listId}
                onClick={props.handleListDeleteClick}
            >
                <p className="py-1 px-2 m-0">Delete List</p>
            </div>
        </div>
    )
}

export default LIST_BTN_OPTIONS;