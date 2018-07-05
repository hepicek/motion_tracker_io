import React from 'react';
import PublicFriend from "./PublicFriend";
import {Col} from 'reactstrap';

const PublicUserFriends = (props) => {

    const friends = props.friendsData;

    return (
        <Col 
            md="12" lg="4"
        >
            <h4>{friends.length} Friends</h4>
            <div className="publicUserFriends-friendslist">
                {friends.map((friend, index) => {
                    return (
                        <PublicFriend key={index} friend={friend}/>
                    )
                })}
            </div>
        </Col>
    )
};

export default PublicUserFriends;