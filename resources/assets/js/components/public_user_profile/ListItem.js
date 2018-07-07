import React, { Component } from 'react';
import {AWS_URL} from "../../../../../config/js/config";
import MOVIE_DETAILS_WIDGET from '../movie_details_widget';
import {decodeString} from '../../helpers/helper';
import {Card, CardBody, CardImg} from 'reactstrap';
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
        const background = listItem.imdb_img ? AWS_URL + listItem.imdb_img : AWS_URL + "img/movie_img/list_placeholder.jpg";
        return (
            <Card 
                className="p-1 col-md-2 col-sm-6 col-xs-6"
                onMouseEnter={this.handleHover} 
                onMouseLeave={this.handleHover}  
                style={{maxWidth: "200px", minWidth: "150px"}}
            >
                <CardImg
                    className="mx-auto"
                    src={background}
                />
                <CardBody>
                    <p className="">{decodeString(listItem.name)}</p>
                    <p className="">Rating: {listItem.user_rating && listItem.user_rating}</p>
                    <div style={{position: "relative"}}>
                        {this.state.hovering && 
                            <MOVIE_DETAILS_WIDGET 
                                imdb_id={listItem.show_id}
                                top="-250px"
                                left="-5px"
                            />}
                    </div>
                </CardBody>
            </Card>
        );        
    }
};

export default ListItem;
