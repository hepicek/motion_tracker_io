import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'; //For API calls

export default class User_Profile extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        axios("/userDetails")
        .then(res => {
            let userDetails =  Object.keys(res.data).map(key => res.data[key])[0];
            this.setState({
                
                    id: userDetails.id,
                    first_name: userDetails.first_name,
                    last_name: userDetails.last_name,
                    email: userDetails.email,
                    dob: userDetails.dob ? userDetails.dob : "",
                    common_name: userDetails.common_name,

            });
        })
        .catch(err => {
            console.log(err);       
        })
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        axios.post(`/userDetails/${this.state.id}`,{
            id: this.state.id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            dob: this.state.dob,
            common_name: this.state.common_name
        })
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        let userDetails = this.state;
        return (
            <div className="userProfileMain">
                <h1>{userDetails.common_name}'s Profile</h1>
                <div className="userProfileDetails">
                    <form className="userProfileForm" name="userProfileForm" method="post" action={"/userDetails/" + userDetails.id}>
                        <div className="userProfile_formRow" >
                            <p>First Name:</p>
                            <span>
                                <input 
                                    className="userProfileForm-input" 
                                    name="first_name"
                                    value={userDetails.first_name} 
                                    onChange={this.handleChange}
                                />
                                <i className="fa fa-edit"></i>
                            </span>
                        </div>
                        <div className="userProfile_formRow" >
                            <p>Last Name:</p>
                            <span>
                                <input 
                                    className="userProfileForm-input" 
                                    name="last_name" 
                                    value={userDetails.last_name} 
                                    onChange={this.handleChange}
                                />
                                <i className="fa fa-edit"></i>
                            </span>
                        </div>
                        <div className="userProfile_formRow" >
                            <p>Common Name:</p>
                            <span>
                                <input 
                                    className="userProfileForm-input" 
                                    name="common_name" 
                                    value={userDetails.common_name} 
                                    onChange={this.handleChange}
                                />
                                <i className="fa fa-edit"></i>
                            </span>
                        </div>
                        <div className="userProfile_formRow" >
                            <p>Email:</p>
                            <span>
                                <input 
                                    className="userProfileForm-input" 
                                    name="email" 
                                    value={userDetails.email} 
                                    onChange={this.handleChange}
                                />
                                <i className="fa fa-edit"></i>
                            </span>
                        </div>
                        <div className="userProfile_formRow" >
                            <p>Date of Birth:</p>
                            <span>
                                <input 
                                    className="userProfileForm-input" 
                                    name="dob" 
                                    type="date"
                                    value={userDetails.dob} 
                                    onChange={this.handleChange}
                                />
                                <i className="fa fa-edit"></i>
                            </span>
                        </div>
                        <input 
                            type="submit" 
                            value="Save Changes" 
                            onClick={this.handleSubmit}
                        />
                    </form>
                </div>
            </div>
        )
    }
}

if (document.getElementById('userprofile')) {
    ReactDOM.render(<User_Profile />, document.getElementById('userprofile'));
}