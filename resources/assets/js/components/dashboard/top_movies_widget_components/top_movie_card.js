import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const spec = {
   
    
      isDragging(props, monitor) {
        // If your component gets unmounted while dragged
        // (like a card in Kanban board dragged between lists)
        // you can implement something like this to keep its
        // appearance dragged:
        // monitor.getItem().id === props.movie.id
        return monitor.getItem().id === props.movie.id;
      },
    
      beginDrag(props, monitor, component) {
        // Return the data describing the dragged item
        const item = { id: props.movie.id };
        return item;
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
        console.log("item", item);
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
class TOP_MOVIE_CARD extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let movie = this.props.movie;
        const { isDragging, connectDragSource, canDrag } = this.props;
        
        return connectDragSource (
            <div 
            className="topMoviesWidgetCard" 
            key={movie.id} 
        >
            <img 
                    className="topMoviesWidgetCard-img" 
                src={"http://image.tmdb.org/t/p/w185" + movie.poster_path}
                alt={movie.original_title} 
            />
            <p className="topMoviesWidgetCard-title">{movie.original_title}</p>
            {isDragging && <h1>Dragging!</h1>}
        </div>
        )
    }
}

export default DragSource('list', spec, collect)(TOP_MOVIE_CARD);