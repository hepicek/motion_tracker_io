import React from 'react';
import {AWS_URL} from "../../../../../config/js/config";
import {Col} from 'reactstrap';
const UserInfo = (props) => {

    const userDetail = props.userData;
    const background = AWS_URL + userDetail.img_url;
    return (
        <Col 
            md="12" lg="4"
            className="pt-3"
        >
            <div className="publicUserInfo-userImage mb-2" style={{backgroundImage: `url(${background})`}}/>
            <h2>{userDetail.first_name} {userDetail.last_name}</h2>
            <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, quos, ratione. Error labore laudantium
                quaerat quidem sequi tempora velit voluptatibus! Accusantium aliquam aperiam autem eum inventore maxime
                quidem, unde voluptatem.</p>
        </Col>
    ) 
};

export default UserInfo;