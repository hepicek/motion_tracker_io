import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import jsonp from 'jsonp';
import { TMDB_KEY } from '../../../config/js/config';
import SEARCH_BAR from './components/Search_Bar';
import TOP_MOVIES_WIDGET from './components/landing_page/Top_Movies_Widget';
import LISTS_WIDGET from './components/landing_page/Lists_Widget';
import FRIENDS_WIDGET from './components/landing_page/Friends_Widget';
import axios from 'axios';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reRender: false,
            topMovies: [],
            userLists: [],
            friends: []
        }
        this.handleListTitleClick = this.handleListTitleClick.bind(this);    
        this.handleListDeleteClick = this.handleListDeleteClick.bind(this);   
    }
    getLists() {
        axios('/userLists')
        .then(response => {
          if(response.data.response) {
                let userLists = Object.keys(response.data.response).map(function(k) { return response.data.response[k] });
                // userLists.forEach(list => {
                //     list.collapsed = true;
                // })
                // userLists[0].collapsed = false;
                this.setState({
                    userLists
                })
                // console.log(userLists);
            }
            
        }).catch(err => {
            console.log(err);
        });
    }
    handleListTitleClick(e) {
        e.stopPropagation();
        let currentListId = e.target.id.split("-")[1];
                let userLists = this.state.userLists;
        userLists.forEach(list => {
            if(list.id == currentListId) {
                list.collapsed = list.collapsed === 0 ? 1 : 0;
                axios.put('userLists/' + currentListId,{
                    collapsed: list.collapsed
                }).then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                })
            }
        })

        this.setState({
            userLists
        })
    }
    handleListDeleteClick(e) {
        axios.delete('userLists/' + e.target.id.split("-")[1])
        .then(response => {
            this.getLists();  
            console.log(response); 
        })
        
    }
    componentWillMount() {
        jsonp(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`, null, (err, data) => {
            if (err) {
                return undefined;
            } else {
                this.setState({
                    topMovies: data.results
                });
            }
        });
        this.getLists();
    }
    render() {
        return (
           
                <div className='dashboard'>
                    <div className='searchSection'>
                        <SEARCH_BAR />
                        <TOP_MOVIES_WIDGET topMovies={this.state.topMovies}/>
                    </div>
                    <LISTS_WIDGET 
                        lists={this.state.userLists}
                        handleListTitleClick={this.handleListTitleClick} 
                        handleListDeleteClick={this.handleListDeleteClick}   
                    />
                    <FRIENDS_WIDGET />
            </div>
        );
    }
}

if (document.getElementById('dashboard')) {
    ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
}
