import React, {Component} from 'react';
import SEARCH_RESULTS_ITEM_WIDGET_ACTORS from './Search_Results_Item_Widget_Actors';

class SEARCH_RESULTS_ACTORS extends Component {
    constructor(props) {
        super(props)    
    }
    render() {
        let {props} = this;
        let searchResults = props.results.map((result, id) => (
            <div
                key={'search-' + id}
            >
                <SEARCH_RESULTS_ITEM_WIDGET_ACTORS searchResultsItem={result} />
            </div>
            ))
        return (
            <div>
                {searchResults}
            </div>
        )
    }
}

export default SEARCH_RESULTS_ACTORS;