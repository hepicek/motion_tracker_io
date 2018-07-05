import React, {Component} from 'react';
import NEWS_ITEM from './news_feed_widget_components/news_item';
// import MOVIE_TITLE from './news_feed_widget_components/movie_title';
// import {decodeString} from '../../helpers/helper';
import { AWS_URL } from '../../../../../config/js/config';
import Spinner from "../../helpers/Spinner";

class NEWS_FEED extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            loading: true,
        }
    }

    componentDidMount() {
        axios('/relationships/news')
        .then(res => {
            this.setState({
                news: res.data,
                loading: false,
            });
        })
            .catch(error => {
                console.log('error', error);
                this.setState({
                    error: error,
                    loading: false,
                })
        });
    }
    render() {
        let oneDay = 24*60*60*1000; 
        const {loading} = this.state;
        let news = this.state.news.map(item => {
            let background = AWS_URL + item.user_img;
            let daysAgo = (new Date() - new Date(item.date.date)) / oneDay;
            daysAgo = daysAgo < 1 ? 'Today' : Math.floor(daysAgo) + ' day(s) ago';
            return (
                <NEWS_ITEM 
                    key={"NewsItem" + item.user_id + "-" + item.movie_title}
                    daysAgo={daysAgo}
                    background={background}
                    item={item}
                />
            )
        });
        return (
            <div className="newsFeed">
                <div className="newsFeed-header"><h5>News Feed</h5></div>
                <div className="newsFeed-feed">
                    {loading && loading}
                    {loading && <Spinner />}
                    {news && news}
                </div>
            </div>
        )
    }
}

export default NEWS_FEED;