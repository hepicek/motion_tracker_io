import React from 'react';
import SEARCH_RESULTS_ITEM_WIDGET_MOVIES from './search_widget_components/Search_Results_Item_Widget_Movies';
import SEARCH_CATEGORIES from './search_widget_components/Search_Categories';


const SEARCH_MOVIES_WIDGET = (props) => {
    let searchResults = props.searchResults.map((movie, id) => (
        <div
            key={'search-' + id}
        >
            
            <SEARCH_RESULTS_ITEM_WIDGET_MOVIES searchResultsItem={movie}/> 
            {/*props.category = "actors" && <SEARCH_RESULTS_ITEM_WIDGET searchResultsItem={movie} category={props.category}/>*/}
            {/*props.category = "users" && <SEARCH_RESULTS_ITEM_WIDGET searchResultsItem={movie} category={props.category}/>*/}
        </div>

    ));
    return (
        <div className="searchMoviesContainer">
            <SEARCH_CATEGORIES />
            <div className="searchResultsContainer" style={{backgroundColor: "rgb(104, 135, 139)"}}>
            {searchResults}
            </div>
        </div>
    )
};


export default SEARCH_MOVIES_WIDGET;