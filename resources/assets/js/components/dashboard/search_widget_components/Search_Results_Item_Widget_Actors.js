import React, {Component} from 'react';
import {DragSource} from 'react-dnd';
import {decodeString} from '../../../helpers/helper'
import ACTOR_ITEM_SEARCH_DETAILS from './Actor_Item_Search_Detail.js';
import { AWS_URL } from '../../../../../../config/js/config';
import {Collapse} from 'reactstrap';

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
            collapse: false
        }
    }

    handleCaretClick() {
        this.setState(prevState => ({
            caret: this.state.caret === 'down' ? 'up' : 'down',
            collapse: !prevState.collapse
        }));
    }

    render() {
        const {isDragging, connectDragSource, canDrag} = this.props;

        let image_src = (this.props.searchResultsItem.person_img == "" || !this.props.searchResultsItem.person_img) ? 'img/person_img/person_placeholder.png' : this.props.searchResultsItem.person_img;
        return connectDragSource(
            <div>
                <div className='d-flex align-items-center bg-white my-2 w-100 p-2' 
                    onClick={this.handleCaretClick}
                >   
                <i className={"mr-2 fa fa-caret-" + this.state.caret} />
                <div className="actorSearchImage mr-4" style={{backgroundImage: `url(${AWS_URL + image_src})`}} />
                    <p className="m-0">{decodeString(this.props.searchResultsItem.fullname)}</p>
                </div>
                <Collapse isOpen={this.state.collapse}> 
                    <ACTOR_ITEM_SEARCH_DETAILS actor={this.props.searchResultsItem} />
                </Collapse>
            </div>
        )
    }

}

export default DragSource('list', spec, collect)(SEARCH_RESULTS_ITEM_WIDGET_ACTORS);