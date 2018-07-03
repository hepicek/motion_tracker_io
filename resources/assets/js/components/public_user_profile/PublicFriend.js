import React from 'react';
import {AWS_URL} from "../../../../../config/js/config";
const PublicFriend = (props) => {

    const friend = props.friend;
    let background = AWS_URL + friend.img_url;

    return (
        <div className="publicUserFriend">
            <div className="publicUserFriend_userImage" style={{backgroundImage: `url(${background})`}}/>
            <h5>{friend.first_name} {friend.last_name}</h5>
        </div>
    )
};

export default PublicFriend;