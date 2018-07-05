import React, {Component} from 'react';
import MOVIE_DETAILS_WIDGET from '../../movie_details_widget';
import {decodeString} from '../../../helpers/helper';
let hoverTimeout;

class MOVIE_TITLE extends Component {
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
        return (
            <div 
                style={{
                    margin: "0",
                    cursor: "default",
                    position: "relative",
                }}
                onMouseEnter={this.handleHover} 
                onMouseLeave={this.handleHover}    
            >
                <strong>{decodeString(this.props.movie_title)}</strong>
                {this.state.hovering && <MOVIE_DETAILS_WIDGET imdb_id={this.props.imdb_id}/>}
            </div>
        )
    }
}

export default MOVIE_TITLE;