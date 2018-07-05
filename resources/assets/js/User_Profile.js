import React, {Component} from 'react';
import FRIENDS_LIST from './components/user_profile/friends_list';
import axios from 'axios'; //For API calls
import {Row, Col, Button} from 'reactstrap';

import USER_DETAILS_FORM from './components/user_profile/user_details_form';
// import USER_PHOTO from './components/user_profile/user_photo';
import CHANGE_PASSWORD from './components/user_profile/change_password';
import Spinner from "./helpers/Spinner";

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
            },
            loading: true,
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

    componentDidMount() {
        axios("/userDetails")
            .then(res => {
                let userDetails = Object.keys(res.data).map(key => res.data[key])[0];
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
                    loading: false,
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
        axios.post(`/userDetails/${this.state.id}`, FD)
            .then(() => {
                location.reload();
            }).catch(err => {
            console.log(err);
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post(`/userDetails/${this.state.id}`, {
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
        if (e.keyCode === 27) {
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
                if (res.status === 200) {
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
        const loading = this.state.loading;
        return (

            <div 
                className="userProfile-container"
                style={{paddingBottom: "20px"}}
            >
                {loading && <div>Loading...</div>}
                {loading && <Spinner/>}
                {userDetails.id && 
                    <Row className="my-3">
                        <Col xs="6" md="6" lg="6" className="d-flex align-items-center">
                            <h1 className="m-0">{userDetails.common_name}'s Profile</h1>
                        </Col>
                        <Col xs="6" md="6" lg="6" className="changePassword">
                        <Button
                            onClick={this.handleChangePasswordBtnClick}
                        >Change Password
                        </Button>
                        </Col>
                     </Row>
                }
                
                {userDetails.id && 
                    <Row className="d-flex justify-content-center">
                        <Col md="4" className="p-2 bg-white" style={{boxShadow: "0 0 12px 4px rgba(200, 200, 200, .5)"}}>
                            <USER_DETAILS_FORM
                                userDetails={userDetails}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                                handleFileSelected={this.handleFileSelected}
                                handleFileSubmit={this.handleFileSubmit}
                                handleDeletePhoto={this.handleDeletePhoto}
                                img_url={userDetails.img_url}
                                file={this.state.file}
                            />
                        </Col>
                        <Col md="2" style={{height: "20px"}}></Col>
                        <Col md="4" className="p-2 bg-white mb-5" style={{boxShadow: "0 0 12px 4px rgba(200, 200, 200, .5)"}}>
                            <FRIENDS_LIST/>
                        </Col>
                    </Row>}
                {this.state.showChangePwModal &&
                    <CHANGE_PASSWORD
                    handlePwSubmit={this.handlePwSubmit}
                    updateInputValue={this.handleChange}
                    pwReturnMessage={this.state.pwReturnMessage}
                    handleChangePwCloseBtnClick={this.handleChangePwCloseBtnClick}
                    />
                }
            </div>
        )
    }
}

export default User_Profile;


//<CHANGE_PASSWORD/>