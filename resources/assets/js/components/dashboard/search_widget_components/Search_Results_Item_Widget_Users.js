import React, {Component} from 'react';
import USER_ITEM_SEARCH_DETAILS from './User_Item_Search_Detail';
import FRIEND_RESPOND_BTN from './Friend_Respond_Btn';
import { AWS_URL } from '../../../../../../config/js/config';

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
            <div>
                <a href={"/publicprofile/" + user.id} className='searchResultsItem'>
                <div 
                    className="searchItemDetails-userImgContainer"
                    style={{
                        backgroundImage: `url(${userImage})`
                    }}
                >
                </div>
                    <p>{user.first_name} {user.last_name} - ({user.common_name})</p>
                    {user.relStatus != 3 && <div 
                        className="addFriendButton"
                        onClick={() => {
                            this.props.handleFriendBtnClick(user.relStatus, user.id);
                        }}
                    >
                    {friendBtnText}
                    </div>}
                    {user.relStatus == 3 && 
                        <FRIEND_RESPOND_BTN 
                            id={user.id} 
                            handleFriendBtnClick={this.props.handleFriendBtnClick}
                        />
                    }
                </a>
                
                {this.state.caret === 'up' && <USER_ITEM_SEARCH_DETAILS UserDetails={user}/>}
            </div>
        )
    }

}

export default SEARCH_RESULTS_ITEM_WIDGET_USERS;