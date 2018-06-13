import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import jsonp from 'jsonp'; //used for API call to grab top movies
import { TMDB_KEY } from '../../../config/js/config'; //file holding TMDB key (in .gitignore)
import axios from 'axios'; //For API calls

//react components
import SEARCH_BAR from './components/dashboard/Search_Bar';
import TOP_MOVIES_WIDGET from './components/dashboard/Top_Movies_Widget';
import LISTS_WIDGET from './components/dashboard/Lists_Widget';
import FRIENDS_WIDGET from './components/dashboard/Friends_Widget';


export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topMovies: [],
            userLists: [],
            friends: []
        }
        this.handleListTitleClick = this.handleListTitleClick.bind(this);    
        this.handleListDeleteClick = this.handleListDeleteClick.bind(this); 
        this.handleNewListBtnClick = this.handleNewListBtnClick.bind(this);  
    }

    saveNewList(e, newList) {
        console.log(e.key);
        e.stopPropagation();
        const newListInput = document.getElementById("newListInput");
        // console.log(newListInput);
        if(e.key == "Enter") {
            window.removeEventListener("keyup", (e) => {this.saveNewList(e, newList)});

            console.log("Enter")
            axios.post("/userLists", {
                list_title: newListInput.value
            })
            .then(res => {
                console.log(res);
                delete this.state.newList;
                window.removeEventListener("keyup", (e) => {this.saveNewList(e, newList)});
                this.getLists();
            }).catch(err => {
                console.log(err);
                return err;
            })
        }        
    }
    
    //Gets User's Lists
    getLists() {
        axios('/userLists')
        .then(response => {
          if(response.data.response) {
                let userLists = Object.keys(response.data.response).map(key => response.data.response[key]);
                this.setState({
                    userLists
                });
            }            
        }).catch(err => {
            console.log(err);
        });
    }

    //collapses lists when title is clicked    
    handleListTitleClick(e) {
        e.stopPropagation(); //stops event bubbling
        let currentListId = e.target.id.split("-")[1]; //Element id's end in -{list_id}
        let userLists = this.state.userLists;

        //finds the clicked list in the array, toggles the 'collapsed' value and sets state 
        userLists.forEach(list => {
            if(list.id == currentListId) {
                list.collapsed = list.collapsed === 0 ? 1 : 0;
                    this.setState({
                        userLists
                    });
                axios.put('userLists/' + currentListId,{
                    collapsed: list.collapsed
                }).then(result => {
                    
                })
                .catch(err => {
                    console.log(err);
                })
            }
        });
    }

    //send delete API call
    handleListDeleteClick(e) {
        axios.delete('userLists/' + e.target.id.split("-")[1])
        .then(response => {
            this.getLists();  
            console.log(response); 
        })
        
    }

    //create a new list
    handleNewListBtnClick() {
        let newList = {
            collapsed: 1,
            items: [],
            list_title: ""
        }  
        this.setState({
            newList
        });
        //setTimeout used because setState is async so this puts the
        //code on the event queue behind the render function 
        setTimeout(() => {
            let newListInput = document.querySelector(".newListInput");
            newListInput.focus();
            window.removeEventListener("keyup", (e) => {this.saveNewList(e, newList)});
            window.addEventListener("keyup", (e) => {this.saveNewList(e, newList)});
        }, 0);
    }

    componentWillMount() {
        //external API call for Top 20 movies
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
                        newList={this.state.newList ? this.state.newList : null}
                        handleListTitleClick={this.handleListTitleClick} 
                        handleListDeleteClick={this.handleListDeleteClick}
                        handleNewListBtnClick={this.handleNewListBtnClick} 
                    />
                    <FRIENDS_WIDGET />
            </div>
        );
    }
}

if (document.getElementById('dashboard')) {
    ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
}
