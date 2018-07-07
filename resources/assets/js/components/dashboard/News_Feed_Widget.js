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
            newsFeedOffset: 0,
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
        let news = this.state.news.slice(this.state.newsFeedOffset, 5 + this.state.newsFeedOffset).map(item => {
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
            <div className="newsFeed w-100 bg-white p-2 mb-3 d-flex flex-column align-items-center">
                <div className="newsFeed-header"><h5>News Feed</h5></div>
                <div className="newsFeed-feed w-100 mx-0">
                    {loading && loading}
                    {loading && <Spinner />}
                    {news && news}
                </div>
                <div className="w-25 d-flex justify-content-between">
                    {(this.state.news.length > 5) &&
                        <i 
                            className="fa fa-angle-left" 
                            style={{
                                fontSize: "1.5rem", 
                                cursor: !!this.state.newsFeedOffset && "pointer",
                                color: !!this.state.newsFeedOffset ? "#212529" :"#f0f0f0"
                            }} 
                            onClick={() => {

                                !!this.state.newsFeedOffset && this.setState(prevState =>({newsFeedOffset: prevState.newsFeedOffset - 5}))}
                            }
                            
                        ></i>}
                    {(this.state.news.length > 5) &&
                        <i 
                            className="fa fa-angle-right" 
                            style={{
                                fontSize: "1.5rem",
                                cursor: this.state.newsFeedOffset + 5 < this.state.news.length && "pointer",
                                color: this.state.newsFeedOffset + 5 < this.state.news.length ? "#212529" :"#f0f0f0"
                            }} 
                            onClick={() => {
                                this.state.newsFeedOffset + 5 < this.state.news.length && this.setState(prevState =>({newsFeedOffset: prevState.newsFeedOffset + 5}))}
                            }
                        ></i>
                    }
                </div>
            </div>
        )
    }
}

export default NEWS_FEED;