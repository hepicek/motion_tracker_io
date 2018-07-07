import React, {Component} from 'react';
import {DragSource} from 'react-dnd';
import {decodeString} from '../../../helpers/helper';
import { AWS_URL } from '../../../../../../config/js/config';
import {Card, CardTitle} from 'reactstrap';

const spec = {
    isDragging(props, monitor) {
        return monitor.getItem();
    },

    beginDrag(props, monitor, component) {
        return {id: props.movie.imdb_id, dragging: "2px solid red"};
    },

    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }

        // const item = monitor.getItem();
        // const dropResult = monitor.getDropResult();
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        canDrag: monitor.canDrag()
    };
}

class ACTOR_ITEM_SEARCH_DETAIL_MOVIE_CARD extends Component {
    render() {
        const {isDragging, connectDragSource, movie} = this.props;
        let backgroundImage = AWS_URL + movie.imdb_img;
        return connectDragSource(
            <div>
            <Card 
                className="m-1 p-1 d-flex flex-column align-items-center" 
                key={"actorSearchDetail-"+ movie.imdb_id}
                style={{
                    width: "10rem",
                    background: (isDragging.dragging && isDragging.id == movie.imdb_id) ? "#343A40" : "#F8F9FA",
                    color: (isDragging.dragging && isDragging.id == movie.imdb_id) && "white",
                    transition: "background-color .15s, color .15s",
                    cursor: "grab"
                }}
            >
            <div  
                className="searchItemDetails-actorMovieImg"
                style={{
                    backgroundImage: `url(${backgroundImage})`
                }}
            />
                
                <CardTitle
                    className="m-1"
                    style={{fontSize: ".6rem"}}
                >{decodeString(movie.name)} - {movie.year}</CardTitle>

        </Card>  
        </div>
        )
    }
}

export default DragSource('list', spec, collect)(ACTOR_ITEM_SEARCH_DETAIL_MOVIE_CARD);
