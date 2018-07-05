import React, {Component} from 'react';
import MOVIE_TITLE from './movie_title';
import {decodeString} from '../../../helpers/helper';
// import { AWS_URL } from '../../../../../config/js/config';

class NEWS_ITEM extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {item, background, daysAgo} = this.props;
        return (
            <div className="newsFeed-item">
                    <div 
                        className="newsFeed-item_userImage" 
                        style={{
                            backgroundImage: `url(${background})`
                        }}
                    />
                    <p>
                        <a 
                            href={"/publicprofile/" + item.user_id} className="newsFeedUserName">
                            <strong>{decodeString(item.user_name)}</strong>
                        </a> 
                            added
                    </p>
                    <MOVIE_TITLE movie_title={item.movie_title} imdb_id={item.movie_id} />
                    <p>to <strong>{decodeString(item.list_title)}</strong> - {daysAgo} </p>
                </div>
        )
    }
}

export default NEWS_ITEM;