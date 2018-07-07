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
                className="bg-white d-flex justify-content-between align-items-center my-1 p-1 userListItemInList"
                id={"listItem-" + item.id}
                style={{cursor: "default"}}
            >
                <div
                    onMouseEnter={(e) => this.handleHover(e, item)}
                    onMouseLeave={this.handleHover}
                >
                    <p className="my-0">{decodeString(item.name)} - {item.year}</p>
                    {this.state.hovering && <MOVIE_DETAILS_WIDGET 
                        top=""
                        left="-5px"
                        imdb_id={item.imdb_id}   
                    />}
                </div>
                <i 
                    className="fa fa-times"
                    onClick={this.props.handleDeleteListItem}
                />
            </div>
        )

    }
}

export default LIST_ITEM;