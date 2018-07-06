import React, {Component} from 'react';
import {DragSource} from 'react-dnd';
import {decodeString} from '../../../helpers/helper';
import MOVIE_ITEM_SEARCH_DETAILS from './Movie_Item_Search_Detail.js';
import Rating from "react-rating";
import axios from "axios/index";
import {Row, Col, Collapse} from 'reactstrap';

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
            collapse: false,
            rating: 0,
            starColor: 'blackStar'
        }
    }

    handleCaretClick() {
        this.setState(prevState => ({
            caret: this.state.caret === 'down' ? 'up' : 'down',
            collapse: !prevState.collapse
        }));
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
        let vertAlign = {
            display: "flex",
            alignItems: "center"
        }
        return connectDragSource(
            <div>
                <Row className='bg-white mx-0 my-2 py-1'
                     style={{
                         border: (isDragging.dragging && isDragging.id == movieItem.imdb_id) && isDragging.dragging,
                    }}
                >
                    <Col
                        xs="1" md="1"
                        onClick={this.handleCaretClick}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        className="p-0 mr-0"
                    >
                        <i className={"fa fa-caret-" + this.state.caret}/>
                    </Col>
                    <Col
                        xs="3" md="3"
                        onClick={this.handleCaretClick}
                        style={vertAlign}
                        className="p-0"
                    >
                        <p style={{margin: "0"}}>{decodeString(movieItem.name)}</p>
                    </Col>
                    <Col
                        xs="1" md="1"
                        onClick={this.handleCaretClick}
                        style={vertAlign}
                    >
                        <p style={{margin: "0"}}>{movieItem.year}</p>
                    </Col>
                    <Col
                        xs="3" md="3"
                        onClick={this.handleCaretClick}
                        style={vertAlign}
                    >
                        <p style={{margin: "0"}}>IMDB Rating: {movieItem.rating}</p>
                    </Col>
                    <Col 
                        xs="4" md="4"
                        className="movieItemRating"
                        style={vertAlign}
                    >
                        <p style={{margin: "0 5px 0 0"}}>My Rating:</p>
                        <Rating
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol={"fa fa-star fa-2x " + this.state.starColor}
                            initialRating={this.state.rating}
                            fractions={2}
                            onChange={this.handleRatingChange}
                            value={this.state.rating}
                            style={{fontSize: ".6rem"}}
                        />
                    </Col>
                </Row>
                <Collapse isOpen={this.state.collapse}> 
                    <MOVIE_ITEM_SEARCH_DETAILS MovieItemDetails={movieItem}/>
                </Collapse>
            </div>
        )
    }

}

export default DragSource('list', spec, collect)(SEARCH_RESULTS_ITEM_WIDGET_MOVIES);