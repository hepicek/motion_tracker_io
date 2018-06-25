import React, {Component} from 'react';
import SEARCH_RESULTS_ITEM_WIDGET from './search_widget_components/Search_Results_Item_Widget';


const SEARCH_MOVIES_WIDGET = (props) => {
    let searchResults = props.searchResults.map((movie, id) => (
        <div
            key={'search-' + id}
        >
            <SEARCH_RESULTS_ITEM_WIDGET searchResultsItem={movie}/>
        </div>

    ));
    return (
        <div className="searchMoviesContainer">
            {searchResults}
        </div>
    )
};


export default SEARCH_MOVIES_WIDGET;