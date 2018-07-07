import React, {Component} from 'react';
import {DragSource} from 'react-dnd';
import {decodeString} from '../../../helpers/helper';
import MOVIE_ITEM_SEARCH_DETAILS from './Movie_Item_Search_Detail.js';
import Rating from "react-rating";
import axios from "axios/index";
import {Row, Col, Collapse, Dropdown, DropdownToggle, DropdownItem, DropdownMenu} from 'reactstrap';

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
        this.state = {
            caret: 'down',
            collapse: false,
            rating: 0,
            starColor: 'blackStar',
            addListToggle: false,
        }
        this.handleCaretClick = this.handleCaretClick.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState(prevState => ({
            addListToggle: !prevState.addListToggle
        }))
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
        let lists = this.props.lists.map(list => {
            return (
                <DropdownItem 
                    key={"addToList-" + list.id}
                    id={"addToList-" + list.id}
                    onClick={(e) => {
                        this.props.saveToList(movieItem.imdb_id, list.id);
                    }}    
                >
                    {list.list_title}
                </DropdownItem>
            )
        })
        const {isDragging, connectDragSource, canDrag} = this.props;
        let vertAlign = {
            display: "flex",
            alignItems: "center"
        }
        return connectDragSource(
            <div key={"searchResultItem-" + movieItem.imdb_id}>
                <Row className='mx-0 my-2 py-1'
                     
                    style={{
                        background: (isDragging.dragging && isDragging.id == movieItem.imdb_id) ? "#343A40" : "white",
                        color: (isDragging.dragging && isDragging.id == movieItem.imdb_id) && "white",
                        transition: "background-color .15s, color .15s"
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
                        xs="11" md="3"
                        onClick={this.handleCaretClick}
                        style={vertAlign}
                        className="p-0"
                    >
                        <p style={{margin: "0"}}>{decodeString(movieItem.name)}</p>
                    </Col>
                    <Col
                        xs="2" md="1"
                        onClick={this.handleCaretClick}
                        style={vertAlign}
                    >
                        <p className="movieItem-p" style={{margin: "0"}}>{movieItem.year}</p>
                    </Col>
                    <Col
                        xs="3" md="3"
                        onClick={this.handleCaretClick}
                        style={vertAlign}
                    >
                        <p className="movieItem-p" style={{margin: "0"}}>IMDB: {movieItem.rating}</p>
                    </Col>
                    <Col 
                        xs="5" md="3"
                        className="movieItemRating"
                        style={vertAlign}
                    >
                        <p className="movieItem-p" style={{margin: "0 5px 0 0"}}>MT: </p>
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
                    <Col xs="1" className="m-0 d-flex justify-content-center align-items-center">
                    <Dropdown
                        direction="left"
                        isOpen={this.state.addListToggle}
                        toggle={this.toggle}
                    >
                        <DropdownToggle 
                            color="white"
                            style={{
                                backgroundColor: "rgba(0,0,0,0)",
                            }}
                        >
                            <i className="fa fa-cog" />
                        </DropdownToggle>
                        <DropdownMenu className="p-0">
                            <DropdownItem header className="m-0 py-1 px-2">
                            Add to list:
                            </DropdownItem>
                            <DropdownItem divider className="p-0 my-0"/>
                            {lists}
                        </DropdownMenu>
                    </Dropdown>
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