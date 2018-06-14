import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'; //For API calls

export default class User_Profile extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            userDetails: []
        }
        
    }
    componentWillMount() {
        axios("/userDetails")
        .then(res => {
            let userDetails =  Object.keys(res.data).map(key => res.data[key])[0];
            this.setState({
                userDetails: {
                    first_name: userDetails.first_name,
                    last_name: userDetails.last_name,
                    email: userDetails.email,
                    dob: userDetails.dob,
                    common_name: userDetails.common_name,
                }
            });
        })
        .catch(err => {
            console.log(err);       
        })
    }
    render() {
        let userDetails = this.state.userDetails;
        return (
            <div className="userProfileMain">
                <h1>{userDetails.common_name}'s Profile</h1>
                <div className="userProfileDetails">
                    <form className="userProfileForm" name="userProfileForm" method="post">
                        <input name="first_name" value={userDetails.first_name} />
                        <input name="last_name" value={userDetails.last_name} />
                        <input name="common_name" value={userDetails.common_name} />
                        <input name="email" value={userDetails.email} />
                        <input name="dob" value={userDetails.dob} />
                    </form>
                </div>
            </div>
        )
    }
}

if (document.getElementById('userprofile')) {
    ReactDOM.render(<User_Profile />, document.getElementById('userprofile'));
}