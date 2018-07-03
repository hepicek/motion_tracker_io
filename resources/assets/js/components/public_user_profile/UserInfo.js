import React from 'react';
import {AWS_URL} from "../../../../../config/js/config";

const UserInfo = (props) => {

    const userDetail = props.userData;
    const background = AWS_URL + userDetail.img_url;
    return (
        <div className="publicUserInfo-userInfo">
            <div className="publicUserInfo-userImage" style={{backgroundImage: `url(${background})`}}/>
            <h2>{userDetail.first_name} {userDetail.last_name}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, quos, ratione. Error labore laudantium
                quaerat quidem sequi tempora velit voluptatibus! Accusantium aliquam aperiam autem eum inventore maxime
                quidem, unde voluptatem.</p>
        </div>
    )
};

export default UserInfo;