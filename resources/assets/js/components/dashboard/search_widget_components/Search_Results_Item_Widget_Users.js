import React, {Component} from 'react';
import MOVIE_ITEM_SEARCH_DETAILS from './Movie_Item_Search_Detail.js';


class SEARCH_RESULTS_ITEM_WIDGET_USERS extends Component {
    constructor(props) {
        super(props);
        this.handleCaretClick = this.handleCaretClick.bind(this);
        this.state = {
            caret: 'down',
        }
    }

    handleCaretClick() {
        this.setState({
            caret: this.state.caret === 'down' ? 'up' : 'down'
        });
    }

    render() {
        return (
            <div>
                <div className='searchResultsItem' 
                    onClick={this.handleCaretClick}
                >
                    <p>User!</p>
                </div>
                {this.state.caret === 'up' && <MOVIE_ITEM_SEARCH_DETAILS MovieItemDetails={movieItem}/>}
            </div>
        )
    }

}

export default SEARCH_RESULTS_ITEM_WIDGET_USERS;