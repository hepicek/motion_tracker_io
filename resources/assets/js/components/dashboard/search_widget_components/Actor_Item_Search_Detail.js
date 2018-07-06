import React, {Component} from 'react';
import axios from "axios/index";
import {decodeString} from '../../../helpers/helper';
import { AWS_URL } from '../../../../../../config/js/config';
import {Card, CardTitle} from 'reactstrap';

class ACTOR_ITEM_SEARCH_DETAILS extends Component {
    constructor(props) {
        super(props)
        this.state = {
            actorMovies: []
        }

    }
    componentWillMount() {
        let actor_id = this.props.actor.imdb_id;
        axios.get(`/searchActorDetails/${actor_id}`)
        .then((res) => {    
            let searchResults = Object.keys(res).map(key => res[key]);
            let actorMovies = searchResults[0][1];
            this.setState({
                actorMovies
            })
        });


    }
    render() {
        
        let movies = this.state.actorMovies.map((movie, index) => {
            let backgroundImage = AWS_URL + movie.imdb_img;
            return (
                <Card 
                    className="bg-light m-1 p-1 d-flex flex-column align-items-center" 
                    key={index}
                    style={{width: "10rem"}}
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
            )
        })
        return (
            <div className="bg-white p-2 d-flex flex-wrap">
                {movies}
            </div>

        )
    }
}

export default ACTOR_ITEM_SEARCH_DETAILS;