import React, { Component } from 'react';
import {AWS_URL} from "../../../../../config/js/config";
import MOVIE_DETAILS_WIDGET from '../movie_details_widget';
let hoverTimeout;
class ListItem extends Component {
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
    render(){

        const listItem = this.props.listItem;
        const background = AWS_URL + listItem.imdb_img;
        return (
            <div 
                className="userPublicProfileListItem"
                onMouseEnter={this.handleHover} 
                onMouseLeave={this.handleHover}  
            >
                <div 
                    className="ListItem_movieImage"
                    style={{
                        backgroundImage: `url(${background})`
                    }}
                />
                <p className="publicUserListItemName">{listItem.name}</p>
                <p className="publicUserListItemRating">Rating: {listItem.user_rating && listItem.user_rating}</p>
                <div style={{position: "relative"}}>
                    {this.state.hovering && 
                        <MOVIE_DETAILS_WIDGET imdb_id={listItem.show_id}/>}
                </div>
            </div>
        );        
    }
};

export default ListItem;
