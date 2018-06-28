import React, { Component } from 'react';
import FRIEND_OPTIONS from './friend_options';
class FRIEND extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
        this.handleFriendOptionsBtnClick = this.handleFriendOptionsBtnClick.bind(this);
        this.deleteFriend = this.deleteFriend.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    handleFriendOptionsBtnClick() {
        this.setState(prevState => ({
                open: !prevState.open
            }));
    };
    handleClickOutside(e) {
        if (!e.target.classList.contains("listMenuBtnArea")) {
          this.setState({
              open: false
          })
        }
    }
    deleteFriend() {
        axios.post('/relationships', 
            {
                id: this.props.friend.id,
                status: 4
            }
        )
        .then(() => {
            this.props.getFriends();
        })
    }
    render() {
        let {friend, user_image} = this.props;
        return (
            <div className="userProfile-friendsList-friend">
                <div 
                    className="userProfile-friendsList-friend-img"
                    style={{backgroundImage: `url(${user_image})`}}
                >
                </div>
                <strong>{friend.first_name} {friend.last_name} ({friend.common_name})</strong>
                <i 
                className="fa fa-cog friendOptionsBtn"
                onClick={this.handleFriendOptionsBtnClick}
                >
                {this.state.open &&
                    <FRIEND_OPTIONS 
                        deleteFriend={this.deleteFriend}
                        handleClickOutside={this.handleClickOutside}
                    />
                }
                </i>
            </div>
        )
    }
}

export default FRIEND;