import React from 'react';
import PublicFriend from "./PublicFriend";
const PublicUserFriends = (props) => {

    const friends = props.friendsData;

    return (
        <div>
            <h4>{friends.length} Friends</h4>
            {friends.map((friend, index) => {
                return (
                    <PublicFriend key={index} friend={friend}/>
                )
            })}
        </div>
    )
};

export default PublicUserFriends;