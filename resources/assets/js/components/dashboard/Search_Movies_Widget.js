import React from 'react';
import SEARCH_CATEGORIES from './search_widget_components/Search_Categories';
import SEARCH_RESULTS_ITEM_WIDGET_MOVIES from './search_widget_components/Search_Results_Item_Widget_Movies';
import SEARCH_RESULTS_ITEM_WIDGET_ACTORS from './search_widget_components/Search_Results_Item_Widget_Actors';
import SEARCH_RESULTS_ITEM_WIDGET_USERS from './search_widget_components/Search_Results_Item_Widget_Users';


const SEARCH_MOVIES_WIDGET = (props) => {
    let results;
    if(props.searchType == 'movies') {
        results = props.searchResults.movies;
    } else if(props.searchType == 'actors') {
        results = props.searchResults.actors;
    } else {
        results = props.searchResults.users;
    }
    let searchResults = results.map((result, id) => (
        <div
            key={'search-' + id}
        >
            {props.searchType == 'movies' && <SEARCH_RESULTS_ITEM_WIDGET_MOVIES searchResultsItem={result}/> } 
            {props.searchType == "actors" && <SEARCH_RESULTS_ITEM_WIDGET_ACTORS searchResultsItem={result} />}
            {props.searchType == "users" && <SEARCH_RESULTS_ITEM_WIDGET_USERS searchResultsItem={result} />}
        </div>
    ));
    let bgColor;
    if(props.searchType == 'movies') {
        bgColor = '#68878b';
    } else if(props.searchType == 'actors') {
        bgColor = '#b8b069';
    } else {
        bgColor = '#c29d84';
    }
    return (
        <div className="searchMoviesContainer">
            <SEARCH_CATEGORIES 
                handleCategoryClick={props.handleCategoryClick}
                searchType={props.searchType}
            />
            <div className="searchResultsContainer" style={{backgroundColor: bgColor}}>
            {searchResults}
            </div>
        </div>
    )
};


export default SEARCH_MOVIES_WIDGET;