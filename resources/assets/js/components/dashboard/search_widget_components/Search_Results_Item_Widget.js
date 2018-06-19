import React, {Component} from 'react';

const SEARCH_RESULTS_ITEM_WIDGET = (props) => {
    let movieItem = props.searchResultsItem;
    return (
        <div className='searchResultsItem'>
            <i className="fa fa-caret-down"/>
            <p>{movieItem.name}</p>
            <p>{movieItem.year}</p>
            <p>{movieItem.rating}</p>
        </div>
    )

};


export default SEARCH_RESULTS_ITEM_WIDGET;