import React, { Component } from 'react';
import MOVIE_DETAILS_WIDGET from '../../movie_details_widget';
import { decodeString } from '../../../helpers/helper';
let hoverTimeout;

class LIST_ITEM extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hovering: false
        }
        this.handleHover = this.handleHover.bind(this);
    }
    handleHover(e) {
        if(e.type == "mouseenter") {
            hoverTimeout = setTimeout(() => {
                this.setState({
                    hovering: true
                })
            }, 300);
        } else {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                this.setState({
                    hovering: false
                })
            }, 300);
        }
    }
    render() {
        let {item} = this.props;
        return (
            <div 
                key={"MovieDetails-" + item.id}
                className="userListItem" 
                key={item.id} id={"listItem-" + item.id}
                onMouseEnter={(e) => this.handleHover(e, item)}
                onMouseLeave={this.handleHover}
            >
                <p>{decodeString(item.name)} - {item.year}</p>
                <i 
                    className="fa fa-times"
                    onClick={this.props.handleDeleteListItem}
                />
                {this.state.hovering && <MOVIE_DETAILS_WIDGET 
                    hovering={this.state.hovering} 
                    imdb_id={item.imdb_id}   
                />}
            </div>
        )

    }
}

export default LIST_ITEM;