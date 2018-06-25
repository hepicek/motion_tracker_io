import React from 'react';

const SEARCH_CATEGORIES = (props) => {
    let bgColor;
    if(props.searchType == 'movies') {
        bgColor = '#68878b';
    } else if(props.searchType == 'actors') {
        bgColor = '#b8b069';
    } else {
        bgColor = '#c29d84';
    }
    return (
        <div className="searchCategories" style={{backgroundColor: bgColor}}>
            <div 
                className="searchCategories_button"
                id="categoryBtn-movies"
                onClick={props.handleCategoryClick}
            >
                Movies
            </div>
            <div 
                className="searchCategories_button" 
                id="categoryBtn-actors"
                onClick={props.handleCategoryClick}
            >
                Actors
            </div>
            <div 
                className="searchCategories_button" 
                id="categoryBtn-users"
                onClick={props.handleCategoryClick}
                >
                Users
            </div>
        </div>
    )
}

export default SEARCH_CATEGORIES;