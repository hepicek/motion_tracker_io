import React, {Component} from 'react';
import MOVIE_TITLE from './movie_title';
import {decodeString} from '../../../helpers/helper';
import {Row} from 'reactstrap';

class NEWS_ITEM extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {item, background, daysAgo} = this.props;
        return (
            <Row 
                className="newsFeed-item bg-light my-2 p-2 d-flex align-items-center mx-0"
                style={{fontSize: ".7rem"}}    
            >
                    <div 
                        className="newsFeed-item_userImage mr-2" 
                        style={{
                            backgroundImage: `url(${background})`
                        }}
                    />
                    <p 
                        className="p-0 my-0 mr-1"
                        style={{fontWeight: "normal"}}
                    >
                        <a 
                            href={"/publicprofile/" + item.user_id} className="newsFeedUserName mr-1">
                            <strong>{decodeString(item.user_name)}</strong>
                        </a> 
                            added
                    </p>
                    <MOVIE_TITLE movie_title={item.movie_title} imdb_id={item.movie_id} />
                    <p 
                        className="p-0 m-0"
                        style={{fontWeight: "normal"}}
                    >
                        to <strong>{decodeString(item.list_title)}</strong> - {daysAgo} 
                    </p>
            </Row>
        )
    }
}

export default NEWS_ITEM;