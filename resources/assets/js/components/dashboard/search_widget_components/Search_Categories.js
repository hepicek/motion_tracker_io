import React from 'react';

const SEARCH_CATEGORIES = (props) => {

    return (
        <div className="searchCategories">
            <div className="searchCategories_button" id="moviesCategoryBtn">
                Movies
            </div>
            <div className="searchCategories_button" id="actorsCategoryBtn">
                Actors
            </div>
            <div className="searchCategories_button" id="usersCategoryBtn">
                Users
            </div>
        </div>
    )
}

export default SEARCH_CATEGORIES;