import React, {Component} from 'react';
import {DragSource} from 'react-dnd';
import {decodeString} from '../../../helpers/helper';
import MOVIE_ITEM_SEARCH_DETAILS from './Movie_Item_Search_Detail.js';
import Rating from "react-rating";
import axios from "axios/index";
import {Grid, Row, Col} from 'react-bootstrap';

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
        let vertAlign = {
            display: "flex",
            alignItems: "center"
        }
        return connectDragSource(
            <div>
                <Grid
                style={{
                    backgroundColor: "white",
                    margin: "5px 0",
                    padding: "5px 0"
                }}
                >
                <Row className='show-grid'
                     style={{
                         border: (isDragging.dragging && isDragging.id == movieItem.imdb_id) && isDragging.dragging,
                         display: "flex",
                         alignItems: "center",
                         margin: "0"
                    }}
                >
                    <Col
                        xs={1} md={1}
                        onClick={this.handleCaretClick}
                        style={vertAlign}
                    >
                        <i className={"fa fa-caret-" + this.state.caret}/>
                    </Col>
                    <Col
                        xs={3} md={3}
                        onClick={this.handleCaretClick}
                        style={vertAlign}
                    >
                        <p style={{margin: "0"}}>{decodeString(movieItem.name)}</p>
                    </Col>
                    <Col
                        xs={1} md={1}
                        onClick={this.handleCaretClick}
                        style={vertAlign}
                    >
                        <p style={{margin: "0"}}>{movieItem.year}</p>
                    </Col>
                    <Col
                        xs={3} md={3}
                        onClick={this.handleCaretClick}
                        style={vertAlign}
                    >
                        <p style={{margin: "0"}}>IMDB Rating: {movieItem.rating}</p>
                    </Col>
                    <Col 
                        xs={4} md={4}
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
                            style={{fontSize: ".8rem"}}
                        />
                    </Col>
                </Row>
                </Grid>
                {this.state.caret === 'up' && <MOVIE_ITEM_SEARCH_DETAILS MovieItemDetails={movieItem}/>}
            </div>
        )
    }

}

export default DragSource('list', spec, collect)(SEARCH_RESULTS_ITEM_WIDGET_MOVIES);