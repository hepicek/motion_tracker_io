import React, {Component} from 'react';
import { DragSource } from 'react-dnd';
import MOVIE_ITEM_SEARCH_DETAILS from './Movie_Item_Search_Detail.js';
// import axios from "axios/index";

const spec = {
   
    
    isDragging(props, monitor) {
      // If your component gets unmounted while dragged
      // (like a card in Kanban board dragged between lists)
      // you can implement something like this to keep its
      // appearance dragged:

      return {id: props.searchResultsItem.imdb_id};
    },
  
    beginDrag(props, monitor, component) {
      // Return the data describing the dragged item
    //   const item = { id: props.movie.id };
    //   return item;

    return {id: props.searchResultsItem.imdb_id};
    },
  
    endDrag(props, monitor, component) {
      if (!monitor.didDrop()) {
        // You can check whether the drop was successful
        // or if the drag ended but nobody handled the drop
        
        return;
      }
  
      // When dropped on a compatible target, do something.
      // Read the original dragged item from getItem():
      const item = monitor.getItem();
    //   console.log("item", item);
      // You may also read the drop result from the drop target
      // that handled the drop, if it returned an object from
      // its drop() method.
      const dropResult = monitor.getDropResult();
  
      // This is a good place to call some Flux action
      // CardActions.moveCardToList(item.id, dropResult.listId);
    }
}

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
    canDrag: monitor.canDrag()
  };
}


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
        const { isDragging, connectDragSource, canDrag } = this.props;

        return connectDragSource(
            <div>
                <div className='searchResultsItem'>
                    <i className={"fa fa-caret-" + this.state.caret} onClick={this.handleCaretClick}/>
                    <p>{movieItem.name}</p>
                    <p>{movieItem.year}</p>
                    <p>{movieItem.rating}</p>
                </div>
                {this.state.caret === 'up' && <MOVIE_ITEM_SEARCH_DETAILS MovieItemDetails={movieItem}/>}
                {isDragging && <h1>Dragging!</h1>}
            </div>
        )
    }

}

export default DragSource('list', spec, collect)(SEARCH_RESULTS_ITEM_WIDGET);
// export default SEARCH_RESULTS_ITEM_WIDGET;