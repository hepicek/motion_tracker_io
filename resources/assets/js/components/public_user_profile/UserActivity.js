import React from 'react';
import {decodeString} from "../../helpers/helper";
import MOVIE_TITLE from '../dashboard/news_feed_widget_components/movie_title';

const UserActivity = (props) => {
    let news_item;
    const activity = props.activity;
    let daysAgo = (new Date() - new Date(activity.date.date)) / (24*60*60*1000);

    daysAgo = daysAgo < 1 ? 'Today' : Math.floor(daysAgo) + ' day(s) ago';
    if(activity.news_type == 0) {
        news_item = (
            <div className="my-2 UserRecentActivity">
                <div className="d-flex flex-wrap py-1">
                    <p><strong>{decodeString(activity.user_name)}</strong> added </p><MOVIE_TITLE movie_title={activity.movie_title} imdb_id={activity.movie_id} left="-150px"/><p className="flex-shrink-1"> to <strong>{decodeString(activity.list_title)}</strong></p>
                </div>
                <p className="UserRecentActivity-daysAgo">{daysAgo}</p>
            </div>
        )
    } else if(activity.news_type == 1) {
        news_item = (
            <div className="my-2 UserRecentActivity">
                <div className="d-flex flex-wrap py-1">
                    <p><strong>{decodeString(activity.user_name)}</strong> gave </p>
                        <MOVIE_TITLE movie_title={activity.movie_title} imdb_id={activity.movie_id} left="-150px"/>
                        <p className="flex-shrink-1"> a <strong>{decodeString(activity.rating)} <i className="fa fa-star text-warning"></i></strong> rating
                    </p>
                </div>
                <p className="UserRecentActivity-daysAgo">{daysAgo}</p>
            </div>
        )
    }
    return (
        <div>
            {news_item}
        </div>
    );
};

export default UserActivity;

// <strong>{decodeString(activity.movie_title)}</strong>