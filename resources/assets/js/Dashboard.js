import React, {Component} from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'
import {Row, Col} from 'reactstrap';

import axios from 'axios'; //For API calls

//react components
import SEARCH_BAR from './components/dashboard/Search_Bar';
// import TOP_MOVIES_WIDGET from './components/dashboard/Top_Movies_Widget';
import LISTS_WIDGET from './components/dashboard/Lists_Widget';
import FRIENDS_WIDGET from './components/dashboard/Friends_Widget';
import SEARCH_MOVIES_WIDGET from './components/dashboard/Search_Movies_Widget';
import NEWS_FEED from './components/dashboard/News_Feed_Widget'

let inputTimer;

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topMovies: [],
            userLists: [],
            friends: [],
            newList: false,
            renameList: undefined,
            searchType: 'movies',
            searchText: '',
            searchResults: {
                movies: [],
                actors: [],
                users: []
            },
            pendingRequests: []
        };
        this.handleListDeleteClick = this.handleListDeleteClick.bind(this);
        this.handleNewListBtnClick = this.handleNewListBtnClick.bind(this);
        this.saveNewList = this.saveNewList.bind(this);
        this.handleRenameListClick = this.handleRenameListClick.bind(this);
        this.handleRenameListInputChange = this.handleRenameListInputChange.bind(this);
        this.handleRenameListInputKeyUp = this.handleRenameListInputKeyUp.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDragItemDrop = this.handleDragItemDrop.bind(this);
        this.handleDeleteListItem = this.handleDeleteListItem.bind(this);
        this.handleCategoryClick = this.handleCategoryClick.bind(this);
        this.handleFriendBtnClick = this.handleFriendBtnClick.bind(this);
        this.getPendingRequests = this.getPendingRequests.bind(this);
    }

    //post the new list to the DB
    saveNewList(e) {
        if (e.key == "Enter") {
            axios.post("/userLists", {
                list_title: newListInput.value
            })
                .then(() => {
                    this.getLists();
                }).catch(err => {
                return err;
            })
        } else if(e.key == "Escape") {
            this.setState({
                newList: false
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
        })
    }
    handleFriendBtnClick(status, id) {
        axios.post('/relationships',
            {
                id,
                status
            })
            .then(() => {
                this.getPendingRequests();
                this.handleSearch({
                    target: {
                        value: this.state.searchText
                    }
                })
            })
    }
    getPendingRequests() {
        axios.get('/relationships/pending')
        .then(res => {
            this.setState({
                pendingRequests: res.data
            })
        });
    }
    handleCategoryClick(e) {
        this.setState({
            searchType: e.target.id.split("-")[1],
        })
        setTimeout(() => {
            this.handleSearch({
                target: {
                    value: this.state.searchText
                }
            })
        }, 0);
    }
    //send delete API call
    handleListDeleteClick(e) {
        axios.delete('userLists/' + e.target.parentNode.id.split("-")[1])
            .then(() => {
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
        this.setState(prevState => ({
            newList: !prevState.newList
        }));
    }

    //search db for movie
    handleSearch(e) {
        let searchText = e.target.value;
        this.setState({searchText});

        clearTimeout(inputTimer);

        inputTimer = setTimeout(() => {
            if(this.state.searchText.length > 1) {
                axios.get(`/search/${this.state.searchText}`)
                    .then((res) => {
                        let searchString = res.data[0];
                        let body = res.data[1];
                        let searchResults = Object.keys(body).map(key => body[key]);
                        if (searchString == this.state.searchText) {
                            this.setState({
                                searchResults: {
                                    movies: searchResults,
                                    actors: this.state.searchResults.actors,
                                    users: this.state.searchResults.users
                                }
                            });
                        }

                    });
                    axios.get(`/searchActors/${this.state.searchText}`)
                    .then((res) => {
                        let searchString = res.data[0];
                        let body = res.data[1];
                        let searchResults = Object.keys(body).map(key => body[key]);
                        if (searchString == this.state.searchText) {
                            this.setState({
                                searchResults: {
                                    movies: this.state.searchResults.movies,
                                    actors: searchResults,
                                    users: this.state.searchResults.users
                                }
                            });
                        }

                    });
                    axios.get(`/searchUsers/${this.state.searchText}`)
                    .then((res) => {
                        let searchString = res.data[0];
                        let body = res.data[1];
                        let searchResults = Object.keys(body).map(key => body[key]);
                        if (searchString == this.state.searchText) {
                            this.setState({
                                searchResults: {
                                    movies: this.state.searchResults.movies,
                                    actors: this.state.searchResults.actors,
                                    users: searchResults
                                }
                            });
                        }

                    });
                   
            } else {
                this.setState({
                    searchResults: {
                        movies: [],
                        actors: [],
                        users: []
                    },
                    searchType: 'movies'
                });
            }
            
        }, 500);
    }

    handleDragItemDrop(movie_id, list_id) {
        axios.get(`/userListsDnD/${list_id}/${movie_id}`)
            .then((res) => {
                this.getLists();
            });
    }

    handleDeleteListItem(e) {
        let listItemId = e.target.parentNode.id.split("-")[1];
        axios.delete("userListItem/" + listItemId)
            .then(() => this.getLists());
    }
    componentDidMount() {
        this.getLists();
    }
    render() {
        return (
            <Row className='dashboard mx-0'>
                <Row className='searchSection w-100 mx-0'>
                    <SEARCH_BAR
                        handleSearch={this.handleSearch}
                        searchText={this.state.searchText}
                    />
                </Row>
                <Row className="w-100 mx-0 d-flex justify-content-between">
                    <Col md="8" lg="8" className="px-0">
                        <Row className="mx-0">
                            {/*this.state.searchResults.movies.length === 0 && <TOP_MOVIES_WIDGET topMovies={this.state.topMovies}/>*/}
                            {(this.state.searchResults.movies.length === 0 && this.state.searchResults.actors.length === 0 && this.state.searchResults.users.length === 0) && <NEWS_FEED topMovies={this.state.topMovies}/>}
                            {(this.state.searchResults.movies.length > 0 || this.state.searchResults.actors.length > 0 || this.state.searchResults.users.length > 0) &&
                                <SEARCH_MOVIES_WIDGET
                                    lists={this.state.userLists} 
                                    searchType={this.state.searchType}
                                    searchResults={this.state.searchResults}
                                    handleCategoryClick={this.handleCategoryClick}
                                    handleFriendBtnClick={this.handleFriendBtnClick}
                                />
                            }
                        </Row>
                        <Row className="mx-0 p-0">
                            <FRIENDS_WIDGET
                                handleFriendBtnClick={this.handleFriendBtnClick}    
                                getPendingRequests={this.getPendingRequests}
                                pendingRequests={this.state.pendingRequests}
                            />
                        </Row>
                    </Col>
                    <Col md="4" lg="4" className="px-0">
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
                            handleDeleteListItem={this.handleDeleteListItem}
                        />
                    </Col>
                </Row>
            </Row>
        );
    }
}

// export default Dashboard;
export default DragDropContext(HTML5Backend)(Dashboard);
