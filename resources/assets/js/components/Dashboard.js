import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import jsonp from 'jsonp';
import { TMDB_KEY } from '../../../../config/js/config';
import TOP_MOVIES_WIDGET from './landing_page/Top_Movies_Widget';
import LISTS_WIDGET from './landing_page/Lists_Widget';
import FRIENDS_WIDGET from './landing_page/Friends_Widget';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topMovies: [],
            userLists: [],
            friends: []
        }
       
    }
    componentWillMount() {
        jsonp(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`, null, (err, data) => {
            if (err) {
                return undefined;
            } else {
                console.log(data.results);
                this.setState({
                    topMovies: data.results
                });
            }
        });
    }
    render() {
        return (
            <div className="container">
                <h2>Dashboard</h2>
                <div className='dashboard'>
                    <TOP_MOVIES_WIDGET topMovies={this.state.topMovies}/>
                    <LISTS_WIDGET />
                    <FRIENDS_WIDGET />
                </div>
            </div>
        );
    }
}

if (document.getElementById('dashboard')) {
    ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
}
