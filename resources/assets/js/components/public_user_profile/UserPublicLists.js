import React from 'react';
import UserList from "./UserList";

const UserPublicLists = (props) => {
    const userLists = props.userLists;
    const userDetail = props.userDetail;


    return (
        <div>
            <h4>{userDetail.common_name}'s lists</h4>
            <div className="userPublicLists">
                {userLists.map((userlist, index) => {
                    return (
                        <UserList key={'userLists-' + index} userlist={userlist}/>
                    )
                })}
            </div>
        </div>
    );
};

export default UserPublicLists;