import React, {Component} from 'react';
import {decodeString} from '../../helpers/helper';

class NEWS_FEED extends Component {
    constructor(props) {
        super(props)
        this.state = {
            news: []
        }
    }

    componentDidMount() {
        axios('/relationships/news')
        .then(res => {
            this.setState({
                news: res.data
            })
        });
    }
    render() {
        let oneDay = 24*60*60*1000; 
        let news = this.state.news.map(item => {
            let background = 'storage/' + item.user_img;
            let daysAgo = (new Date() - new Date(item.date)) / oneDay;
            daysAgo = daysAgo < 1 ? 'Today' : Math.floor(daysAgo) + ' day(s) ago';
            return (
                <div 
                    key={"NewsItem" + Math.floor(Math.random() * 100)} className="newsFeed-item"
                >
                    <div className="newsFeed-item_userImage" style={{backgroundImage: `url(${background})`}}></div>
                    <p>{decodeString(item.user_name)} added <strong>{decodeString(item.movie_title)}</strong> to <strong>{decodeString(item.list_title)}</strong> - {daysAgo} </p>
                </div>
            )
        })
        return (
            <div className="newsFeed">
                <div className="newsFeed-header"><h5>News Feed</h5></div>
                <div className="newsFeed-feed">
                    {news}
                </div>
            </div>
        )
    }
}

export default NEWS_FEED;