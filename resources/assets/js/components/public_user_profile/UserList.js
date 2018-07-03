import React from 'react';
import ListItem from "./ListItem";

const UserList = (props) => {
    const userlist = props.userlist;
    const userLists = Object.keys(userlist.items).map(key => userlist.items[key]);
    return (
        <div>
            <h4>{userlist.list_title}</h4>
            <div style={{display: 'flex'}}>
                {userLists.map((listItem, index) => {
                    return (
                        <ListItem key={'listItem-' + index} listItem={listItem}/>
                    )
                })}
            </div>
        </div>
    );
};

export default UserList;
