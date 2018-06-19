import React, {Component} from 'react';
import MOVIE_ITEM_SEARCH_DETAILS from './Movie_Item_Search_Detail.js';
import axios from "axios/index";

class SEARCH_RESULTS_ITEM_WIDGET extends Component {
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
        let movieItem = this.props.searchResultsItem;

        return (
            <div>
                <div className='searchResultsItem'>
                    <i className={"fa fa-caret-" + this.state.caret} onClick={this.handleCaretClick}/>
                    <p>{movieItem.name}</p>
                    <p>{movieItem.year}</p>
                    <p>{movieItem.rating}</p>
                </div>
                {this.state.caret === 'up' && <MOVIE_ITEM_SEARCH_DETAILS MovieItemDetails={movieItem}/>}
            </div>
        )
    }

}


export default SEARCH_RESULTS_ITEM_WIDGET;