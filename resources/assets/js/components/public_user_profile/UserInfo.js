import React from 'react';
import {AWS_URL} from "../../../../../config/js/config";

const UserInfo = (props) => {

    const userDetail = props.userData;

    return (
        <div className="publicUserInfo-userInfo">
            <h2>{userDetail.first_name}</h2>
            <img src={AWS_URL + userDetail.img_url} alt="profile picture" style={{width: '100px'}}/>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, quos, ratione. Error labore laudantium
                quaerat quidem sequi tempora velit voluptatibus! Accusantium aliquam aperiam autem eum inventore maxime
                quidem, unde voluptatem.</p>
        </div>
    )
};

export default UserInfo;