import React from 'react';
import {AWS_URL} from "../../../../../config/js/config";
import {Col} from 'reactstrap';
const PublicFriend = (props) => {

    const friend = props.friend;
    let background = AWS_URL + friend.img_url;

    return (
        <a href={"/publicprofile/" + friend.id} className="d-flex align-items-center py-2 my-2 publicUserFriend">
            <Col md="2" lg="4">
                <div className="publicUserFriend_userImage" style={{backgroundImage: `url(${background})`}}/>
            </Col>
            <Col md="10" lg="8">
                <h5>{friend.first_name} {friend.last_name}</h5>
            </Col>
        </a>
    )
};

export default PublicFriend;