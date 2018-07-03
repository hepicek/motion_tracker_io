import React, { Component } from 'react';
import FRIENDS_LIST from './components/user_profile/friends_list';
import axios from 'axios'; //For API calls

import USER_DETAILS_FORM from './components/user_profile/user_details_form';
// import USER_PHOTO from './components/user_profile/user_photo';
import CHANGE_PASSWORD from './components/user_profile/change_password';

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
        this.handleChangePasswordBtnClick = this.handleChangePasswordBtnClick.bind(this);
        this.keyListener = this.keyListener.bind(this);
        this.handlePwSubmit = this.handlePwSubmit.bind(this);
        this.handleChangePwCloseBtnClick = this.handleChangePwCloseBtnClick.bind(this);
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
                    },
                    showChangePwModal: false,
                    oldPassword: '',
                    newPassword: '',
                    repeatPassword: '',
                    pwReturnMessage: null,
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
    }
    handleFileSubmit(e) {
        const FD = new FormData();
        FD.append('image', this.state.file, this.state.file.name);
        axios.post(`/userDetails/${this.state.id}`,FD)
        .then(() => {
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
    handleChangePasswordBtnClick() {
        this.setState(prevState => ({
            showChangePwModal: !prevState.showChangePwModal
        }))
        window.addEventListener("keydown", this.keyListener);
    }
    keyListener(e) {
        if(e.keyCode === 27) {
            window.removeEventListener("keydown", this.keyListener);
            this.setState(prevState => ({
                showChangePwModal: !prevState.showChangePwModal
            }))
        }
    }
    handleChangePwCloseBtnClick() {
        this.setState(prevState => ({
            showChangePwModal: !prevState.showChangePwModal
        }))
    }
    handlePwSubmit() {
        axios.post('/userDetails/pw', {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            repeatPassword: this.state.repeatPassword
        })
        .then(res => {
            console.log(res);
            this.setState({
                pwReturnMessage: res.data
            })
            if(res.status === 200) {
                setTimeout(() => {
                    this.setState(prevState => ({
                        showChangePwModal: !prevState.showChangePwModal,
                        pwReturnMessage: null
                    }));
                }, 500);
            }

        }).catch((err, res) => {
            // console.log(err);
            console.log('ERROR::', err.response.data.data);
            this.setState({
                pwReturnMessage: err.response.data.data
            })
        })
    }
    render() {
        let userDetails = this.state;
        return (
            <div className="userProfileMain">
                <div className="userProfileMain-header">
                    <h1>{userDetails.common_name}'s Profile</h1>
                    <div 
                        className="userProfileMain-changePwBtn"
                        onClick={this.handleChangePasswordBtnClick}
                    >Change Password</div>
                </div>
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
                {this.state.showChangePwModal && 
                    <CHANGE_PASSWORD 
                        handlePwSubmit={this.handlePwSubmit}
                        updateInputValue={this.handleChange}
                        pwReturnMessage={this.state.pwReturnMessage}
                        handleChangePwCloseBtnClick={this.handleChangePwCloseBtnClick}
                    />}
            </div>
        )
    }
}

export default User_Profile;


//<CHANGE_PASSWORD />