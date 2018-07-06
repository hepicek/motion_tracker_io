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
            daysAgo = daysAgo < 1 ? <p className="my-0 mr-2">Today</p> : <p className="my-0 mr-2">{Math.floor(daysAgo)} day(s) ago</p>;
            let user_image = AWS_URL + req.img_url;
            return (
                <div key={"pending-" + ind} className="pendingRequest d-flex justify-content-between align-items-center bg-light w-100 p-2">
                    <div className="d-flex justify-content-between col-md-6 col-xs-12">
                        <div 
                            className="searchItemDetails-userImgContainer align-items-center mr-2"
                            style={{backgroundImage: `url(${user_image})`}} 
                        >
                        </div>
                        <strong className="my-auto">{req.first_name} {req.last_name} ({req.common_name})</strong>
                    </div>
                    <div className="d-flex justify-content-between align-items-center col-md-6 col-xs-12">
                    {daysAgo}
                    <FRIEND_RESPOND_BTN 
                            id={req.id} 
                            handleFriendBtnClick={this.props.handleFriendBtnClick}
                    />
                    </div>
                </div>
            )

        })
        return (
            <div className='bg-white p-2 w-100'>
                {!!requests.length && <strong>Pending Requests:</strong>}
                {!!requests.length && requests}
            </div>
        )
    }
    
}

export default FRIENDS_WIDGET;