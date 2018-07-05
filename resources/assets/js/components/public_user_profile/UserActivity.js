import React from 'react';
import {decodeString} from "../../helpers/helper";

const UserActivity = (props) => {
    const activity = props.activity;
    let daysAgo = (new Date() - new Date(activity.date.date)) / (24*60*60*1000);

    daysAgo = daysAgo < 1 ? 'Today' : Math.floor(daysAgo) + ' day(s) ago';
    return (
        <div className="my-2 UserRecentActivity">
            <p><strong>{decodeString(activity.user_name)}</strong> added <strong>{decodeString(activity.movie_title)}</strong> to <strong>{decodeString(activity.list_title)}</strong></p>
            <p className="UserRecentActivity-daysAgo">{daysAgo}</p>
        </div>
    );
};

export default UserActivity;
