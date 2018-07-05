import React from 'react';
import UserActivity from "./UserActivity";
import {Col} from 'reactstrap';

const RecentUserActivities = (props) => {

    let recentActivities = props.recentActivity;

    return (
        <Col 
            md="12" lg="4"
        >
            <h4>Recent Activity</h4>
            <div className="recentUserActivities-activitiesList">
                {recentActivities.reverse().map((activity, index) => {
                    return (
                        <UserActivity key={'act-' + index} activity={activity}/>
                    )
                })}
            </div>
        </Col>
    )
};

export default RecentUserActivities;