import React from 'react';
import {AWS_URL} from "../../../../../config/js/config";
const PublicFriend = (props) => {

    const friend = props.friend;

    return (
        <div>
            <img src={AWS_URL + friend.img_url} alt="profile picture" style={{width: '100px'}}/>
            <h4>{friend.first_name} {friend.last_name}</h4>
        </div>
    )
};

export default PublicFriend;