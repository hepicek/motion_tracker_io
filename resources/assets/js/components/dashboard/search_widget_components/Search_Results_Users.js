import React, {Component} from 'react';
import SEARCH_RESULTS_ITEM_WIDGET_USERS from './Search_Results_Item_Widget_Users';

class SEARCH_RESULTS_USERS extends Component {
    constructor(props) {
        super(props)    
    }
    render() {
        let {props} = this;
        let searchResults = props.results.map((result, id) => (
            <div
                key={'search-' + id}
            >
                <SEARCH_RESULTS_ITEM_WIDGET_USERS searchResultsItem={result} />
            </div>
            ))
        return (
            <div>
                {searchResults}
            </div>
        )
    }
}

export default SEARCH_RESULTS_USERS;