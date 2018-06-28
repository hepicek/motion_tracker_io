import React, { Component } from 'react';
import FRIENDS_LIST from './components/user_profile/friends_list';
import axios from 'axios'; //For API calls

import USER_DETAILS_FORM from './components/user_profile/user_details_form';
import USER_PHOTO from './components/user_profile/user_photo';

class User_Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            first_name: "",
            last_name: "",
            email: "",
            dob: "",
            common_name: "",
            img_url: "",
            file: {
                name: ""
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
        this.handleFileSubmit = this.handleFileSubmit.bind(this);
        this.handleDeletePhoto = this.handleDeletePhoto.bind(this);
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
                    img_url: userDetails.img_url,
                    file: {
                        name: ""
                    }

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
    handleFileSelected(e) { 
        this.setState({
            file: e.target.files[0]
        });        
        console.log(e.target.files[0]);
    }
    handleFileSubmit(e) {
        const FD = new FormData();
        FD.append('image', this.state.file, this.state.file.name);
        axios.post(`/userDetails/${this.state.id}`,FD)
        .then(res => {
            // this.setState({
            //     file: "",
            //     img_url: "img/user_profile_img/" + this.state.file.name
            // });
            location.reload();
        }).catch(err => {
            console.log(err);
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        axios.post(`/userDetails/${this.state.id}`,{
            id: this.state.id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            dob: this.state.dob,
            common_name: this.state.common_name,
            file: this.state.file
        })
        .then(res => {
        }).catch(err => {
            console.log(err);
        })
    }
    handleDeletePhoto() {

        axios.post(`/userprofile/${this.state.id}`)
            .then(() => {
                location.reload();
            }).catch(err => {
            console.log(err);
        })
    }
    render() {
        let userDetails = this.state;
        return (
            <div className="userProfileMain">
                <h1>{userDetails.common_name}'s Profile</h1>
                <div className="userProfile-detailsSection">
                    <USER_DETAILS_FORM 
                        userDetails={userDetails}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}  
                        handleFileSelected={this.handleFileSelected}
                        handleFileSelected={this.handleFileSelected} 
                        handleFileSubmit={this.handleFileSubmit}
                        handleDeletePhoto={this.handleDeletePhoto}
                        img_url={userDetails.img_url}
                        file={this.state.file}
                    />  
                    <FRIENDS_LIST />
                </div>
                
            </div>
        )
    }
}

export default User_Profile;