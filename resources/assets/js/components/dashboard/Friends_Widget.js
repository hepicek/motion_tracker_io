import React, { Component } from 'react';
import FRIEND_RESPOND_BTN from './search_widget_components/Friend_Respond_Btn';
import { AWS_URL } from '../../../../../config/js/config';

class FRIENDS_WIDGET extends Component {
    constructor(props) {
        super(props)
        
    }
    componentWillMount() {
        this.props.getPendingRequests();
    }

    render() {
        let oneDay = 24*60*60*1000; 
        
        let requests = this.props.pendingRequests.map((req, ind) => {
            let daysAgo = (new Date() -new Date(req.action_date)) / oneDay;
            daysAgo = daysAgo < 1 ? <p>Today</p> : <p>{Math.floor(daysAgo)} day(s) ago</p>;
            let user_image = AWS_URL + req.img_url;
            return (
                <div key={"pending-" + ind} className="friendsWidget-pendingRequests">
                    <div 
                        className="friendsWidget-imgContainer"
                        style={{backgroundImage: `url(${user_image})`}}
                    >
                    </div>
                    <strong>{req.first_name} {req.last_name} ({req.common_name})</strong>
                    {daysAgo}
                    <FRIEND_RESPOND_BTN 
                            id={req.id} 
                            handleFriendBtnClick={this.props.handleFriendBtnClick}
                    />
                </div>
            )

        })
        return (
            <div className='dashboardWidget'>
                {!!requests.length && <strong>Pending Requests:</strong>}
                {!!requests.length && requests}
            </div>
        )
    }
    
}

export default FRIENDS_WIDGET;