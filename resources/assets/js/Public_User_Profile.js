import React, {Component} from 'react';
import UserInfo from './components/public_user_profile/UserInfo';
import axios from "axios/index";


class Public_User_Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetail: false,
            loading: true,
            error: false,
        }
    }

    componentDidMount() {
        let user_id = 14;
        axios("/publicuserprofile/" + user_id)
            .then(resData => {
                this.setState({
                    userDetail: resData.data,
                    loading: false,

                });
            })
            .catch(error => {
                console.log('error', error);
                this.setState({
                    error: error,
                    loading: false,

                })
            });
    }

    render() {
        return (
            <div>
                <UserInfo userData={this.state.userDetail}/>
            </div>
        )
    }
}

export default Public_User_Profile;