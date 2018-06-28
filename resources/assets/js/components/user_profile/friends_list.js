import React, { Component } from 'react';
import FRIEND from './friend';

class FREINDS_LIST extends Component {
    constructor(props) {
        super(props)
        this.state = {
            friends: []
        };
        this.getFriends = this.getFriends.bind(this);
    };
    getFriends() {
        axios('/relationships')
        .then(res => {
            this.setState({
                friends: res.data
            });
        });
    }
    componentWillMount() {
        this.getFriends();
    };
    
    render() {
         let friends = this.state.friends.map((friend, ind) => {
            let user_image = 'storage/' + friend.img_url;
            return (
                <FRIEND 
                    key={"pending-" + ind}
                    friend={friend}
                    user_image={user_image}
                    getFriends={this.getFriends}
                />
            );
        });
        return (
            <div className="userProfile-friendsList">
            <h4>Friends:</h4>
              {friends}  
            </div>
        );

    };
};  
export default FREINDS_LIST;