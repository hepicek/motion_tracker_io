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
            topMovies: [],
            userLists: [
                {
                    id: 1,
                    title: 'We love French action movies',
                    items: [{
                        id: 1,
                        image: '',
                        title: 'Fifth Element',
                        director: 'Luc Besson',
                        year: 2012,
                    },
                    {
                        id: 2,
                        image: '',
                        title: 'Fifth Element',
                        director: 'Luc Besson',
                        year: 2012,

                    },
                    {
                        id: 3,
                        image: '',
                        title: 'Fifth Element',
                        director: 'Luc Besson',
                        year: 2012,

                    },
                    {
                        id: 4,
                        image: '',
                        title: 'Fifth Element',
                        director: 'Luc Besson',
                        year: 2012,

                    },  
                    {
                        id: 5,
                        image: '',
                        title: 'Fifth Element',
                        director: 'Luc Besson',
                        year: 2012,

                    },
                    ],
                    collapsed: false
                },
                {
                    id: 2,
                    title: 'Date Movies',
                    items: [{

                        },
                    ],
                    collapsed: true
                },
                {
                    id: 3,
                    title: 'For Jen',
                    items: [{

                        },
                    ],
                    collapsed: true
                },
                {
                    id: 4,
                    title: 'Awesome Sci-fi',
                    items: [{

                        },
                    ],
                    collapsed: true
                },
                {
                    id: 5,
                    title: 'I love Patrick Stewart',
                    items: [{

                        },
                    ],
                    collapsed: true
                }
            ],
            friends: []
        }
        this.handleListTitleClick = this.handleListTitleClick.bind(this);       
    }

    handleListTitleClick(e) {
        e.stopPropagation();
        let currentListId = e.target.id;

        let userLists = this.state.userLists;
        userLists.forEach(list => {
            
            if(list.id == currentListId) {
                list.collapsed = list.collapsed ? false : true;
            }
        })

        this.setState({
            userLists
        })
    }
    componentWillMount() {
        jsonp(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`, null, (err, data) => {
            if (err) {
                return undefined;
            } else {
                // console.log(data.results);
                this.setState({
                    topMovies: data.results
                });
            }
        });
        axios('/userLists')
        .then(response => {
            console.log(response)
        })
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
                    />
                    <FRIENDS_WIDGET />
                
            </div>
        );
    }
}

if (document.getElementById('dashboard')) {
    ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
}
