import React from 'react';
import PublicFriend from "./PublicFriend";

const PublicUserFriends = (props) => {

    const friends = props.friendsData;

    return (
        <div className="publicUserFriends">
            <h4>{friends.length} Friends</h4>
            <div className="publicUserFriends-friendslist">
                {friends.map((friend, index) => {
                    return (
                        <PublicFriend key={index} friend={friend}/>
                    )
                })}
            </div>
        </div>
    )
};

export default PublicUserFriends;