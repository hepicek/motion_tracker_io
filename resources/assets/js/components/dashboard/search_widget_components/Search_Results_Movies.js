import React, {Component} from 'react';
import SEARCH_RESULTS_ITEM_WIDGET_MOVIES from './Search_Results_Item_Widget_Movies';

class SEARCH_RESULTS_MOVIES extends Component {
    constructor(props) {
        super(props)    
    }
    render() {
        let {props} = this;
        let searchResults = props.results.map((result, id) => (
            <div
                key={'search-' + id}
            >
                <SEARCH_RESULTS_ITEM_WIDGET_MOVIES searchResultsItem={result} />
            </div>
            ))
        return (
            <div>
                {searchResults}
            </div>
        )
    }
}

export default SEARCH_RESULTS_MOVIES;