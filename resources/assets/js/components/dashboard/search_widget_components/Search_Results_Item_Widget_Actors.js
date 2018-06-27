import React, {Component} from 'react';
import {DragSource} from 'react-dnd';
import {decodeString} from '../../../helpers/helper'
import ACTOR_ITEM_SEARCH_DETAILS from './Actor_Item_Search_Detail.js';

const spec = {
    isDragging(props, monitor) {
        return monitor.getItem();
    },

    beginDrag(props, monitor, component) {
        return {id: props.searchResultsItem.imdb_id, dragging: "2px solid red"};
    },

    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }

        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        canDrag: monitor.canDrag()
    };
}

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
        const {isDragging, connectDragSource, canDrag} = this.props;

        // console.log(this.props);
        let image_src = (this.props.searchResultsItem.person_img == "" || !this.props.searchResultsItem.person_img) ? 'img/person_img/person_placeholder.png' : this.props.searchResultsItem.person_img;
        return connectDragSource(
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

export default DragSource('list', spec, collect)(SEARCH_RESULTS_ITEM_WIDGET_ACTORS);