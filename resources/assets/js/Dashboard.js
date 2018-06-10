import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import jsonp from 'jsonp';
import { TMDB_KEY } from '../../../config/js/config';
import SEARCH_BAR from './components/Search_Bar';
import TOP_MOVIES_WIDGET from './components/landing_page/Top_Movies_Widget';
import LISTS_WIDGET from './components/landing_page/Lists_Widget';
import FRIENDS_WIDGET from './components/landing_page/Friends_Widget';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topMovies: [],
            userLists: [
                {
                    title: 'We love French action movies',
                    items: [{
                        image: '',
                        title: 'Fifth Element',
                        director: 'Luc Besson',
                        year: 2012,
                    },
                    {
                        image: '',
                        title: 'Fifth Element',
                        director: 'Luc Besson',
                        year: 2012,

                    },
                    {
                        image: '',
                        title: 'Fifth Element',
                        director: 'Luc Besson',
                        year: 2012,

                    },
                    {
                        image: '',
                        title: 'Fifth Element',
                        director: 'Luc Besson',
                        year: 2012,

                    },  
                    {
                        image: '',
                        title: 'Fifth Element',
                        director: 'Luc Besson',
                        year: 2012,

                    },
                    ],
                    collapsed: false
                },
                {
                    title: 'Date Movies',
                    items: [{

                        },
                    ],
                    collapsed: true
                },
                {
                    title: 'For Jen',
                    items: [{

                        },
                    ],
                    collapsed: true
                },
                {
                    title: 'Awesome Sci-fi',
                    items: [{

                        },
                    ],
                    collapsed: true
                },
                {
                    title: 'I love Patrick Stewart',
                    items: [{

                        },
                    ],
                    collapsed: true
                }
            ],
            friends: []
        }
       
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
    }
    render() {
        return (
            <div className="container">
                <div className='dashboard'>
                    <div className='searchSection'>
                        <SEARCH_BAR />
                        <TOP_MOVIES_WIDGET topMovies={this.state.topMovies}/>
                    </div>
                    <LISTS_WIDGET lists={this.state.userLists}/>
                    <FRIENDS_WIDGET />
                </div>
            </div>
        );
    }
}

if (document.getElementById('dashboard')) {
    ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
}
