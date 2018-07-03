import React from 'react';
import UserActivity from "./UserActivity";

const RecentUserActivities = (props) => {

    let recentActivities = props.recentActivity;

    return (
        <div className="recentUserActivities">
            <h4>Recent Activity</h4>
            <div className="recentUserActivities-activitiesList">
                {recentActivities.reverse().map((activity, index) => {
                    return (
                        <UserActivity key={'act-' + index} activity={activity}/>
                    )
                })}
            </div>
        </div>
    )
};

export default RecentUserActivities;