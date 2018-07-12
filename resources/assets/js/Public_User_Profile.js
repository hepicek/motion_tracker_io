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
            userDataLoading: true,
            relationshipsLoading: true,
            recentActivityLoading: true,
            userListsLoading: true,
            timeWastedLoading: true,
            error: false,
            userFriends: false,
            recentActivity: false,
            userLists: false,
            timeWasted: false,
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
                    userDataLoading: false,
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
                    relationshipsLoading: false,
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
                if(resData.data[0] === 1){
                    this.setState({
                        recentActivity: resData.data[1],
                    });
                }
                this.setState({
                    recentActivityLoading: false,
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
                    userListsLoading: false,
                });
            })
            .catch(error => {
                console.log('error', error);
                this.setState({
                    error: error,
                    loading: false,
                })
            });
        axios("/getUserTimeWasted/" + user_id)
            .then(resData => {
                this.setState({
                    timeWasted: resData.data,
                    timeWastedLoading: false,
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
        const {userDetail, userFriends, recentActivity, userLists, error, userDataLoading, recentActivityLoading} = this.state;

        return (
            <div className="py-3">
                {userDataLoading && <div>Loading...</div>}
                {userDataLoading && <Spinner/>}
                {error && <div>Some error occured</div>}
                <Row className="mx-0 px-2 bg-white">
                    {userDetail && <UserInfo userData={this.state.userDetail}/>}
                    {userFriends && <PublicUserFriends friendsData={this.state.userFriends}/>}
                    <RecentUserActivities recentActivity={recentActivity} loading={!recentActivityLoading}/>
                </Row>
                <hr></hr>
                {userLists && <UserPublicLists userLists={userLists} userDetail={userDetail} timeWasted={this.state.timeWasted}/>}
            </div>
        )
    }
}

export default Public_User_Profile;