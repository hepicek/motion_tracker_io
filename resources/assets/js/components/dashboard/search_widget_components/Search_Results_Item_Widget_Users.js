import React, {Component} from 'react';
import USER_ITEM_SEARCH_DETAILS from './User_Item_Search_Detail';


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
        let userImage = 'storage/' + user.img_url;
        return (
            <div>
                <div className='searchResultsItem'>
                <div 
                    className="searchItemDetails-actorImgContainer"
                    style={{
                        backgroundImage: `url(${userImage})`
                    }}
                >
                </div>
                    <p>{user.first_name} {user.last_name} - ({user.common_name})</p>
                    <div 
                    className="addFriendButton"
                    
                    >
                    Add Friend
                    </div>
                </div>
                
                {this.state.caret === 'up' && <USER_ITEM_SEARCH_DETAILS UserDetails={user}/>}
            </div>
        )
    }

}

export default SEARCH_RESULTS_ITEM_WIDGET_USERS;