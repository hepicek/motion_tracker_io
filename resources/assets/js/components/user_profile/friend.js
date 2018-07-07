import React, { Component } from 'react';
// import FRIEND_OPTIONS from './friend_options';
import {Popover, PopoverBody} from 'reactstrap';
class FRIEND extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popoverOpen: false,
        }
        this.toggle = this.toggle.bind(this);
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
            this.toggle();
        })
    }
    toggle() {
        this.setState(prevState => ({
            popoverOpen: !prevState.popoverOpen
        }))
    }
    render() {
        let {friend, user_image} = this.props;
        return (
            <div className="friend d-flex justify-content-between align-items-center p-2 bg-light my-2">
                <a href={"/publicprofile/" + friend.id} className="d-flex align-items-center justify-content-between w-75">
                    <div 
                        className="friend-img"
                        style={{backgroundImage: `url(${user_image})`}}
                    ></div>
                    <strong>{friend.first_name} {friend.last_name} ({friend.common_name})</strong>
                </a>
                    <i 
                        style={{cursor: "pointer"}}
                        id={"optionBtn-" + friend.id}
                        className="fa fa-cog friendOptionsBtn"
                        onClick={this.toggle}
                    >
                    </i>

                <Popover 
                    style={{cursor: "pointer"}}
                    placement="left"
                    isOpen={this.state.popoverOpen}
                    toggle={this.toggle}
                    target={"optionBtn-" + friend.id}
                    className="friendOptions"
                    onClick={this.deleteFriend}
                >
                    <PopoverBody>Delete</PopoverBody>
                </Popover>
            </div>
        )
    }
}

export default FRIEND;


// {this.state.open &&
//     <FRIEND_OPTIONS 
//         deleteFriend={this.deleteFriend}
//         handleClickOutside={this.handleClickOutside}
//     />
// }