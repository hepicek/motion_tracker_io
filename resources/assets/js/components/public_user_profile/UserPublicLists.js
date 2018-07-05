import React from 'react';
import UserList from "./UserList";
import {Row} from 'reactstrap';

const UserPublicLists = (props) => {
    const userLists = props.userLists;
    const userDetail = props.userDetail;


    return (
        <Row
            className="bg-white p-2"    
        >
            <h4 className="col-xs-12 col-md-12">{userDetail.common_name}'s lists</h4>
            <div className="col-xs-12 col-md-12">
                {userLists.map((userlist, index) => {
                    return (
                        <UserList key={'userLists-' + index} userlist={userlist}/>
                    )
                })}
            </div>
        </Row>
    );
};

export default UserPublicLists;