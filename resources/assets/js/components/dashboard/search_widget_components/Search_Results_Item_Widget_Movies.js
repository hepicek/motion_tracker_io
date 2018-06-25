import React, {Component} from 'react';
import { DragSource } from 'react-dnd';
import MOVIE_ITEM_SEARCH_DETAILS from './Movie_Item_Search_Detail.js';

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
        const { isDragging, connectDragSource, canDrag } = this.props;

        return connectDragSource(
            <div>
                <div className='searchResultsItem' 
                    style={{border: (isDragging.dragging && isDragging.id == movieItem.imdb_id) && isDragging.dragging}}
                    onClick={this.handleCaretClick}
                >
                    <i className={"fa fa-caret-" + this.state.caret} />
                    <p>{movieItem.name}</p>
                    <p>{movieItem.year}</p>
                    <p>{movieItem.rating}</p>
                </div>
                {this.state.caret === 'up' && <MOVIE_ITEM_SEARCH_DETAILS MovieItemDetails={movieItem}/>}
            </div>
        )
    }

}

export default DragSource('list', spec, collect)(SEARCH_RESULTS_ITEM_WIDGET_MOVIES);