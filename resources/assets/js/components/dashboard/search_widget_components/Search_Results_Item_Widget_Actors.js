import React, {Component} from 'react';
import {decodeString} from '../../../helpers/helper'
import ACTOR_ITEM_SEARCH_DETAILS from './Actor_Item_Search_Detail.js';


class SEARCH_RESULTS_ITEM_WIDGET_ACTORS extends Component {
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
        // console.log(this.props);
        let image_src = (this.props.searchResultsItem.person_img == "" || !this.props.searchResultsItem.person_img) ? 'img/person_img/person_placeholder.png' : this.props.searchResultsItem.person_img;
        return (
            <div>
                <div className='searchResultsItem' 
                    onClick={this.handleCaretClick}
                >   
                <i className={"fa fa-caret-" + this.state.caret} />
                <img className="actorSearchImage" src={"./storage/" + image_src} alt="Person image" />
                    <p>{decodeString(this.props.searchResultsItem.fullname)}</p>
                </div>
                {this.state.caret === 'up' && 
                    <ACTOR_ITEM_SEARCH_DETAILS actor={this.props.searchResultsItem} />}
            </div>
        )
    }

}

export default SEARCH_RESULTS_ITEM_WIDGET_ACTORS;