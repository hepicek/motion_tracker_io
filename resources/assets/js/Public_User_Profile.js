import React, {Component} from 'react';
import UserInfo from './components/public_user_profile/UserInfo';
import axios from "axios/index";
import PublicUserFriends from "./components/public_user_profile/PublicUserFriends";
import RecentUserActivities from "./components/public_user_profile/RecentUserActivities";
import UserPublicLists from "./components/public_user_profile/UserPublicLists";
import Spinner from './helpers/Spinner';
import {Row} from 'reactstrap';


class Public_User_Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetail: false,
            loading: true,
            error: false,
            userFriends: false,
            recentActivity: false,
            userLists: false,
        }
    }

    componentDidMount() {
        let url = window.location.href;
        url = url.split('/');
        const user_id = url[url.length - 1];
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
        axios("/relationships/" + user_id)
            .then(resData => {
                this.setState({
                    userFriends: resData.data,
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
        axios("/recentactivity/" + user_id)
            .then(resData => {
                this.setState({
                    recentActivity: resData.data,
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
        axios("/userLists/" + user_id)
            .then(resData => {
                let userLists = Object.keys(resData.data.response).map(key => resData.data.response[key]);
                this.setState({
                    userLists: userLists,
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
        const {userDetail, userFriends, recentActivity, userLists, error, loading} = this.state;

        return (
            <div className="py-3">
                {loading && <div>Loading...</div>}
                {loading && <Spinner/>}
                {error && <div>Some error occured</div>}
                <Row className="px-2 bg-white">
                    {userDetail && <UserInfo userData={this.state.userDetail}/>}
                    {userFriends && <PublicUserFriends friendsData={this.state.userFriends}/>}
                    {recentActivity && <RecentUserActivities recentActivity={this.state.recentActivity}/>}
                </Row>
                <hr></hr>
                {userLists && <UserPublicLists userLists={userLists} userDetail={userDetail}/>}
            </div>
        )
    }
}

export default Public_User_Profile;