import React, {Component} from 'react';
import {DragSource} from 'react-dnd';
import {decodeString} from '../../../helpers/helper';
import MOVIE_ITEM_SEARCH_DETAILS from './Movie_Item_Search_Detail.js';
import Rating from "react-rating";
import axios from "axios/index";

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


class SEARCH_RESULTS_ITEM_WIDGET_MOVIES extends Component {
    constructor(props) {
        super(props);
        this.handleCaretClick = this.handleCaretClick.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.state = {
            caret: 'down',
            rating: 0,
            starColor: 'blackStar'
        }
    }

    handleCaretClick() {
        this.setState({
            caret: this.state.caret === 'down' ? 'up' : 'down'
        });
    }

    handleRatingChange(value) {
        axios.post('movieRating', [this.props.searchResultsItem.imdb_id, value])
            .then((res) => {
                this.setState({rating: res.data[0].mt_user_rating});
            });
    }

    componentWillMount() {
        axios.get(`movieRating/${this.props.searchResultsItem.imdb_id}`)
            .then((res) => {
                this.setState({rating: res.data[0][0].mt_user_rating});
                this.setState({starColor: res.data[1]});
            });
    }

    render() {
        let movieItem = this.props.searchResultsItem;
        const {isDragging, connectDragSource, canDrag} = this.props;

        return connectDragSource(
            <div>
                <div className='searchResultsItem'
                     style={{border: (isDragging.dragging && isDragging.id == movieItem.imdb_id) && isDragging.dragging}}
                >
                    <div
                        className="movieItemInfo"
                        onClick={this.handleCaretClick}
                    >
                        <i className={"fa fa-caret-" + this.state.caret}/>
                        <p>{decodeString(movieItem.name)}</p>
                        <p>Year: {movieItem.year}</p>
                        <p>IMDB Rating: {movieItem.rating}</p>
                    </div>
                    <div className="movieItemRating">
                        <p>My Rating: </p>
                        <Rating
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol={"fa fa-star fa-2x " + this.state.starColor}
                            initialRating={this.state.rating}
                            fractions={2}
                            onChange={this.handleRatingChange}
                            value={this.state.rating}
                        />
                    </div>
                </div>

                {this.state.caret === 'up' && <MOVIE_ITEM_SEARCH_DETAILS MovieItemDetails={movieItem}/>}
            </div>
        )
    }

}

export default DragSource('list', spec, collect)(SEARCH_RESULTS_ITEM_WIDGET_MOVIES);