import React from 'react';
import {decodeString} from "../../helpers/helper";

const UserActivity = (props) => {
    const activity = props.activity;
    let daysAgo = (new Date() - new Date(activity.date.date)) / (24*60*60*1000);

    daysAgo = daysAgo < 1 ? 'Today' : Math.floor(daysAgo) + ' day(s) ago';
    return (
        <div>
            <p>{decodeString(activity.user_name)} added <strong>{decodeString(activity.movie_title)}</strong> to <strong>{decodeString(activity.list_title)}</strong> - {daysAgo} </p>
        </div>
    );
};

export default UserActivity;
