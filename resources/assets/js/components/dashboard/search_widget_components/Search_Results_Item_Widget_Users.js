import React, {Component} from 'react';
import USER_ITEM_SEARCH_DETAILS from './User_Item_Search_Detail';
import FRIEND_RESPOND_BTN from './Friend_Respond_Btn';
import { AWS_URL } from '../../../../../../config/js/config';
import {Button} from 'reactstrap';

class SEARCH_RESULTS_ITEM_WIDGET_USERS extends Component {
    constructor(props) {
        super(props);
        this.handleCaretClick = this.handleCaretClick.bind(this);
        this.state = {
            caret: 'down',
        }
    }

    handleCaretClick() {
        this.setState({
            caret: this.state.caret === 'down' ? 'up' : 'down'
        });
    }

    render() {
        let user = this.props.searchResultsItem;
        let userImage = AWS_URL + user.img_url;
        let friendBtnText;
        if(user.relStatus == 0) {
            friendBtnText = 'Add Friend';
        } else if(user.relStatus == 1) {
            friendBtnText = <i className="fa fa-check"></i>;
        } else if(user.relStatus == 2) {
            friendBtnText = 'Pending'
        } else {
            friendBtnText = 'Approve/Deny'
        }
        return (
            <div className="p-2 d-flex justify-content-between align-items-center">
                <a href={"/publicprofile/" + user.id} className='d-flex align-items-center'>
                    <div 
                        className="searchItemDetails-userImgContainer mr-2"
                        style={{
                            backgroundImage: `url(${userImage})`
                        }}
                    >
                    </div>
                        <p className="my-0">
                            {user.first_name} {user.last_name} - ({user.common_name})
                        </p>
                </a>
                    {user.relStatus != 3 && <Button
                        className="addFriendButton"
                        onClick={() => {
                            this.props.handleFriendBtnClick(user.relStatus, user.id);
                        }}
                    >
                    {friendBtnText}
                    </Button>}
                    {user.relStatus == 3 && 
                        <FRIEND_RESPOND_BTN 
                            id={user.id} 
                            handleFriendBtnClick={this.props.handleFriendBtnClick}
                        />
                    }
                
                
                {this.state.caret === 'up' && <USER_ITEM_SEARCH_DETAILS UserDetails={user}/>}
            </div>
        )
    }

}

export default SEARCH_RESULTS_ITEM_WIDGET_USERS;