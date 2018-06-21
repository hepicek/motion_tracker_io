import React, {Component} from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import jsonp from 'jsonp'; //used for API call to grab top movies
import {TMDB_KEY} from '../../../config/js/config'; //file holding TMDB key (in .gitignore)
import axios from 'axios'; //For API calls

//react components
import SEARCH_BAR from './components/dashboard/Search_Bar';
import TOP_MOVIES_WIDGET from './components/dashboard/Top_Movies_Widget';
import LISTS_WIDGET from './components/dashboard/Lists_Widget';
import FRIENDS_WIDGET from './components/dashboard/Friends_Widget';
import SEARCH_MOVIES_WIDGET from './components/dashboard/Search_Movies_Widget';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topMovies: [],
            userLists: [],
            friends: [],
            newList: false,
            renameList: undefined,
            searchText: '',
            searchResults: [],
        };
        this.handleListDeleteClick = this.handleListDeleteClick.bind(this);
        this.handleNewListBtnClick = this.handleNewListBtnClick.bind(this);
        this.saveNewList = this.saveNewList.bind(this);
        this.handleRenameListClick = this.handleRenameListClick.bind(this);
        this.handleRenameListInputChange = this.handleRenameListInputChange.bind(this);
        this.handleRenameListInputKeyUp = this.handleRenameListInputKeyUp.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDragItemDrop = this.handleDragItemDrop.bind(this);
    }

    //post the new list to the DB
    saveNewList(e) {
        if (e.key == "Enter") {
            axios.post("/userLists", {
                list_title: newListInput.value
            })
                .then(res => {
                    this.getLists();
                }).catch(err => {
                return err;
            })
        }
    }

    //Gets User's Lists
    getLists() {
        axios('/userLists')
            .then(response => {
                if (response.data.response) {
                    let userLists = Object.keys(response.data.response).map(key => response.data.response[key]);
                    this.setState({
                        userLists,
                        newList: false,
                        renameList: undefined
                    });
                }
            }).catch(err => {
            console.log(err);
        });
    }

    //send delete API call
    handleListDeleteClick(e) {
        axios.delete('userLists/' + e.target.parentNode.id.split("-")[1])
            .then(response => {
                this.getLists();
            });
    }

    handleRenameListClick(e) {
        
        let targetId = parseInt(e.target.parentNode.id.split("-")[1]);
        let renameList = this.state.userLists.filter(list => list.id == targetId)[0].list_title;
        this.setState({
            renameList: parseInt(e.target.parentNode.id.split("-")[1]),
            renameListInputValue: renameList
        })
    }

    handleRenameListInputChange(e) {
        let renameListInputValue = e.target.value;
        this.setState({
            renameListInputValue
        });
    }

    handleRenameListInputKeyUp(e) {
        if (e.keyCode == 13) {
            axios.put(`/userLists/${this.state.renameList}`,
                {
                    list_title: this.state.renameListInputValue
                })
                .then(() => {
                    this.getLists();
                })
        } else if (e.keyCode == 27) {
            this.setState({renameList: undefined})
        }
    }

    //create a new list
    handleNewListBtnClick() {
        this.setState({
            newList: true
        });
    }

    //search db for movie
    handleSearch(e) {
        let searchText = e.target.value;
        this.setState({searchText});
        setTimeout(() => {
            if (this.state.searchText.length > 1) {
                axios.get(`/search/${this.state.searchText}`)
                    .then((res) => {
                        let searchString = res.data[0];
                        let body = res.data[1];
                        let searchResults = Object.keys(body).map(key => body[key]);
                        if(searchString == this.state.searchText) {
                            this.setState({searchResults}); 
                        }
                                               
                    });
            } else {
                this.setState({
                    searchResults: []
                });
            }
        }, 0);
    }
    handleDragItemDrop(movie_id, list_id) {
        console.log("handled!", movie_id, list_id);

        axios.get(`/userListsDnD/${list_id}/${movie_id}`)
            .then((res) => {
                console.log(res);
                this.getLists();
/*                let searchString = res.data[0];
                let body = res.data[1];
                let searchResults = Object.keys(body).map(key => body[key]);
                if(searchString == this.state.searchText) {
                    this.setState({searchResults});
                }*/

            });
    }
    componentWillMount() {
        // external API call for Top 20 movies
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
                    <SEARCH_BAR
                        handleSearch={this.handleSearch}
                        searchText={this.state.searchText}
                    />
                    {this.state.searchResults.length === 0 && <TOP_MOVIES_WIDGET topMovies={this.state.topMovies}/> }
                    {this.state.searchResults.length > 0 && <SEARCH_MOVIES_WIDGET searchResults={this.state.searchResults}/>}

                </div>
                <LISTS_WIDGET
                    lists={this.state.userLists}
                    renameList={this.state.renameList}
                    newList={this.state.newList ? this.state.newList : null}
                    handleListDeleteClick={this.handleListDeleteClick}
                    handleNewListBtnClick={this.handleNewListBtnClick}
                    handleRenameListClick={this.handleRenameListClick}
                    saveNewList={this.saveNewList}
                    handleRenameListInputChange={this.handleRenameListInputChange}
                    handleRenameListInputKeyUp={this.handleRenameListInputKeyUp}
                    renameListInputValue={this.state.renameListInputValue ? this.state.renameListInputValue : ""}
                    handleDragItemDrop={this.handleDragItemDrop}
                />
                <FRIENDS_WIDGET/>
            </div>
        );
    }
}

// export default Dashboard;
export default DragDropContext(HTML5Backend)(Dashboard);
