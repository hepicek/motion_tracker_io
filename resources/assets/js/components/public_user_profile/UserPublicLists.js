import React from 'react';
import UserList from "./UserList";
import {Row} from 'reactstrap';

const UserPublicLists = (props) => {
    const {userLists, userDetail, timeWasted} = props;
    return (
        <Row
            className="bg-white p-2 mx-0"
        >
            <div className="col-xs-12 col-md-12 d-flex justify-content-between">
                <h4>{userDetail.common_name}'s lists</h4>
                <h4 style={{fontSize: ".9rem"}} ><strong>{userDetail.common_name}</strong> has wasted {timeWasted}</h4>
            </div>
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