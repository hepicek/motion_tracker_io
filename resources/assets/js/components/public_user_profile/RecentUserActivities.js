import React from 'react';
import UserActivity from "./UserActivity";
import {Col} from 'reactstrap';

// let recentActivities;

const RecentUserActivities = (props) => {

    let recentActivities = !props.recentActivity ? <p className="p-3">No recent activity from this user</p> : props.recentActivity.reverse().map((activity, index) => {
        return (
            <UserActivity key={'act-' + index} activity={activity}/>
        )
    });
    return (
        <Col 
            md="12" lg="4"
        >
            {props.recentActivity && <h4>Recent Activity</h4>}
            <div className="recentUserActivities-activitiesList">

                {recentActivities}
                
            </div>
        </Col>
    )
};

export default RecentUserActivities;