import React from 'react';

const UserInfo = (props) => {

  const userDetail = props.userData;

    return (
        <div >
            <h2>{userDetail.first_name}</h2>
            <img src={"/storage/" + userDetail.first_name} alt=""/>
        </div>
    )
};

export default UserInfo;